# SecureDocs Website - Deployment Checklist

## 📋 Pre-Deployment Checklist

### ✅ **1. Environment Setup**

#### 1.1 Install Dependencies
```bash
# Navigate to project directory
cd securedocs-website

# Install all npm packages
npm install

# Verify installation
npm list --depth=0
```

#### 1.2 Configure Environment Variables

Create `.env` file in root:

```env
# API Configuration
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_API_VERSION=v1
VITE_API_TIMEOUT=30000

# Authentication
VITE_AUTH_ENDPOINT=/api/auth
VITE_AUTH_MICROSOFT_CLIENT_ID=your-microsoft-client-id-here
VITE_AUTH_GOOGLE_CLIENT_ID=your-google-client-id-here
VITE_AUTH_GITHUB_CLIENT_ID=your-github-client-id-here

# Payment (Razorpay)
VITE_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxxx

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_IRA_BOT=true
VITE_ENABLE_EXPOSURE_CHECK=true

# Cache
VITE_ENABLE_REDIS_CACHE=true

# Environment
VITE_ENVIRONMENT=production
```

**Security Notes:**
- ⚠️ Never commit `.env` file to git
- ⚠️ Use different values for development/staging/production
- ⚠️ Store production secrets in secure vault (Azure Key Vault, AWS Secrets Manager, etc.)

---

### ✅ **2. Backend Integration**

#### 2.1 Verify ASP.NET Core API Endpoints

Test all endpoints with Postman/Insomnia:

**Authentication Endpoints:**
```
✅ POST   /api/v1/auth/login
✅ POST   /api/v1/auth/register
✅ POST   /api/v1/auth/oauth
✅ POST   /api/v1/auth/refresh
✅ POST   /api/v1/auth/logout
✅ GET    /api/v1/auth/me
✅ POST   /api/v1/auth/reset-password
✅ POST   /api/v1/auth/verify-email
```

**License Endpoints:**
```
✅ GET    /api/v1/licenses/user
✅ GET    /api/v1/licenses/{id}
✅ POST   /api/v1/licenses/activate
✅ POST   /api/v1/licenses/{id}/deactivate
✅ GET    /api/v1/licenses/{id}/devices
✅ POST   /api/v1/licenses/validate
✅ POST   /api/v1/licenses/offline-activation
✅ POST   /api/v1/licenses/start-trial
✅ POST   /api/v1/licenses/{id}/change-plan
✅ POST   /api/v1/licenses/{id}/cancel
```

**Payment Endpoints:**
```
✅ POST   /api/v1/payment/create-order
✅ POST   /api/v1/payment/verify
✅ GET    /api/v1/payment/history
✅ GET    /api/v1/payment/invoice/{id}
✅ POST   /api/v1/payment/validate-coupon
✅ GET    /api/v1/payment/pricing
```

#### 2.2 Configure CORS

In your ASP.NET Core `Startup.cs` or `Program.cs`:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSecureDocsWebsite",
        policy => policy
            .WithOrigins(
                "https://yourdomain.com",
                "https://www.yourdomain.com",
                "http://localhost:5173" // For development
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials()
            .SetPreflightMaxAge(TimeSpan.FromMinutes(10)));
});

app.UseCors("AllowSecureDocsWebsite");
```

#### 2.3 Setup OAuth Providers

**Microsoft Azure AD:**
1. Go to Azure Portal → App Registrations
2. Create new registration
3. Add redirect URI: `https://yourdomain.com/auth/callback`
4. Copy Client ID to `.env`
5. Create client secret and store securely in backend

**Google Cloud Console:**
1. Go to Google Cloud Console → APIs & Services → Credentials
2. Create OAuth 2.0 Client ID
3. Add authorized redirect URI: `https://yourdomain.com/auth/callback`
4. Copy Client ID to `.env`

**GitHub OAuth:**
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create new OAuth App
3. Add callback URL: `https://yourdomain.com/auth/callback`
4. Copy Client ID to `.env`

---

### ✅ **3. Payment Integration (Razorpay)**

#### 3.1 Razorpay Account Setup
1. Sign up at https://razorpay.com
2. Complete KYC verification
3. Go to Settings → API Keys
4. Copy Key ID to `.env` as `VITE_RAZORPAY_KEY_ID`
5. Store Key Secret securely in backend (never in frontend!)

#### 3.2 Configure Webhooks

**Razorpay Dashboard:**
1. Go to Settings → Webhooks
2. Create webhook URL: `https://api.yourdomain.com/api/v1/payment/webhook`
3. Select events:
   - `payment.authorized`
   - `payment.captured`
   - `payment.failed`
   - `order.paid`
   - `subscription.charged`
4. Copy webhook secret to backend environment

#### 3.3 Test Payment Flow

```bash
# Use Razorpay test mode
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxx

# Test cards (Razorpay test mode)
Card: 4111 1111 1111 1111
CVV: Any 3 digits
Expiry: Any future date
```

---

### ✅ **4. Build & Optimize**

#### 4.1 Production Build

```bash
# Clean previous builds
rm -rf dist

# Build for production
npm run build

# Verify build output
ls -lh dist/
```

#### 4.2 Build Output Checklist

```
dist/
├── index.html          ✅ Entry point
├── assets/
│   ├── index-[hash].js ✅ Main JS bundle
│   ├── index-[hash].css ✅ Stylesheets
│   └── *.png/svg       ✅ Static assets
└── ...
```

#### 4.3 Performance Optimization

**Verify bundle sizes:**
```bash
# Install bundle analyzer
npm install --save-dev rollup-plugin-visualizer

# Analyze build
npm run build -- --analyze
```

**Target Sizes:**
- ✅ Main JS bundle: < 500KB (gzipped)
- ✅ CSS bundle: < 100KB (gzipped)
- ✅ Total initial load: < 1MB

---

### ✅ **5. Security Hardening**

#### 5.1 Security Headers

Add to your web server configuration:

```nginx
# Nginx
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.yourdomain.com https://checkout.razorpay.com;" always;
```

#### 5.2 SSL/TLS Certificate

**Options:**
1. **Let's Encrypt** (Free) - Recommended
   ```bash
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

2. **Commercial SSL** (Paid)
   - Purchase from provider
   - Install certificate
   - Configure auto-renewal

**Verify SSL:**
- Test at: https://www.ssllabs.com/ssltest/
- Target: A+ rating

#### 5.3 Environment-Specific Configurations

**Production `.env`:**
```env
VITE_ENVIRONMENT=production
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_ENABLE_ANALYTICS=true
```

**Staging `.env`:**
```env
VITE_ENVIRONMENT=staging
VITE_API_BASE_URL=https://api-staging.yourdomain.com
VITE_ENABLE_ANALYTICS=false
```

---

### ✅ **6. Server Deployment**

#### Option A: Nginx (Linux)

**1. Install Nginx:**
```bash
sudo apt update
sudo apt install nginx
```

**2. Copy build files:**
```bash
sudo mkdir -p /var/www/securedocs
sudo cp -r dist/* /var/www/securedocs/
```

**3. Configure Nginx:**

Create `/etc/nginx/sites-available/securedocs`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Root directory
    root /var/www/securedocs;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Handle React routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Proxy API requests to backend
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**4. Enable site:**
```bash
sudo ln -s /etc/nginx/sites-available/securedocs /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### Option B: IIS (Windows)

**1. Install URL Rewrite Module:**
- Download from: https://www.iis.net/downloads/microsoft/url-rewrite

**2. Copy build files:**
```powershell
Copy-Item -Path dist\* -Destination C:\inetpub\wwwroot\securedocs\ -Recurse
```

**3. Create `web.config`:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <!-- URL Rewrite for React Router -->
    <rewrite>
      <rules>
        <rule name="React Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
            <add input="{REQUEST_URI}" pattern="^/api" negate="true" />
          </conditions>
          <action type="Rewrite" url="/" />
        </rule>
      </rules>
    </rewrite>

    <!-- Static content caching -->
    <staticContent>
      <clientCache cacheControlMode="UseMaxAge" cacheControlMaxAge="365.00:00:00" />
      <mimeMap fileExtension=".webp" mimeType="image/webp" />
      <mimeMap fileExtension=".woff2" mimeType="font/woff2" />
    </staticContent>

    <!-- Compression -->
    <urlCompression doStaticCompression="true" doDynamicCompression="true" />

    <!-- Security headers -->
    <httpProtocol>
      <customHeaders>
        <add name="X-Frame-Options" value="DENY" />
        <add name="X-Content-Type-Options" value="nosniff" />
        <add name="X-XSS-Protection" value="1; mode=block" />
        <add name="Referrer-Policy" value="strict-origin-when-cross-origin" />
      </customHeaders>
    </httpProtocol>
  </system.webServer>
</configuration>
```

**4. Configure IIS Site:**
- Open IIS Manager
- Create new site: "SecureDocs"
- Physical path: `C:\inetpub\wwwroot\securedocs`
- Binding: HTTPS on port 443
- Install SSL certificate

#### Option C: Cloud Deployment

**Vercel:**
```bash
npm install -g vercel
vercel --prod
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

**AWS S3 + CloudFront:**
```bash
aws s3 sync dist/ s3://your-bucket-name/ --delete
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

---

### ✅ **7. Post-Deployment Testing**

#### 7.1 Functionality Tests

```
✅ Homepage loads correctly
✅ Navigation works (all menu items)
✅ Login/Registration flow
✅ OAuth login (Microsoft/Google/GitHub)
✅ Password reset
✅ Pricing page displays correctly
✅ Payment integration (Razorpay)
✅ Trial activation
✅ License validation
✅ User dashboard
✅ Data exposure check page
✅ Ira chatbot interactions
✅ Contact form submission
✅ Mobile responsiveness
✅ Browser compatibility (Chrome, Firefox, Safari, Edge)
```

#### 7.2 Performance Tests

**Tools:**
- Google PageSpeed Insights: https://pagespeed.web.dev/
- GTmetrix: https://gtmetrix.com/
- WebPageTest: https://www.webpagetest.org/

**Targets:**
- ✅ Lighthouse Performance Score: > 90
- ✅ First Contentful Paint: < 1.5s
- ✅ Largest Contentful Paint: < 2.5s
- ✅ Time to Interactive: < 3.5s
- ✅ Cumulative Layout Shift: < 0.1

#### 7.3 Security Tests

**SSL/TLS:**
```bash
# Test SSL configuration
openssl s_client -connect yourdomain.com:443 -tls1_2
```

**Security Headers:**
```bash
# Check security headers
curl -I https://yourdomain.com
```

**Vulnerability Scan:**
- Use: https://observatory.mozilla.org/
- Target: A+ rating

---

### ✅ **8. Monitoring & Analytics**

#### 8.1 Error Monitoring

**Sentry Integration:**
```bash
npm install @sentry/react
```

```typescript
// Add to App.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: import.meta.env.VITE_ENVIRONMENT,
});
```

#### 8.2 Analytics

**Google Analytics 4:**
```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

#### 8.3 Uptime Monitoring

**Services:**
- UptimeRobot: https://uptimerobot.com/
- Pingdom: https://www.pingdom.com/
- StatusCake: https://www.statuscake.com/

---

### ✅ **9. Backup & Recovery**

#### 9.1 Automated Backups

**Nginx Server:**
```bash
# Create backup script
#!/bin/bash
backup_dir="/backups/securedocs"
timestamp=$(date +%Y%m%d_%H%M%S)

tar -czf "$backup_dir/securedocs_$timestamp.tar.gz" /var/www/securedocs
find "$backup_dir" -name "*.tar.gz" -mtime +30 -delete
```

**Run daily:**
```bash
crontab -e
0 2 * * * /path/to/backup-script.sh
```

#### 9.2 Database Backups

Coordinate with backend team for:
- SQL Server automated backups
- Redis cache snapshots
- Transaction log backups

---

### ✅ **10. Documentation**

**Update:**
- [ ] API endpoint documentation
- [ ] Deployment runbook
- [ ] Troubleshooting guide
- [ ] User manual
- [ ] Admin guide

---

## 🚀 Go-Live Checklist

**Final Steps:**

- [ ] All tests passing
- [ ] SSL certificate installed and verified
- [ ] DNS records configured
- [ ] CDN configured (if using)
- [ ] Monitoring tools active
- [ ] Backup systems running
- [ ] Team notified
- [ ] Rollback plan ready
- [ ] Support channels prepared
- [ ] Marketing/launch communications ready

**Post-Launch (First 24 hours):**

- [ ] Monitor error logs
- [ ] Check API performance metrics
- [ ] Verify payment processing
- [ ] Monitor user registrations
- [ ] Review analytics data
- [ ] Test critical user flows
- [ ] Monitor server resources
- [ ] Check email deliverability

---

## 📞 Support Contacts

**Development Team:**
- Backend Lead: [Name] - [Email]
- Frontend Lead: [Name] - [Email]
- DevOps: [Name] - [Email]

**External Services:**
- Razorpay Support: https://razorpay.com/support/
- Azure Support: https://azure.microsoft.com/support/
- Hosting Provider: [Contact]

---

**Last Updated**: December 27, 2024  
**Deployment Version**: 1.0.0

