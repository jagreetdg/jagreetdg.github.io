# GitHub Pages Deployment Guide

This guide will help you deploy the Ripply Waitlist page to GitHub Pages.

## 🚀 Quick Deploy (Recommended)

### Step 1: Create GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository
2. Name it something like `ripply-waitlist` or `ripply-coming-soon`
3. Make it public (required for free GitHub Pages)
4. Don't initialize with README (we already have one)

### Step 2: Update Configuration
Before deploying, update these files with your repository information:

**vite.config.ts** - Line 8:
```typescript
base: '/your-repo-name/', // Change this to your actual repo name
```

**package.json** - Line 6:
```json
"homepage": "https://yourusername.github.io/your-repo-name",
```

**index.html** - Lines 12, 14, 20, 22:
```html
<!-- Update these URLs to match your domain -->
<meta property="og:url" content="https://yourusername.github.io/your-repo-name/" />
<meta property="og:image" content="https://yourusername.github.io/your-repo-name/logo_transparent.png" />
<meta property="twitter:url" content="https://yourusername.github.io/your-repo-name/" />
<meta property="twitter:image" content="https://yourusername.github.io/your-repo-name/logo_transparent.png" />
```

### Step 3: Push to GitHub
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Ripply waitlist page"

# Add remote origin (replace with your repo URL)
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to main branch
git push -u origin main
```

### Step 4: Deploy
```bash
# Install dependencies
npm install

# Deploy to GitHub Pages
npm run deploy
```

The `npm run deploy` command will:
1. Build the project
2. Create a `gh-pages` branch
3. Push the built files to that branch
4. Your site will be available at `https://yourusername.github.io/your-repo-name`

## 🔧 Manual Deploy Alternative

If the automatic deploy doesn't work:

### Option 1: Actions Deploy
1. Go to your repository settings
2. Navigate to "Pages" in the sidebar
3. Select "GitHub Actions" as the source
4. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Setup Pages
      uses: actions/configure-pages@v3
    
    - name: Upload artifact
      uses: actions/upload-pages-artifact@v2
      with:
        path: './dist'
    
    - name: Deploy to GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v2
```

### Option 2: Manual Upload
1. Run `npm run build` locally
2. Go to your repository settings → Pages
3. Select "Deploy from a branch"
4. Choose `main` branch and `/docs` folder
5. Copy contents of `dist/` folder to `docs/` folder in your repo
6. Push the changes

## 🛠️ Troubleshooting

### Common Issues:

**1. 404 Error on GitHub Pages**
- Check that your `base` path in `vite.config.ts` matches your repo name
- Make sure GitHub Pages is enabled in repository settings
- Verify the correct branch is selected for Pages

**2. Assets Not Loading**
- Ensure all URLs in `index.html` use your GitHub Pages domain
- Check that `logo_transparent.png` is in the `public/` folder
- Verify the build process completed successfully

**3. Deployment Fails**
- Make sure you have write permissions to the repository
- Check that the `gh-pages` package is installed
- Try clearing npm cache: `npm cache clean --force`

**4. Language Switching Not Working**
- This uses localStorage, which works fine on GitHub Pages
- Clear browser cache if issues persist

### Verification Steps:
1. Visit `https://yourusername.github.io/your-repo-name`
2. Check that the logo loads properly
3. Test language switching (EN ↔ 日本語)
4. Test the email form submission
5. Verify animations are smooth
6. Test on mobile devices

## 🎯 Performance Tips

- GitHub Pages serves static files with good caching
- The page should load in under 2 seconds
- All animations should be smooth on modern browsers
- Mobile performance should be excellent

## 🔄 Updates

To update the live site:
1. Make changes to your local files
2. Commit and push to main branch
3. Run `npm run deploy` again
4. Changes will be live in 1-2 minutes

## 📱 Custom Domain (Optional)

To use a custom domain:
1. Add a `CNAME` file to the `public/` folder with your domain
2. Update all URLs in the configuration files
3. Configure DNS with your domain provider
4. Enable HTTPS in GitHub Pages settings

## 🚨 Important Notes

- GitHub Pages has a 1GB soft limit for repositories
- Build time is usually under 1 minute
- Changes may take 1-10 minutes to appear live
- HTTPS is automatically enabled for github.io domains
- The site will be publicly accessible (can't be private on free tier)

## 📞 Support

If you encounter issues:
1. Check the GitHub Pages deployment logs
2. Verify all configuration files are correct
3. Test the build locally with `npm run build && npm run preview`
4. Check GitHub's status page for any outages

---

Happy deploying! 🚀 