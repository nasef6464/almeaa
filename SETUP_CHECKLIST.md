# 🚀 Neon + Prisma Setup Checklist

Your Next.js project is now configured for Neon Postgres + Prisma + Vercel deployment!

## ✅ What Was Done

1. **Environment Variables** - Secure configuration
   - `.env` - Empty placeholders (will be populated from secrets.local.env)
   - `.env.example` - Template for team
   - `secrets.local.env` - Local-only secret storage (gitignored)
   - `.gitignore` - Properly configured to exclude all secrets

2. **Prisma Schema** - Updated for your app
   - UserRole enum: SUPER_ADMIN, TRAINER, STUDENT, PARENT, SUPERVISOR, SCHOOL_ADMIN
   - User model with password field
   - Prisma 7 compatible

3. **Health Check API** - Production-ready endpoint
   - Route: `/api/health`
   - Returns database status
   - Handles missing DATABASE_URL gracefully
   - No secret leakage

4. **Environment Loading** - Automated & secure
   - `scripts/setup-env.js` - Loads secrets safely
   - Auto-validates pooled vs direct URLs
   - Auto-generates NEXTAUTH_SECRET
   - No console echo of secrets

5. **Build Safety** - Verified
   - ✅ `npm run build` succeeds without database
   - ✅ No secrets committed to Git
   - ✅ TypeScript passes

---

## 📝 Your Next Steps

### Step 1: Get Neon Database Credentials

1. Go to [https://console.neon.tech](https://console.neon.tech)
2. Sign up (free, no credit card required)
3. Create a new project
4. Copy **TWO** connection strings:

   **Pooled Connection (for queries):**
   ```
   postgresql://user:password@ep-xxx-pooler.neon.tech/neondb?sslmode=require
   ```
   ⚠️ Notice `-pooler` in hostname

   **Direct Connection (for migrations):**
   ```
   postgresql://user:password@ep-xxx.neon.tech/neondb?sslmode=require
   ```
   ⚠️ No `-pooler` in hostname

### Step 2: Configure `secrets.local.env`

Open `secrets.local.env` in your editor and paste your Neon URLs:

```env
DATABASE_URL=postgresql://[paste-your-pooled-url-here]
DIRECT_URL=postgresql://[paste-your-direct-url-here]
```

⚠️ **NEVER COMMIT THIS FILE!** (Already gitignored)

### Step 3: Load Secrets into `.env`

```powershell
# This script safely populates .env without printing secrets
node scripts/setup-env.js
```

Expected output:
```
✅ Database credentials loaded successfully
✅ NEXTAUTH_SECRET generated and saved
🎉 Environment setup complete!
```

### Step 4: Run Database Migrations

```powershell
# Generate Prisma Client
npm run db:generate

# Create initial migration
npm run db:migrate

# When prompted, name it: "init"

# (Optional) Seed test data
npm run db:seed
```

### Step 5: Test Health Endpoint

```powershell
# Start dev server
npm run dev

# In another terminal or browser:
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "db": "ok",
  "timestamp": "2026-01-12T...",
  "environment": "development"
}
```

---

## 🚀 Deploying to Vercel

### Step 1: Push to GitHub

```powershell
git add .
git commit -m "feat: configure for Neon Postgres production"
git push origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Vercel auto-detects Next.js

### Step 3: Set Environment Variables in Vercel

In Vercel Dashboard → Settings → Environment Variables, add:

| Variable | Value | Environment |
|----------|-------|-------------|
| `DATABASE_URL` | Your Neon pooled URL | Production, Preview, Development |
| `DIRECT_URL` | Your Neon direct URL | Production, Preview, Development |
| `NEXTAUTH_SECRET` | Your generated secret | Production, Preview, Development |
| `NEXTAUTH_URL` | Your Vercel URL | Production, Preview |
| `NODE_ENV` | `production` | Production |

⚠️ **Security Tips:**
- Click "Sensitive" checkbox for all secrets
- Use different databases for Production vs Preview
- Never share these values publicly

### Step 4: Deploy Migrations

After first deployment:

```powershell
# Install Vercel CLI
npm i -g vercel

# Link project
vercel link

# Run migrations in production
vercel env pull .env.production
npx prisma migrate deploy
```

### Step 5: Verify Health Check

Visit: `https://your-app.vercel.app/api/health`

Should return: `{ "status": "ok", "db": "ok" }`

---

## 🧪 Testing Locally

### Test Without Database

```powershell
# Remove DATABASE_URL temporarily
# Edit .env and set: DATABASE_URL=""

npm run build
npm start

# Visit: http://localhost:3000/api/health
# Should return: { "db": "not-configured", ... }
```

### Test With Database

```powershell
# Restore DATABASE_URL in .env
npm run dev

# Visit: http://localhost:3000/api/health
# Should return: { "db": "ok", ... }
```

---

## 📚 Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:push` | Push schema (dev, no migrations) |
| `npm run db:migrate` | Create and run migrations |
| `npm run db:migrate:deploy` | Deploy migrations (production) |
| `npm run db:studio` | Open Prisma Studio GUI |
| `npm run db:seed` | Seed test users |

---

## 🔐 Git Safety Checklist

✅ `.env` is gitignored  
✅ No secrets in tracked files  
✅ `.env.example` is safe to commit  
✅ Build succeeds without database  

---

## 🆘 Troubleshooting

### "Missing DATABASE_URL"

- Check `.env` file exists in project root
- Verify you pasted the full connection string
- Restart terminal/VSCode to reload env vars

### "Cannot connect to database"

- Verify `?sslmode=require` is in connection string
- Check Neon project is active (not paused)
- Test connection in Prisma Studio: `npm run db:studio`

### "Migration failed"

- Ensure `DIRECT_URL` is set (required for migrations)
- Use `npm run db:push` for quick prototyping instead
- Check Neon dashboard for connection issues

### Build Fails on Vercel

- Verify all environment variables are set
- Check "Sensitive" checkbox is enabled
- Redeploy after adding variables

---

## 📞 Need Help?

- **Neon Setup:** See [docs/NEON_SETUP.md](../docs/NEON_SETUP.md)
- **Development:** See [docs/DEVELOPMENT.md](../docs/DEVELOPMENT.md)
- **Deployment:** See [docs/DEPLOYMENT.md](../docs/DEPLOYMENT.md)
- **Prisma Docs:** https://www.prisma.io/docs
- **Neon Docs:** https://neon.tech/docs

---

## 🎉 You're Ready!

Once you complete Steps 1-4 above, your app will be running with:
- ✅ Type-safe database access
- ✅ Production-ready Neon Postgres
- ✅ Health check monitoring
- ✅ Secure secret management
- ✅ One-click Vercel deployment

**Start here:** Follow **Step 1** above to get your Neon credentials! 🚀
