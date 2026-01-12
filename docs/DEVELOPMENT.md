# Development Workflow

## Daily Development

### 1. Starting Work

```bash
# Pull latest changes
git pull

# Install any new dependencies
npm install

# Generate Prisma Client (if schema changed)
npm run db:generate

# Start dev server
npm run dev
```

### 2. Making Database Changes

#### Option A: Prototyping (Fast)
```bash
# Edit prisma/schema.prisma
# Then push directly to database
npm run db:push
```

#### Option B: Production-Ready (Migrations)
```bash
# Edit prisma/schema.prisma
# Create and apply migration
npm run db:migrate

# Give your migration a descriptive name when prompted
# Example: "add_user_profile_fields"
```

### 3. Testing Changes

```bash
# Open Prisma Studio to view data
npm run db:studio

# Seed test data
npm run db:seed

# Run tests (when implemented)
npm test
```

## Common Tasks

### Adding a New Model

1. Edit `prisma/schema.prisma`:
```prisma
model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([authorId])
}
```

2. Update User model to add relation:
```prisma
model User {
  // ... existing fields
  posts Post[]
}
```

3. Generate and migrate:
```bash
npm run db:generate
npm run db:migrate
```

### Querying Data in API Routes

```typescript
// app/api/users/route.ts
import { prisma } from '@/app/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });
  
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  
  const user = await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
      role: body.role || 'USER',
    },
  });
  
  return NextResponse.json(user);
}
```

### Server Components

```typescript
// app/users/page.tsx
import { prisma } from '@/app/db';

export default async function UsersPage() {
  const users = await prisma.user.findMany();
  
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}
```

## Git Workflow

### Feature Branch

```bash
# Create feature branch
git checkout -b feature/user-authentication

# Make changes, commit often
git add .
git commit -m "Add user authentication logic"

# Push to remote
git push origin feature/user-authentication

# Create Pull Request on GitHub
```

### Commit Messages

Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructuring
- `test:` Adding tests
- `chore:` Maintenance

Examples:
```bash
git commit -m "feat: add user profile page"
git commit -m "fix: resolve database connection timeout"
git commit -m "docs: update API documentation"
```

## Environment Management

### Local Development
```env
DATABASE_URL="prisma+postgres://localhost..."  # Local DB
NODE_ENV="development"
```

### Staging
```env
DATABASE_URL="postgresql://..."  # Neon staging branch
NODE_ENV="staging"
```

### Production
```env
DATABASE_URL="postgresql://..."  # Neon production
NODE_ENV="production"
```

## Best Practices

### Database
- ✅ Always use transactions for multi-step operations
- ✅ Add indexes for frequently queried fields
- ✅ Use `select` to limit returned data
- ✅ Implement pagination for large datasets
- ❌ Don't query in loops (use `include` or joins)
- ❌ Don't expose internal IDs to clients unnecessarily

### TypeScript
- ✅ Use Prisma's generated types
- ✅ Enable strict mode in tsconfig.json
- ✅ Validate input with Zod or similar
- ❌ Don't use `any` type

### Performance
- ✅ Use Server Components when possible
- ✅ Implement caching strategies
- ✅ Lazy load heavy components
- ✅ Optimize images with next/image
- ❌ Don't fetch data in Client Components unnecessarily

## Debugging

### Database Issues
```bash
# View connection status
npm run db:studio

# Reset database (⚠️ destroys data)
npx prisma migrate reset

# View migration history
npx prisma migrate status
```

### Prisma Client Issues
```bash
# Regenerate client
npm run db:generate

# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

## Deployment Checklist

- [ ] All tests passing
- [ ] Environment variables set in platform
- [ ] Database migrations applied
- [ ] Build succeeds locally (`npm run build`)
- [ ] No console.logs or debug code
- [ ] README updated
- [ ] CHANGELOG updated

---

Happy coding! 🚀
