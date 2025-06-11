# Custom Domain Setup: ripplyapp.me with SSL

## ✅ Current Status
- Site works perfectly at: `https://jagreetdg.github.io`
- No security warnings
- Ready for custom domain setup

## 🎯 Goal
Set up `ripplyapp.me` with proper SSL certificate (no security warnings)

---

## 📋 Step-by-Step Setup

### **Step 1: Configure DNS (Domain Registrar)** 🌐

Go to your domain registrar (where you bought `ripplyapp.me`) and set up these DNS records:

**Method A: A Records (Recommended)**
```
Type: A
Name: @ (or blank/root)
Value: 185.199.108.153
TTL: 3600

Type: A
Name: @ (or blank/root)
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @ (or blank/root)
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @ (or blank/root)
Value: 185.199.111.153
TTL: 3600

Type: CNAME
Name: www
Value: jagreetdg.github.io
TTL: 3600
```

**Alternative Method B: CNAME (if A records not supported)**
```
Type: CNAME
Name: @ (or blank/root)
Value: jagreetdg.github.io.
TTL: 3600
```

### **Step 2: Wait for DNS Propagation** ⏳
- DNS changes take 5 minutes to 24 hours to propagate
- You can check propagation status at: https://dnschecker.org

### **Step 3: Verify DNS is Working** 🔍

Test DNS propagation:
```bash
# Check if DNS points to GitHub
dig ripplyapp.me

# Should show GitHub's IP addresses
nslookup ripplyapp.me
```

### **Step 4: Add Custom Domain in GitHub** ⚙️

**Only after DNS is propagated:**

1. **Go to**: `https://github.com/jagreetdg/jagreetdg.github.io/settings/pages`
2. **Custom domain field**: Enter `ripplyapp.me`
3. **Click "Save"**
4. **GitHub will**:
   - Verify domain ownership
   - Create CNAME file automatically
   - Show verification status

### **Step 5: Wait for Domain Verification** ✅

**GitHub will show status:**
- ❌ **"Domain verification pending"** - Wait
- ✅ **"Domain verified"** - Ready for SSL

### **Step 6: Enable HTTPS** 🔒

**After domain verification:**
1. **Check**: "Enforce HTTPS" checkbox
2. **Click "Save"**
3. **GitHub will provision SSL certificate**

### **Step 7: Wait for SSL Certificate** 🛡️

**SSL Certificate Provisioning:**
- Takes 10-60 minutes after domain verification
- GitHub uses Let's Encrypt
- Status shows in Pages settings

---

## 🔍 Verification Commands

```bash
# Test DNS
dig ripplyapp.me

# Test SSL certificate (after setup)
curl -I https://ripplyapp.me

# Check certificate details
openssl s_client -connect ripplyapp.me:443 -servername ripplyapp.me
```

---

## ⏱️ Timeline

1. **DNS Setup**: 5 minutes
2. **DNS Propagation**: 5 minutes - 24 hours
3. **Domain Verification**: 2-10 minutes
4. **SSL Certificate**: 10-60 minutes
5. **Total**: Usually 30 minutes - 25 hours

---

## 🚨 Common Issues & Solutions

### **Issue: "Domain verification failed"**
- **Check**: DNS records are correct
- **Wait**: DNS propagation can take 24 hours
- **Try**: Use A records instead of CNAME

### **Issue: "SSL certificate pending"**
- **Wait**: Can take up to 60 minutes
- **Check**: Domain is verified first
- **Retry**: Remove and re-add domain if stuck

### **Issue: "Mixed content warnings"**
- **Cause**: HTTP resources loaded on HTTPS page
- **Solution**: All resources use HTTPS (already fixed in our code)

---

## 📝 Important Notes

1. **User Pages vs Project Pages**: This is `jagreetdg.github.io` (user pages), so it serves from root
2. **Automatic CNAME**: GitHub creates the CNAME file automatically
3. **No Manual Files**: Don't manually create CNAME files
4. **DNS First**: Always set up DNS before adding domain to GitHub
5. **Patience**: SSL certificates take time to provision

---

## 🎯 Next Steps

1. **Configure DNS records** with your domain registrar
2. **Wait for DNS propagation** (check with `dig ripplyapp.me`)
3. **Add custom domain** in GitHub Pages settings
4. **Enable HTTPS** after verification
5. **Test**: `https://ripplyapp.me` should work without warnings

---

## 🔧 Rollback Plan

If anything goes wrong:
1. Remove custom domain from GitHub Pages settings
2. Site will continue working at `https://jagreetdg.github.io`
3. No downtime or data loss 