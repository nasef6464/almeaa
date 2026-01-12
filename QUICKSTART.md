# 🚀 Quick Start Guide

Get your Next.js + Prisma + Neon app running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Configure Database

### Option A: Use Neon (Recommended for Production)

1. Sign up at [console.neon.tech](https://console.neon.tech)
2. Create a new project
3. Copy your connection strings
4. Update `.env`:

```env
DATABASE_URL="postgresql://user:password@host/db?sslmode=require"
DIRECT_URL="postgresql://user:password@host/db?sslmode=require"
```

See [docs/NEON_SETUP.md](docs/NEON_SETUP.md) for detailed instructions.

### Option B: Use Local Prisma Postgres (Already Configured)

The `.env` file is already configured with a local Prisma Postgres instance. Just use it as-is for quick testing!

## Step 3: Generate Secret

```bash
# On Windows (PowerShell)
$bytes = New-Object byte[] 32; (New-Object Security.Cryptography.RNGCryptoServiceProvider).GetBytes($bytes); [Convert]::ToBase64String($bytes)

# On macOS/Linux
openssl rand -base64 32
```

Update `.env`:
```env
NEXTAUTH_SECRET="paste-your-generated-secret-here"
```

## Step 4: Setup Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# (Optional) Seed with test data
npm run db:seed
```

## Step 5: Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## Test Users (if seeded)

- **Admin:** admin@example.com / admin123
- **User:** user@example.com / user123
- **Moderator:** mod@example.com / mod123

## Next Steps

1. **View Database:** `npm run db:studio`
2. **Read Docs:** Check [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)
3. **Build Feature:** Edit `app/page.tsx` and start coding!
4. **Deploy:** Follow [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

## Need Help?

- [README.md](README.md) - Full documentation
- [docs/NEON_SETUP.md](docs/NEON_SETUP.md) - Neon configuration
- [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) - Development workflow
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) - Production deployment

## Common Commands

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run db:studio        # Open Prisma Studio
npm run db:migrate       # Create migrations
npm run lint             # Run ESLint
```

---

Happy coding! 🚀
