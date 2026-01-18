# Vercel Environment Setup Instructions

## Required Environment Variables for Production

Make sure these are set in your Vercel project settings:

### Database (Neon)
```
DATABASE_URL=postgresql://neondb_owner:npg_DVJGzAc8w5xK@ep-small-tooth-aheci3x6-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
DIRECT_URL=postgresql://neondb_owner:npg_DVJGzAc8w5xK@ep-small-tooth-aheci3x6.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### NextAuth
```
NEXTAUTH_SECRET=LS53dcxd7htSjgOW76SbZUkCI89+SzxmwZuNQyquxM4
NEXTAUTH_URL=https://almeaa.vercel.app
```

### Google OAuth (Optional - for Google Sign-In)
```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Stripe (Optional - for payments)
```
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
```

## Important Notes:
1. **NEXTAUTH_URL** must be set to your production domain (https://almeaa.vercel.app)
2. **NEXTAUTH_SECRET** must be the same value across all environments
3. **DATABASE_URL** should use the `-pooler` endpoint for serverless functions
4. After setting environment variables, redeploy the project on Vercel

## Demo Accounts Available:
- Admin: admin@test.com / admin123
- Student: student@test.com / student123
- Trainer: trainer@test.com / trainer123
- Parent: parent@test.com / parent123

## Deployment Status:
Last pushed: $(Get-Date)
Branch: main
Latest commit: Add role-specific registration fields
