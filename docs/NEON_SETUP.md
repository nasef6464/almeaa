# Neon Setup Guide

## Quick Start

1. **Sign up for Neon**
   - Visit [https://console.neon.tech](https://console.neon.tech)
   - Create a free account (no credit card required)

2. **Create a New Project**
   - Click "New Project"
   - Choose a region closest to your users
   - Give it a name (e.g., "my-app-production")

3. **Get Connection Strings**
   
   You'll need TWO connection strings from Neon dashboard:
   
   ### Pooled Connection (for DATABASE_URL)
   ```
   postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```
   - Used by your application for queries
   - Handles connection pooling automatically
   - Better for serverless environments (Vercel, etc.)
   
   ### Direct Connection (for DIRECT_URL)
   ```
   postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```
   - Used by Prisma Migrate for schema changes
   - Required for running migrations
   - Direct connection to PostgreSQL

4. **Generate NEXTAUTH_SECRET**
   
   **On Windows (PowerShell):**
   ```powershell
   # Generate a secure 32-character secret
   $bytes = New-Object byte[] 32
   (New-Object Security.Cryptography.RNGCryptoServiceProvider).GetBytes($bytes)
   [Convert]::ToBase64String($bytes)
   ```
   
   **On macOS/Linux:**
   ```bash
   openssl rand -base64 32
   ```

5. **Add to .env**
   
   ⚠️ **IMPORTANT: Never commit .env to Git!**
   
   Open `.env` and paste your values:
   ```env
   DATABASE_URL="postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"
   DIRECT_URL="postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"
   NEXTAUTH_SECRET="your-generated-secret-from-step-4"
   NEXTAUTH_URL="http://localhost:3000"
   NODE_ENV="development"
   ```

6. **Generate Prisma Client**
   ```bash
   npm run db:generate
   ```

7. **Run Migrations**
   ```bash
   npm run db:migrate
   ```

## Production Best Practices

### Connection Pooling
- Neon automatically handles pooling for the `DATABASE_URL`
- No need to configure external poolers like PgBouncer

### Branching (Optional)
- Neon supports database branching
- Create separate databases for preview deployments
- Each branch gets its own connection string

### Monitoring
- Use Neon dashboard to monitor:
  - Query performance
  - Connection count
  - Storage usage
  - Compute time

### Security
- Always use `?sslmode=require` in connection strings
- Rotate passwords regularly from Neon dashboard
- Use different databases for dev/staging/production

## Troubleshooting

### "Connection Refused"
- Check if your IP is whitelisted in Neon settings
- Verify SSL is enabled (`?sslmode=require`)

### "Too Many Connections"
- Increase connection pool size in Neon settings
- Check for connection leaks in your code

### Migration Fails
- Use `DIRECT_URL` for migrations
- Ensure both URLs are set in `.env`
- Try `npm run db:push` for prototyping

## Free Tier Limits

- 10 projects
- 3 GB storage per project
- Unlimited compute hours (with auto-suspend)
- Automatic backups

## Upgrading

When you're ready to scale:
1. Go to Neon dashboard
2. Click "Upgrade Plan"
3. Choose Pro or Scale tier
4. Update connection strings if needed

---

Need help? Check [Neon Documentation](https://neon.tech/docs/introduction)
