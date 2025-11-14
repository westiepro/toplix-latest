# Debugging Strapi Startup

If Strapi won't start, follow these steps:

## Check Process

```bash
ps aux | grep strapi
lsof -i :1337
```

## Check .env File

```bash
cd /Users/christian/Desktop/toplix-new/strapi
cat .env
```

## Start Strapi Manually (to see errors)

```bash
cd /Users/christian/Desktop/toplix-new/strapi
npm run develop
```

## Common Issues

### 1. Database Connection Failed

**Error**: `Error: connect ECONNREFUSED` or similar

**Solution**: 
- Check Supabase credentials in `.env`
- Verify Supabase database is running
- Check if host, port, username, password are correct

### 2. SSL Connection Error

**Error**: `SSL connection error` or `self signed certificate`

**Solution**:
- Ensure `DATABASE_SSL=true` in `.env`
- Try `DATABASE_SSL_REJECT_UNAUTHORIZED=false` temporarily

### 3. Authentication Failed

**Error**: `password authentication failed`

**Solution**:
- Verify database password is correct
- Check username is `postgres`
- Ensure database exists

### 4. Port Already in Use

**Error**: `Port 1337 already in use`

**Solution**:
```bash
lsof -ti:1337 | xargs kill -9
npm run develop
```

## Test Database Connection

Test if you can connect to Supabase:

```bash
# Install psql if needed
brew install postgresql

# Test connection
psql "postgresql://postgres:s48AgFUkZSmYX53F@db.luyjehygdbsvjoyrkcsn.supabase.co:5432/postgres?sslmode=require"
```

If connection works, the issue is with Strapi configuration.
If connection fails, check Supabase credentials.

