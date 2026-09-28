# SecureDocs Website - Quick Start Guide

## 🚀 Get Started in 5 Minutes

This guide will help you integrate the SecureDocs marketing website with your existing ASP.NET Core backend.

---

## 📁 Project Structure

```
securedocs-website/
├── components/          # React components
│   ├── AuthPage.tsx     # Login/Registration (✅ Ready for integration)
│   ├── DataExposurePage.tsx
│   ├── IraHelperDialog.tsx  # AI chatbot
│   └── ...
├── pages/               # Page components
│   ├── LandingPage.tsx  # Marketing homepage
│   ├── FeaturesPage.tsx
│   ├── PricingPage.tsx  # With payment integration points
│   └── ...
├── services/            # API service layers (✅ NEW)
│   ├── auth.service.ts       # Authentication API calls
│   ├── license.service.ts    # License management
│   └── payment.service.ts    # Razorpay integration
├── utils/               # Utility functions
│   ├── api-client.ts         # ✅ NEW - API client with interceptors
│   └── security.ts           # Security utilities
├── .env                 # Environment variables (create this)
└── ...
```

---

## ⚡ Step 1: Install Dependencies

```bash
# Navigate to project directory
cd securedocs-website

# Install all dependencies (if not already done)
npm install
```

**No additional packages needed!** The API client uses native `fetch`, no axios required.

---

## ⚡ Step 2: Configure Environment

Create `.env` file in the root directory:

```env
# Point to your ASP.NET Core backend
VITE_API_BASE_URL=http://localhost:5000
VITE_API_VERSION=v1

# Razorpay (get from Razorpay dashboard)
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxx

# OAuth (optional - for Microsoft/Google/GitHub login)
VITE_AUTH_MICROSOFT_CLIENT_ID=your-client-id
VITE_AUTH_GOOGLE_CLIENT_ID=your-client-id
VITE_AUTH_GITHUB_CLIENT_ID=your-client-id

# Feature flags
VITE_ENABLE_ANALYTICS=false
```

**For production:**
```env
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxxx
VITE_ENVIRONMENT=production
```

---

## ⚡ Step 3: Update Backend CORS

In your ASP.NET Core `Program.cs` or `Startup.cs`:

```csharp
// Add this to ConfigureServices
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy
            .WithOrigins(
                "http://localhost:5173",  // Vite dev server
                "https://yourdomain.com"  // Production
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});

// Add this to Configure (BEFORE UseAuthorization)
app.UseCors("AllowFrontend");
```

---

## ⚡ Step 4: Test API Connection

**Start your backend:**
```bash
# In your ASP.NET Core project
dotnet run
```

**Start the frontend:**
```bash
# In this project
npm run dev
```

**Test the connection:**
1. Open browser: http://localhost:5173
2. Click "Login" button (top-right)
3. Try to login - check browser console for API calls

---

## ⚡ Step 5: Backend API Endpoints Required

Your ASP.NET Core backend must expose these endpoints:

### **Authentication** (Required)
```
POST   /api/v1/auth/login
POST   /api/v1/auth/register
POST   /api/v1/auth/refresh
GET    /api/v1/auth/me
```

**Example ASP.NET Controller:**

```csharp
[ApiController]
[Route("api/v1/auth")]
public class AuthController : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        // Your authentication logic
        var user = await _authService.AuthenticateAsync(request.Email, request.Password);
        
        if (user == null)
            return Unauthorized(new { message = "Invalid credentials" });

        var accessToken = GenerateJwtToken(user);
        var refreshToken = GenerateRefreshToken();

        return Ok(new {
            accessToken,
            refreshToken,
            expiresIn = 3600,
            user = new {
                id = user.Id,
                email = user.Email,
                name = user.Name,
                role = user.Role
            }
        });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        // Your registration logic
        var user = await _authService.RegisterAsync(request.Email, request.Password, request.Name);
        
        var accessToken = GenerateJwtToken(user);
        var refreshToken = GenerateRefreshToken();

        return Ok(new {
            accessToken,
            refreshToken,
            expiresIn = 3600,
            user = new {
                id = user.Id,
                email = user.Email,
                name = user.Name,
                role = user.Role
            }
        });
    }
}
```

### **License Management** (Optional - can add later)
```
GET    /api/v1/licenses/user
POST   /api/v1/licenses/activate
POST   /api/v1/licenses/start-trial
```

### **Payment** (Optional - for paid plans)
```
POST   /api/v1/payment/create-order
POST   /api/v1/payment/verify
```

---

## ⚡ Step 6: Frontend Changes (Already Done!)

The following components are **already updated** to use real APIs:

### ✅ **Authentication** (`/components/AuthPage.tsx`)

```typescript
// Login example - already implemented
import { authService } from '../services/auth.service';

const handleLogin = async (email: string, password: string) => {
  const response = await authService.login({ email, password });
  // Token stored automatically in localStorage
  // User redirected to dashboard
};
```

### ✅ **API Client** (`/utils/api-client.ts`)

Features:
- Automatic JWT token handling
- Token refresh on 401 errors
- Request/response interceptors
- Timeout handling (30s default)
- Error handling

### ✅ **Service Layers** (`/services/*.ts`)

- `auth.service.ts` - Login, register, OAuth
- `license.service.ts` - License activation, validation
- `payment.service.ts` - Razorpay integration

---

## 🧪 Step 7: Testing

### **Test Authentication Flow:**

1. **Start both servers:**
   ```bash
   # Terminal 1 - Backend
   dotnet run

   # Terminal 2 - Frontend
   npm run dev
   ```

2. **Test registration:**
   - Go to http://localhost:5173
   - Click "Login" → "Create an account"
   - Fill form and submit
   - Check Network tab in browser DevTools
   - Should see POST to `/api/v1/auth/register`

3. **Test login:**
   - Use credentials from step 2
   - Click "Sign in"
   - Should see POST to `/api/v1/auth/login`
   - Token should be stored in localStorage

4. **Verify token:**
   - Open browser console
   - Type: `localStorage.getItem('auth_token')`
   - Should see JWT token

### **Test with Mock Backend (No Backend Ready Yet):**

If your backend isn't ready, you can test with a mock server:

```bash
# Install json-server
npm install -g json-server

# Create db.json
echo '{
  "auth": {
    "accessToken": "mock-token-123",
    "refreshToken": "mock-refresh-456",
    "user": {
      "id": "1",
      "email": "test@example.com",
      "name": "Test User",
      "role": "user"
    }
  }
}' > db.json

# Run mock server
json-server --watch db.json --port 5000
```

Then update `.env`:
```env
VITE_API_BASE_URL=http://localhost:5000
```

---

## 🎨 Step 8: Customization

### **Update Branding:**

1. **Logo**: Replace in `/components/SecureDocsLogo.tsx`
2. **Colors**: Edit `/styles/globals.css`
3. **Company Name**: Search and replace "SecureDocs"

### **Add Custom Pages:**

```typescript
// Example: Create /pages/DashboardPage.tsx
import { useEffect, useState } from 'react';
import { licenseService } from '../services/license.service';

export function DashboardPage() {
  const [licenses, setLicenses] = useState([]);

  useEffect(() => {
    loadLicenses();
  }, []);

  const loadLicenses = async () => {
    try {
      const data = await licenseService.getUserLicenses();
      setLicenses(data);
    } catch (error) {
      console.error('Failed to load licenses:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white p-8">
      <h1>My Licenses</h1>
      {/* Render licenses */}
    </div>
  );
}
```

---

## 📊 Step 9: Razorpay Payment Integration

### **Setup Razorpay:**

1. Sign up at https://razorpay.com
2. Get API keys from dashboard
3. Add to `.env`:
   ```env
   VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxx
   ```

### **Backend Setup (ASP.NET Core):**

```csharp
[HttpPost("create-order")]
public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequest request)
{
    // Initialize Razorpay
    var client = new RazorpayClient("key_id", "key_secret");
    
    var options = new Dictionary<string, object>
    {
        { "amount", request.Amount * 100 }, // Amount in paise
        { "currency", "INR" },
        { "receipt", Guid.NewGuid().ToString() }
    };
    
    var order = client.Order.Create(options);
    
    return Ok(new {
        orderId = order["id"],
        amount = order["amount"],
        currency = order["currency"]
    });
}

[HttpPost("verify")]
public async Task<IActionResult> VerifyPayment([FromBody] PaymentVerification data)
{
    // Verify signature
    var isValid = RazorpayPayment.Verify(
        data.razorpay_order_id,
        data.razorpay_payment_id,
        data.razorpay_signature,
        "key_secret"
    );
    
    if (isValid)
    {
        // Activate license
        var license = await _licenseService.ActivateLicenseAsync(userId, planType);
        return Ok(new { success = true, licenseKey = license.Key });
    }
    
    return BadRequest(new { success = false });
}
```

### **Frontend Usage (Already Implemented):**

The payment flow is ready in `/services/payment.service.ts`. Just ensure your backend endpoints match!

---

## 🔒 Step 10: Security Checklist

Before going to production:

- [ ] Enable HTTPS on both frontend and backend
- [ ] Use strong JWT secrets (min 32 characters)
- [ ] Set up rate limiting on backend
- [ ] Validate all inputs on backend
- [ ] Use VITE_RAZORPAY_KEY_ID (live key) for production
- [ ] Configure CSP headers
- [ ] Enable SQL injection protection
- [ ] Use parameterized queries
- [ ] Store passwords with bcrypt/Argon2
- [ ] Implement refresh token rotation

---

## 📚 Additional Resources

### **Documentation:**
- `/INTEGRATION_GUIDE.md` - Complete integration guide
- `/DEPLOYMENT_CHECKLIST.md` - Production deployment steps
- `/SECURITY.md` - Security best practices
- `/CREDITS.md` - Third-party attributions

### **Architecture Reference:**
- See your architecture diagram for workflow modules
- Frontend connects to "Backend Services" layer
- Backend manages SQL Database and Redis Cache

### **Support:**
- Check browser console for API errors
- Use Network tab to debug API calls
- Review `/utils/security.ts` for security utilities

---

## 🎯 Next Steps

1. ✅ **Basic Integration** (This guide)
   - Setup environment
   - Connect to backend
   - Test authentication

2. **Add License Management**
   - Create user dashboard
   - Display active licenses
   - Device management UI

3. **Payment Integration**
   - Integrate Razorpay
   - Add subscription management
   - Invoice generation

4. **Advanced Features**
   - Admin dashboard
   - Analytics integration
   - Email notifications
   - Offline activation

5. **Production Deployment**
   - Follow `/DEPLOYMENT_CHECKLIST.md`
   - Configure production environment
   - Set up monitoring

---

## 🐛 Troubleshooting

### **CORS Errors:**
```
Access to fetch at 'http://localhost:5000/api/v1/auth/login' has been blocked by CORS policy
```
**Solution:** Ensure CORS is configured in backend (see Step 3)

### **401 Unauthorized:**
```
Failed to load user data: 401 Unauthorized
```
**Solution:** Check if JWT token is valid, backend authentication is working

### **Network Errors:**
```
TypeError: Failed to fetch
```
**Solution:** Ensure backend is running on correct port, check VITE_API_BASE_URL

### **Environment Variables Not Loading:**
```
undefined
```
**Solution:** Restart dev server after changing `.env`: `npm run dev`

---

## ✅ Quick Verification Checklist

- [ ] Backend API running (http://localhost:5000)
- [ ] Frontend dev server running (http://localhost:5173)
- [ ] `.env` file created with correct values
- [ ] CORS configured in backend
- [ ] Can register new user
- [ ] Can login successfully
- [ ] Token stored in localStorage
- [ ] API calls visible in Network tab

---

**Need Help?**
- Review full integration guide: `/INTEGRATION_GUIDE.md`
- Check security docs: `/SECURITY.md`
- See deployment guide: `/DEPLOYMENT_CHECKLIST.md`

---

**Last Updated**: December 27, 2024  
**Version**: 1.0.0  
**Status**: Ready for Integration ✅

