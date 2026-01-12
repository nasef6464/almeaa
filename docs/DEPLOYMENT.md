# Production Deployment Guide

## Pre-Deployment Checklist

### Code Review
- [ ] All features tested locally
- [ ] No TypeScript errors (`npm run build`)
- [ ] ESLint passes (`npm run lint`)
- [ ] Environment variables documented
- [ ] Sensitive data removed from code
- [ ] API routes have proper error handling

### Database
- [ ] Migrations tested in staging
- [ ] Backup created (if updating existing DB)
- [ ] Indexes added for performance
- [ ] Seed data ready (if needed)

### Security
- [ ] NEXTAUTH_SECRET generated (32+ chars)
- [ ] CORS configured properly
- [ ] Rate limiting implemented
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (Prisma handles this)

## Vercel Deployment

### Initial Setup

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select your repository
   - Vercel auto-detects Next.js configuration

3. **Configure Environment Variables**
   
   In Vercel Dashboard > Settings > Environment Variables, add:
   
   ```env
   DATABASE_URL=postgresql://user:password@host/db?sslmode=require
   DIRECT_URL=postgresql://user:password@host/db?sslmode=require
   NEXTAUTH_SECRET=your-32-char-secret
   NEXTAUTH_URL=https://your-domain.vercel.app
   NODE_ENV=production
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will:
     - Install dependencies
     - Run `npm run build`
     - Execute `postinstall` (generates Prisma Client)
     - Deploy to production

### Run Migrations

After first deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Link to your project
vercel link

# Run migrations in production
vercel env pull .env.production
npx prisma migrate deploy
```

Or use Vercel's preview environments:
```bash
vercel --prod --build-env DATABASE_URL=$DATABASE_URL
```

### Continuous Deployment

Every push to `main` triggers automatic deployment:
```bash
git add .
git commit -m "feat: add new feature"
git push origin main
# Vercel automatically deploys
```

## Alternative Platforms

### Railway

1. **Create New Project**
   - Go to [railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub"

2. **Add Environment Variables**
   - Same as Vercel list above

3. **Configure Build**
   - Build Command: `npm run build`
   - Start Command: `npm start`

### Render

1. **Create Web Service**
   - Go to [render.com](https://render.com)
   - New → Web Service → Connect Repository

2. **Settings**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Add environment variables

### AWS (Advanced)

For full control with AWS:

1. **EC2 Instance**
   ```bash
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Clone and setup
   git clone your-repo
   cd your-repo
   npm install
   npm run build
   
   # Use PM2 for process management
   npm install -g pm2
   pm2 start npm --name "my-app" -- start
   ```

2. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Database Migration Strategy

### Safe Migration Process

1. **Test in Staging First**
   ```bash
   # Switch to staging environment
   export DATABASE_URL=your-staging-url
   
   # Run migration
   npx prisma migrate deploy
   
   # Test thoroughly
   ```

2. **Backup Production Database**
   ```bash
   # In Neon dashboard, create a branch
   # Or export data:
   npx prisma db pull
   ```

3. **Deploy Migration**
   ```bash
   # In production environment
   npx prisma migrate deploy
   ```

4. **Verify**
   ```bash
   # Check migration status
   npx prisma migrate status
   
   # Test critical paths
   ```

### Rollback Strategy

If something goes wrong:

```bash
# Revert to previous deployment
vercel rollback

# Or manually revert migration
# (requires custom SQL - plan before deploying)
```

## Monitoring

### Set Up Logging

```typescript
// app/api/middleware.ts
export function logRequest(req: Request) {
  console.log({
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    userAgent: req.headers.get('user-agent'),
  });
}
```

### Error Tracking

Consider integrating:
- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **Datadog** - APM monitoring

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

### Performance Monitoring

Use Vercel Analytics:
```bash
npm install @vercel/analytics
```

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## Post-Deployment

### Verification Checklist

- [ ] Homepage loads
- [ ] API routes respond
- [ ] Database queries work
- [ ] Authentication functions
- [ ] Static assets load
- [ ] SSL certificate active
- [ ] Custom domain configured (if applicable)

### Testing

```bash
# Health check endpoint
curl https://your-domain.com/api/health

# Test database connection
curl https://your-domain.com/api/users
```

### Domain Configuration

1. Add custom domain in Vercel dashboard
2. Update DNS records:
   ```
   Type: A
   Name: @
   Value: 76.76.19.19
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

## Troubleshooting

### Build Fails

```bash
# Check build locally
npm run build

# Clear cache
rm -rf .next
npm run build
```

### Database Connection Issues

- Verify `DATABASE_URL` and `DIRECT_URL` are correct
- Check Neon IP allowlist
- Ensure SSL is enabled (`?sslmode=require`)

### Prisma Client Not Found

Add to `package.json`:
```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

### Environment Variables Not Loading

- Double-check spelling
- Redeploy after adding new variables
- Use `process.env` correctly in Next.js

## Scaling Considerations

### Database
- Upgrade Neon plan for more connections
- Implement connection pooling
- Add read replicas for high traffic

### Application
- Enable Vercel Edge Functions for global distribution
- Implement caching with Redis
- Use CDN for static assets
- Consider horizontal scaling with multiple instances

### Costs

Estimated monthly costs:
- **Vercel Free Tier**: $0 (100GB bandwidth, 100 hours)
- **Vercel Pro**: $20/month (unlimited bandwidth)
- **Neon Free Tier**: $0 (3GB storage, unlimited compute)
- **Neon Pro**: $19/month (10GB storage, more compute)

## Security Best Practices

- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Secrets rotated regularly
- [ ] Dependencies updated
- [ ] Vulnerability scanning enabled

## Backup Strategy

1. **Automated Backups** (Neon handles this)
2. **Manual Snapshots** before major changes
3. **Export Critical Data** weekly:
   ```bash
   npx prisma db pull
   pg_dump $DATABASE_URL > backup.sql
   ```

---

🚀 **Ready for Production!**

Need help? Check:
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)
