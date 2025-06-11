# SSL Certificate Fix for ripplyapp.me

## Issue
Your custom domain `ripplyapp.me` is being served with a `*.github.io` SSL certificate, causing a security warning.

## Steps to Fix

### 1. Repository Settings ✅ (Already Done)
- CNAME file is now in `/public/CNAME` and will be deployed with the build

### 2. GitHub Repository Configuration 🔧 (You Need to Do This)

Go to your GitHub repository settings:
1. Navigate to `Settings` > `Pages`
2. Under "Custom domain", enter: `ripplyapp.me`
3. Make sure "Enforce HTTPS" is checked
4. GitHub will verify the domain and provision an SSL certificate

### 3. DNS Configuration 🔧 (Verify This)

Make sure your domain's DNS is configured correctly:
- For the domain `ripplyapp.me`, you need either:
  - **A records** pointing to GitHub Pages IPs:
    ```
    185.199.108.153
    185.199.109.153
    185.199.110.153
    185.199.111.153
    ```
  - **OR a CNAME record** pointing to: `yourusername.github.io`

### 4. Wait for SSL Certificate Provisioning ⏳

After configuring the custom domain in GitHub settings:
- GitHub will automatically provision an SSL certificate
- This can take 10-60 minutes
- You'll see a green checkmark when it's ready

### 5. Force Refresh 🔄

Once the SSL certificate is ready:
- Clear your browser cache
- Try visiting `https://ripplyapp.me` in an incognito window

## Verification

To check if everything is working:
```bash
# Check SSL certificate
curl -I https://ripplyapp.me

# Check if CNAME is deployed
curl https://ripplyapp.me/CNAME
```

## Common Issues

1. **Domain not verified**: Go to repository Settings > Pages and add the custom domain
2. **DNS propagation**: DNS changes can take up to 24 hours to propagate
3. **Certificate provisioning**: GitHub needs time to issue the SSL certificate
4. **Browser cache**: Try incognito mode or clear cache

## Next Steps

1. Go to your GitHub repository settings and configure the custom domain
2. Wait for SSL certificate provisioning
3. Test in incognito mode

The CNAME file has been moved to the correct location and will be deployed with the next build. 