# Strapi Configuration for Strapi Cloud

This directory contains your Strapi project configured for deployment to Strapi Cloud with Supabase PostgreSQL database.

## ✅ What's Configured

1. ✅ **PostgreSQL Support** - Database configuration updated for PostgreSQL/Supabase
2. ✅ **Production Settings** - Default database client set to `postgres`
3. ✅ **CORS Configuration** - Configured for Next.js frontend and Vercel deployment
4. ✅ **Security Headers** - Content Security Policy updated for production use
5. ✅ **PostgreSQL Client** - `pg` package installed

## 📋 Next Steps for Strapi Cloud Deployment

### 1. Push to Git Repository

Make sure your Strapi project is committed and pushed to your Git repository:

```bash
git add strapi/
git commit -m "Add Strapi project configured for Strapi Cloud"
git push origin main
```

### 2. Connect to Strapi Cloud

1. Go to [Strapi Cloud Dashboard](https://cloud.strapi.io/)
2. Click **"Create new project"**
3. Connect your Git repository
4. Select your repository and branch (`main`)
5. Configure:
   - **Display name**: `toplix-properties` (or your preferred name)
   - **Region**: Choose closest to you
6. Click **"Continue"**

### 3. Configure Environment Variables in Strapi Cloud

In your Strapi Cloud project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add the following variables (see `STRAPI_CLOUD_ENV.md` for details):

**Database Configuration:**
```bash
DATABASE_CLIENT=postgres
DATABASE_HOST=db.xxxxx.supabase.co
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_supabase_password
DATABASE_SSL=true
DATABASE_SSL_REJECT_UNAUTHORIZED=true
```

**Strapi Secrets** (generate using `node ../generate-keys.js`):
```bash
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your_secure_random_string
ADMIN_JWT_SECRET=your_secure_random_string
TRANSFER_TOKEN_SALT=your_secure_random_string
JWT_SECRET=your_secure_random_string
```

### 4. Connect Supabase Database

1. In Strapi Cloud, go to **Settings** → **Database**
2. The environment variables above will configure the connection
3. Strapi Cloud will automatically connect to your Supabase database

### 5. Deploy

Once configured, Strapi Cloud will automatically:
- Build your Strapi project
- Deploy it to production
- Provide you with your API URL (e.g., `https://your-project.strapi.cloud`)

### 6. Create Admin User

1. Access your Strapi Cloud admin panel at `https://your-project.strapi.cloud/admin`
2. Complete the admin registration
3. Start creating content types and content

## 📚 Documentation

- **Environment Variables**: See `STRAPI_CLOUD_ENV.md`
- **Strapi Cloud Setup**: See `../STRAPI_CLOUD_SETUP.md`
- **Main Tutorial**: See `../TUTORIAL.md`

## 🔧 Local Development (Optional)

If you want to run Strapi locally for development:

1. Create `.env` file in this directory (see `.env.example` for reference)
2. Configure your Supabase database credentials
3. Generate secure keys using `node ../generate-keys.js`
4. Run: `npm run develop`

**Note**: For Strapi Cloud deployment, you don't need to run Strapi locally. All configuration happens in the cloud dashboard.

## 🚀 Production Checklist

- [ ] Strapi project pushed to Git repository
- [ ] Strapi Cloud project created
- [ ] Git repository connected to Strapi Cloud
- [ ] Environment variables configured in Strapi Cloud
- [ ] Supabase database credentials added
- [ ] Strapi secrets generated and added
- [ ] Deployment successful
- [ ] Admin user created
- [ ] Content types created (Property)
- [ ] Permissions configured

---

**Ready to deploy!** Follow the steps above to deploy your Strapi project to Strapi Cloud.
