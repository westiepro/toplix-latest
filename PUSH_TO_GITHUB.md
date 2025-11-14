# Push to GitHub for Strapi Cloud

Your Strapi project is now committed locally. Follow these steps to push it to GitHub so Strapi Cloud can see it.

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository:
   - **Repository name**: `toplix-new` (or your preferred name)
   - **Description**: "Property listings app with Next.js + Strapi Cloud + Supabase"
   - **Visibility**: Private or Public (your choice)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
3. Click **"Create repository"**

## Step 2: Connect and Push

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/toplix-new.git

# Push to GitHub
git push -u origin main
```

Or if you prefer SSH:

```bash
git remote add origin git@github.com:YOUR_USERNAME/toplix-new.git
git push -u origin main
```

## Step 3: Verify Push

1. Go to your GitHub repository page
2. You should see all your files, including the `/strapi` directory
3. Make sure the `strapi` directory contains:
   - `package.json`
   - `config/` directory
   - `src/` directory
   - Other Strapi files

## Step 4: Connect Strapi Cloud

1. Go back to [Strapi Cloud Dashboard](https://cloud.strapi.io/)
2. In the setup page, refresh or reconnect your repository
3. The error should be gone now
4. Select your branch: `main`
5. Continue with the setup

## Troubleshooting

### Still seeing "empty repository" error?

- Make sure you've pushed to GitHub (check your GitHub repository page)
- Refresh the Strapi Cloud page
- Make sure you selected the correct repository
- Verify the `strapi` directory exists in your GitHub repository

### Authentication issues?

- If using HTTPS, you may need a Personal Access Token
- If using SSH, make sure your SSH key is added to GitHub
- See [GitHub docs](https://docs.github.com/en/authentication) for help

---

**Ready to push?** Run the commands above to push your repository to GitHub!

