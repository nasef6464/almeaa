# 🚀 Production-Ready Next.js + Prisma + Neon Platform

This is a fully configured [Next.js](https://nextjs.org) project with Prisma ORM, PostgreSQL (Neon), and production best practices built-in.

## 📋 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL (via Neon or Prisma Postgres)
- **ORM:** Prisma 7
- **Styling:** Tailwind CSS 4
- **Authentication:** NextAuth (ready to configure)
- **Security:** bcryptjs for password hashing

## 🛠️ Prerequisites

- Node.js 20+ 
- npm, yarn, pnpm, or bun
- A Neon database (free tier available at [neon.tech](https://neon.tech))

## ⚙️ Setup Instructions

### 1. Clone and Install

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
# For Neon PostgreSQL
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
DIRECT_URL="postgresql://user:password@host/database?sslmode=require"

# Generate with: openssl rand -base64 32
NEXTAUTH_SECRET="your-generated-secret"
NEXTAUTH_URL="http://localhost:3000"
```

**Getting Neon URLs:**
1. Sign up at [console.neon.tech](https://console.neon.tech)
2. Create a new project
3. Copy the connection string from your dashboard
4. Use the pooled connection for `DATABASE_URL`
5. Use the direct connection for `DIRECT_URL`

### 3. Generate Prisma Client

```bash
npm run db:generate
```

### 4. Push Database Schema

```bash
# For development (no migrations)
npm run db:push

# OR for production (with migrations)
npm run db:migrate
```

### 5. Seed Database (Optional)

```bash
npm run db:seed
```

This creates 3 test users:
- `admin@example.com` / `admin123` (ADMIN)
- `user@example.com` / `user123` (USER)
- `mod@example.com` / `mod123` (MODERATOR)

### 6. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:push` | Push schema to database (dev) |
| `npm run db:migrate` | Create and run migrations |
| `npm run db:migrate:deploy` | Deploy migrations (production) |
| `npm run db:studio` | Open Prisma Studio GUI |
| `npm run db:seed` | Seed database with test data |

## 🗄️ Database Schema

### User Model

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  role      UserRole @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum UserRole {
  USER
  ADMIN
  MODERATOR
}
```

## 🔐 Using Prisma Client

Import the singleton instance anywhere in your app:

```typescript
import { prisma } from '@/app/db';

// Example: Get all users
const users = await prisma.user.findMany();

// Example: Create a user
const user = await prisma.user.create({
  data: {
    email: 'test@example.com',
    name: 'Test User',
    role: 'USER'
  }
});
```

## 📁 Project Structure

```
├── app/
│   ├── db.ts                 # Prisma Client singleton
│   ├── generated/prisma/     # Generated Prisma Client
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── prisma/
│   ├── schema.prisma         # Database schema
│   ├── seed.ts               # Database seeding script
│   └── migrations/           # Migration history
├── prisma.config.ts          # Prisma 7 configuration
├── .env                      # Environment variables (gitignored)
├── .env.example              # Environment template
└── package.json              # Dependencies and scripts
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

Vercel will automatically:
- Run `npm run build`
- Execute `postinstall` script (generates Prisma Client)
- Deploy your application

### Environment Variables for Production

Make sure to set these in your deployment platform:

- `DATABASE_URL` - Neon pooled connection string
- `DIRECT_URL` - Neon direct connection string
- `NEXTAUTH_SECRET` - Random secure string
- `NEXTAUTH_URL` - Your production URL
- `NODE_ENV=production`

## 🔧 Troubleshooting

### Prisma Client Not Found

```bash
npm run db:generate
```

### Database Connection Issues

- Verify your `DATABASE_URL` and `DIRECT_URL` are correct
- Check if your IP is whitelisted in Neon (if using IP restrictions)
- Ensure `?sslmode=require` is in your connection string

### Migration Issues

```bash
# Reset database (⚠️ destroys data)
npx prisma migrate reset

# Or push schema without migrations
npm run db:push
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Neon Documentation](https://neon.tech/docs)
- [NextAuth Documentation](https://next-auth.js.org)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is MIT licensed.

---

**Built with ❤️ using Next.js, Prisma, and Neon**
