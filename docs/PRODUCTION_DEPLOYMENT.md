# 🚀 Production Deployment Guide - Next.js + Prisma + Neon

## ✅ Pre-Flight Checklist

Before deploying, ensure:
- [ ] `secrets.local.env` exists locally with Neon credentials
- [ ] `.env` populated via `node scripts/setup-env.js`
- [ ] Database migrations completed (`npm run db:migrate`)
- [ ] Health endpoint tested locally (`/api/health`)
- [ ] All code committed to Git
- [ ] No secrets in tracked files

---

## 🔐 Step 1: Configure Local Secrets

### Create `secrets.local.env`

This file stores your actual Neon credentials **locally only** (never commit!).

```bash
# Copy the template
cp secrets.local.env.template secrets.local.env
```

### Get Your Neon Credentials

1. Go to https://console.neon.tech/
2. Sign in or create free account
3. Select your project
4. Click "Connection Details"
5. Copy **both** connection strings:

**Pooled Connection (for DATABASE_URL):**
- Look for URL with `-pooler` in hostname
- Used for application queries
- Example: `postgresql://user:pass@ep-xxx-pooler.region.aws.neon.tech/db`

**Direct Connection (for DIRECT_URL):**
- URL **without** `-pooler` in hostname
- Used for Prisma migrations
- Example: `postgresql://user:pass@ep-xxx.region.aws.neon.tech/db`

### Paste into `secrets.local.env`

```env
DATABASE_URL=postgresql://user:pass@ep-xxx-pooler.region.aws.neon.tech/dbname?sslmode=require
DIRECT_URL=postgresql://user:pass@ep-xxx.region.aws.neon.tech/dbname?sslmode=require
```

### Load Secrets into `.env`

```bash
# This script safely populates .env without printing secrets
node scripts/setup-env.js
```

Expected output:
```
✅ Database credentials loaded successfully
✅ NEXTAUTH_SECRET generated and saved
🎉 Environment setup complete!
```

---

## 🗄️ Step 2: Run Database Migrations

```bash
# Generate Prisma Client
npm run db:generate

# Create initial migration (if first time)
npm run db:migrate
# When prompted, name it: "init"

# Or push schema directly (dev only, no migration history)
npm run db:push
```

### Verify Migration Success

```bash
# Open Prisma Studio to see your database
npm run db:studio
```

### Seed Test Data (Optional)

```bash
npm run db:seed
```

Creates test users:
- `superadmin@example.com` / `superadmin123`
- `schooladmin@example.com` / `schooladmin123`
- `trainer@example.com` / `trainer123`
- `student@example.com` / `student123`

---

## 🏥 Step 3: Test Health Endpoint

```bash
# Start dev server
npm run dev
```

### Test in Browser
Open: http://localhost:3000/api/health

### Test in PowerShell
```powershell
curl http://localhost:3000/api/health
```

### Expected Response (with DB)
```json
{
  "status": "ok",
  "db": "ok",
  "timestamp": "2026-01-12T...",
  "environment": "development"
}
```

### Expected Response (without DB)
```json
{
  "status": "ok",
  "db": "not-configured",
  "message": "DATABASE_URL not set. See docs/NEON_SETUP.md"
}
```

---

## 🐙 Step 4: Push to GitHub

### Create GitHub Repository

```bash
# Initialize git (if not already done)
git init

# Create .gitignore is already configured
# Verify secrets are ignored:
git status
# Should NOT show: .env, secrets.local.env

# Add all files
git add .

# Commit
git commit -m "feat: production-ready Next.js + Prisma + Neon setup"

# Create repo on GitHub (via website or CLI)
# Then connect remote:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push
git push -u origin main
```

### ⚠️ CRITICAL: Verify No Secrets Committed

```bash
# Search for accidentally committed secrets
git log --all --full-history --source --pretty=format:"" -- secrets.local.env

# Should return nothing (file never tracked)
```

If `secrets.local.env` was ever committed:
```bash
# Remove from history (dangerous!)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch secrets.local.env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (only if you're certain!)
git push origin --force --all
```

---

## ☁️ Step 5: Deploy to Vercel

### Option A: Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Click "Import Project"
3. Select your GitHub repository
4. Vercel auto-detects Next.js settings

### Configure Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

| Variable | Value | Environments |
|----------|-------|--------------|
| `DATABASE_URL` | Your Neon **pooled** URL with `-pooler` | Production, Preview, Development |
| `DIRECT_URL` | Your Neon **direct** URL without `-pooler` | Production, Preview, Development |
| `NEXTAUTH_SECRET` | From your local `.env` | Production, Preview, Development |
| `NEXTAUTH_URL` | Your Vercel domain | Production, Preview |
| `NODE_ENV` | `production` | Production |

**⚠️ IMPORTANT:**
- Click "Sensitive" checkbox for all values
- Never paste these in public logs/issues
- Use different databases for Production vs Preview (Neon branching)

### Deploy

Click "Deploy" - Vercel will:
1. Install dependencies
2. Run `npm run build`
3. Execute `postinstall` (generates Prisma Client)
4. Deploy your app

### Run Migrations in Production

After first deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Login and link project
vercel login
vercel link

# Pull production environment variables
vercel env pull .env.production

# Run migrations
DATABASE_URL=$(grep DATABASE_URL .env.production | cut -d '=' -f2-) \
DIRECT_URL=$(grep DIRECT_URL .env.production | cut -d '=' -f2-) \
npx prisma migrate deploy
```

### Verify Production Health

Visit: `https://your-app.vercel.app/api/health`

Should return:
```json
{
  "status": "ok",
  "db": "ok",
  "timestamp": "...",
  "environment": "production"
}
```

---

## 🔄 Continuous Deployment

Every push to `main` branch will trigger automatic deployment:

```bash
git add .
git commit -m "feat: new feature"
git push origin main
# Vercel automatically deploys
```

---

## 🛡️ Security Best Practices

### Local Development
- ✅ `secrets.local.env` is gitignored
- ✅ `.env` is gitignored
- ✅ Only `.env.example` is committed
- ✅ NEXTAUTH_SECRET auto-generated (32 bytes)

### Production
- ✅ Environment variables in Vercel (not in code)
- ✅ Mark variables as "Sensitive"
- ✅ Use different databases for prod/preview
- ✅ Rotate secrets regularly

### Never Do This
- ❌ Commit `.env` or `secrets.local.env`
- ❌ Paste secrets in public issues/logs
- ❌ Share DATABASE_URL publicly
- ❌ Use same database for dev and prod

---

## 🔍 Troubleshooting

### "Missing DATABASE_URL"
- Check `secrets.local.env` exists
- Run `node scripts/setup-env.js`
- Verify `.env` has populated values

### "Migration Failed"
- Ensure `DIRECT_URL` is set (not pooled)
- Check Neon project is active
- Verify `?sslmode=require` in URLs

### "Build Failed on Vercel"
- Check all environment variables are set
- Verify `postinstall` script in package.json
- Check build logs for specific errors

### Health Endpoint Returns "down"
- Check DATABASE_URL is correct
- Verify Neon project not paused
- Check IP allowlist in Neon settings

---

## 📊 Environment Variables Reference

### Required for All Environments

```env
# Neon pooled connection (with -pooler)
DATABASE_URL="postgresql://user:pass@ep-xxx-pooler.aws.neon.tech/db?sslmode=require"

# Neon direct connection (without -pooler, for migrations)
DIRECT_URL="postgresql://user:pass@ep-xxx.aws.neon.tech/db?sslmode=require"

# Generated auth secret (32 bytes base64)
NEXTAUTH_SECRET="your-32-byte-base64-secret"

# Application URL
NEXTAUTH_URL="http://localhost:3000"  # or your Vercel domain

# Environment mode
NODE_ENV="development"  # or "production"
```

---

## 📚 Additional Resources

- [Neon Documentation](https://neon.tech/docs)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)
- [Vercel Deployment](https://vercel.com/docs)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

---

## 🎉 Success Criteria

Your deployment is successful when:
- ✅ GitHub repository has no secrets
- ✅ Vercel deployment succeeds
- ✅ `/api/health` returns `"db": "ok"`
- ✅ Application functions correctly
- ✅ Database migrations applied
- ✅ Environment variables secured

---

**Need Help?** Check the troubleshooting section above or open an issue (without pasting secrets!).
