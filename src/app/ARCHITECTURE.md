# SecureDocs - System Architecture

## 🏗️ Overall Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                      SECURE DOCUMENT WEBSITE                         │
│                     (React + TypeScript + Tailwind)                  │
│                                                                      │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐          │
│  │  Marketing    │  │  User Portal  │  │    Admin      │          │
│  │  Pages        │  │  - Login      │  │  Dashboard    │          │
│  │  - Home       │  │  - Subscription│  │  - User Mgmt  │          │
│  │  - Features   │  │  - Licenses   │  │  - License    │          │
│  │  - Pricing    │  │  - Settings   │  │    Control    │          │
│  └───────────────┘  └───────────────┘  └───────────────┘          │
│                                                                      │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │  Feedback & Support (Ira AI Chatbot)                          │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  Technology Stack:                                                   │
│  • React 18 + TypeScript                                            │
│  • Tailwind CSS v4.0                                                │
│  • Motion/React (Animations)                                        │
│  • Razorpay (Payment)                                               │
│  • Analytics (Optional)                                             │
└──────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ REST API / HTTPS
                                    │ JWT Authentication
                                    ▼
┌──────────────────────────────────────────────────────────────────────┐
│                        BACKEND SERVICES                              │
│                     (ASP.NET Core Web API)                           │
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │
│  │    Auth      │  │   License    │  │   Payment    │             │
│  │   Service    │  │   Service    │  │   Service    │             │
│  │              │  │              │  │  (Razorpay)  │             │
│  │  - Login     │  │  - Activate  │  │  - Orders    │             │
│  │  - Register  │  │  - Validate  │  │  - Verify    │             │
│  │  - OAuth     │  │  - Devices   │  │  - Webhooks  │             │
│  │  - Refresh   │  │  - Trial     │  │  - Invoices  │             │
│  └──────────────┘  └──────────────┘  └──────────────┘             │
│                                                                      │
│  ┌───────────────────────────┐  ┌──────────────────────────┐      │
│  │    SQL Database           │  │    Redis Cache           │      │
│  │  - Users                  │  │  - Sessions              │      │
│  │  - Licenses               │  │  - Rate Limiting         │      │
│  │  - Payments               │  │  - Token Blacklist       │      │
│  │  - Devices                │  │  - Temporary Data        │      │
│  └───────────────────────────┘  └──────────────────────────┘      │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │              API & Cache Layer                               │ │
│  └──────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ gRPC / REST
                                    ▼
┌──────────────────────────────────────────────────────────────────────┐
│                        WORKFLOW MODULES                              │
│                                                                      │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐       │
│  │ 1. File        │  │ 2. License     │  │ 3. Auth        │       │
│  │    Encryption  │  │    Management  │  │    Service     │       │
│  │    & Decrypt   │  │                │  │                │       │
│  └────────────────┘  └────────────────┘  └────────────────┘       │
│                                                                      │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐       │
│  │ 4. Device      │  │ 5. Offline     │  │ 6. Trial       │       │
│  │    Binding     │  │    Activation  │  │    Management  │       │
│  └────────────────┘  └────────────────┘  └────────────────┘       │
│                                                                      │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐       │
│  │ 7. Payment &   │  │ 8. Upgrade /   │  │ 9. Notification│       │
│  │    Subscription│  │    Downgrade   │  │    System      │       │
│  └────────────────┘  └────────────────┘  └────────────────┘       │
│                                                                      │
│  ┌────────────────┐  ┌────────────────┐                            │
│  │ 10. Enterprise │  │ 11. Feedback   │                            │
│  │     Admin      │  │     Bot        │                            │
│  └────────────────┘  └────────────────┘                            │
└──────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────┐
│                      CLIENT APPLICATIONS                             │
│                                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │ Windows  │  │  macOS   │  │  Linux   │  │ Android  │           │
│  │  (WPF)   │  │ (MAUI)   │  │(Avalonia)│  │ (MAUI)   │           │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘           │
│                                                                      │
│  ┌────────────────────────┐  ┌────────────────────────┐            │
│  │ Encrypted Local Cache  │  │    Redis Cache         │            │
│  └────────────────────────┘  └────────────────────────┘            │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Component Architecture (Frontend)

### **1. Marketing Pages**

```
/pages/
├── LandingPage.tsx          # Homepage with hero, features, CTA
├── FeaturesPage.tsx         # Detailed feature showcase
├── PricingPage.tsx          # Plans, pricing, payment integration
├── AboutPage.tsx            # Company information
└── ContactPage.tsx          # Contact form
```

**Integration Points:**
- Pricing Page → Payment Service → Razorpay
- Contact Form → Backend API → Email Service
- Trial Signup → License Service → Trial Management Module

### **2. User Portal**

```
/components/
├── AuthPage.tsx             # Login/Registration with OAuth
├── DashboardPage.tsx        # User dashboard (to create)
├── LicenseManagement.tsx    # License overview (to create)
└── SubscriptionPage.tsx     # Manage subscription (to create)
```

**Integration Points:**
- AuthPage → Auth Service → JWT Tokens
- License Management → License Service → SQL Database
- Subscription → Payment Service → Razorpay Subscriptions

### **3. Admin Dashboard**

```
/pages/admin/ (to create)
├── UserManagement.tsx       # Manage users
├── LicenseControl.tsx       # License administration
├── Analytics.tsx            # Usage analytics
└── Settings.tsx             # System settings
```

**Integration Points:**
- User Management → Auth Service → SQL Database
- License Control → License Service → All Workflow Modules
- Analytics → Backend Analytics API → Redis Cache

### **4. Feedback & Support**

```
/components/
├── IraHelperDialog.tsx      # AI chatbot UI
├── IraFloatingButton.tsx    # Floating help button
├── IraWelcome.tsx           # Welcome animation
└── DogScene.tsx             # 3D dog mascot
```

**Integration Points:**
- Ira Bot → Feedback Bot Module (Workflow Module 11)
- Support Tickets → Backend API → Email/Ticketing System

---

## 🔄 Data Flow Diagrams

### **Authentication Flow**

```
┌─────────┐                 ┌──────────┐                ┌─────────┐
│ Browser │                 │ Frontend │                │ Backend │
└────┬────┘                 └────┬─────┘                └────┬────┘
     │                           │                           │
     │  1. User enters email     │                           │
     ├──────────────────────────>│                           │
     │                           │                           │
     │                           │  2. POST /auth/login      │
     │                           ├─────────────────────────>│
     │                           │    { email, password }    │
     │                           │                           │
     │                           │  3. Validate credentials  │
     │                           │  4. Generate JWT tokens   │
     │                           │                           │
     │                           │  5. Return tokens & user  │
     │                           │<─────────────────────────┤
     │                           │   { accessToken,          │
     │                           │     refreshToken,         │
     │                           │     user: {...} }         │
     │                           │                           │
     │                           │  6. Store in localStorage │
     │                           │                           │
     │  7. Redirect to dashboard │                           │
     │<──────────────────────────┤                           │
     │                           │                           │
```

### **Payment Flow (Razorpay)**

```
┌─────────┐     ┌──────────┐     ┌─────────┐     ┌──────────┐
│  User   │     │ Frontend │     │ Backend │     │ Razorpay │
└────┬────┘     └────┬─────┘     └────┬────┘     └────┬─────┘
     │               │                 │                │
     │ 1. Select     │                 │                │
     │    Plan       │                 │                │
     ├──────────────>│                 │                │
     │               │                 │                │
     │               │ 2. Create Order │                │
     │               ├────────────────>│                │
     │               │                 │                │
     │               │                 │ 3. Create      │
     │               │                 │    Razorpay    │
     │               │                 │    Order       │
     │               │                 ├───────────────>│
     │               │                 │                │
     │               │                 │ 4. Order ID    │
     │               │                 │<───────────────┤
     │               │                 │                │
     │               │ 5. Order Details│                │
     │               │<────────────────┤                │
     │               │                 │                │
     │ 6. Open       │                 │                │
     │    Razorpay   │                 │                │
     │    Checkout   │                 │                │
     │<──────────────┤                 │                │
     │               │                 │                │
     │ 7. Enter      │                 │                │
     │    Card Info  │                 │                │
     │───────────────┼────────────────>│                │
     │               │                 │                │
     │               │                 │ 8. Process     │
     │               │                 │    Payment     │
     │               │                 │<───────────────┤
     │               │                 │                │
     │               │ 9. Verify       │                │
     │               │    Signature    │                │
     │               ├────────────────>│                │
     │               │                 │                │
     │               │                 │ 10. Activate   │
     │               │                 │     License    │
     │               │                 │                │
     │               │ 11. Success +   │                │
     │               │     License Key │                │
     │               │<────────────────┤                │
     │               │                 │                │
     │ 12. Show      │                 │                │
     │     Success   │                 │                │
     │<──────────────┤                 │                │
     │               │                 │                │
```

### **License Activation Flow**

```
┌──────────────┐      ┌──────────┐      ┌─────────────┐      ┌──────────┐
│ Client App   │      │ Frontend │      │  Backend    │      │ Workflow │
│ (Windows/    │      │ (Website)│      │  API        │      │ Modules  │
│  Mac/Linux)  │      │          │      │             │      │          │
└──────┬───────┘      └────┬─────┘      └──────┬──────┘      └────┬─────┘
       │                   │                    │                   │
       │ 1. Request        │                    │                   │
       │    Activation     │                    │                   │
       ├──────────────────>│                    │                   │
       │                   │                    │                   │
       │                   │ 2. POST            │                   │
       │                   │    /licenses/      │                   │
       │                   │    activate        │                   │
       │                   ├───────────────────>│                   │
       │                   │  { licenseKey,     │                   │
       │                   │    deviceId }      │                   │
       │                   │                    │                   │
       │                   │                    │ 3. Validate       │
       │                   │                    │    License        │
       │                   │                    ├──────────────────>│
       │                   │                    │                   │
       │                   │                    │ 4. Check Device   │
       │                   │                    │    Limit          │
       │                   │                    │                   │
       │                   │                    │ 5. Bind Device    │
       │                   │                    │                   │
       │                   │                    │ 6. Generate       │
       │                   │                    │    Activation     │
       │                   │                    │    Token          │
       │                   │                    │<──────────────────┤
       │                   │                    │                   │
       │                   │ 7. Activation      │                   │
       │                   │    Token           │                   │
       │                   │<───────────────────┤                   │
       │                   │                    │                   │
       │ 8. Activation     │                    │                   │
       │    Successful     │                    │                   │
       │<──────────────────┤                    │                   │
       │                   │                    │                   │
       │ 9. Store token    │                    │                   │
       │    in encrypted   │                    │                   │
       │    local cache    │                    │                   │
       │                   │                    │                   │
```

---

## 🗄️ Database Schema (Reference)

### **Users Table**
```sql
CREATE TABLE Users (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    Email NVARCHAR(255) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    Name NVARCHAR(255),
    Role NVARCHAR(50),
    EmailVerified BIT DEFAULT 0,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);
```

### **Licenses Table**
```sql
CREATE TABLE Licenses (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    UserId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(Id),
    LicenseKey NVARCHAR(255) UNIQUE NOT NULL,
    PlanType NVARCHAR(50),
    Status NVARCHAR(50),
    StartDate DATETIME,
    ExpiryDate DATETIME,
    DeviceLimit INT,
    DevicesUsed INT DEFAULT 0,
    AutoRenew BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE()
);
```

### **Devices Table**
```sql
CREATE TABLE Devices (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    LicenseId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Licenses(Id),
    DeviceId NVARCHAR(255) NOT NULL,
    DeviceName NVARCHAR(255),
    Platform NVARCHAR(50),
    ActivatedAt DATETIME DEFAULT GETDATE(),
    LastUsed DATETIME,
    IpAddress NVARCHAR(50)
);
```

### **Payments Table**
```sql
CREATE TABLE Payments (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    UserId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(Id),
    LicenseId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Licenses(Id),
    OrderId NVARCHAR(255),
    RazorpayOrderId NVARCHAR(255),
    RazorpayPaymentId NVARCHAR(255),
    Amount DECIMAL(10,2),
    Currency NVARCHAR(10),
    Status NVARCHAR(50),
    CreatedAt DATETIME DEFAULT GETDATE(),
    PaidAt DATETIME
);
```

---

## 🔐 Security Architecture

### **Frontend Security Layers**

1. **Input Validation**
   - Client-side validation (instant feedback)
   - XSS prevention (sanitizeInput utility)
   - CSRF tokens (for forms)

2. **Authentication**
   - JWT token storage (localStorage)
   - Automatic token refresh
   - Session timeout handling

3. **API Communication**
   - HTTPS only in production
   - Bearer token authentication
   - Request timeout (30s default)

4. **Rate Limiting** (Frontend)
   - Login attempts: 5 per 15 minutes
   - API calls: Throttled per endpoint

### **Backend Security Layers**

1. **Authentication & Authorization**
   - JWT with short expiry (1 hour)
   - Refresh tokens (30 days)
   - Role-based access control (RBAC)

2. **Data Protection**
   - Password hashing (bcrypt/Argon2)
   - SQL injection prevention (parameterized queries)
   - Data encryption at rest (SQL Server TDE)

3. **API Security**
   - Rate limiting (Redis-based)
   - Request validation
   - CORS restrictions
   - API versioning

4. **Infrastructure**
   - Redis for session management
   - SQL Server for persistent data
   - Encrypted connections (TLS 1.3)

---

## 📈 Scalability Considerations

### **Horizontal Scaling**

```
                    ┌─────────────────┐
                    │  Load Balancer  │
                    └────────┬────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
    ┌────▼────┐         ┌────▼────┐         ┌────▼────┐
    │ Backend │         │ Backend │         │ Backend │
    │ API #1  │         │ API #2  │         │ API #3  │
    └────┬────┘         └────┬────┘         └────┬────┘
         │                   │                   │
         └───────────────────┼───────────────────┘
                             │
                   ┌─────────┴─────────┐
                   │                   │
              ┌────▼────┐         ┌────▼─────┐
              │   SQL   │         │  Redis   │
              │Database │         │  Cache   │
              │(Primary)│         │ Cluster  │
              └─────────┘         └──────────┘
```

### **Caching Strategy**

1. **Browser Cache**
   - Static assets: 1 year
   - HTML: No cache
   - API responses: Per endpoint

2. **Redis Cache**
   - User sessions: 30 days
   - License validations: 5 minutes
   - Rate limit counters: 15 minutes
   - Temporary data: 24 hours

3. **Database**
   - Query result caching
   - Connection pooling
   - Read replicas for reports

---

## 🚀 Deployment Architecture

### **Production Environment**

```
┌──────────────────────────────────────────────────────────┐
│                      CDN (CloudFlare)                    │
│           Static Assets, DDoS Protection, WAF            │
└────────────────────────┬─────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────┐
│               Frontend (Static Hosting)                  │
│         Nginx / IIS / Vercel / Netlify / S3             │
└────────────────────────┬─────────────────────────────────┘
                         │ HTTPS
                         ▼
┌──────────────────────────────────────────────────────────┐
│            API Gateway / Load Balancer                   │
│              SSL Termination, Rate Limiting              │
└────────────────────────┬─────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────┐
│          Backend API Servers (ASP.NET Core)              │
│              Auto-scaling, Health Checks                 │
└─────┬────────────────────────────────────────────┬───────┘
      │                                            │
      ▼                                            ▼
┌─────────────┐                          ┌──────────────┐
│ SQL Server  │                          │ Redis Cluster│
│  (Primary)  │                          │   (Cache)    │
│             │                          │              │
│ + Read      │                          │ + Sentinel   │
│   Replicas  │                          │   (HA)       │
└─────────────┘                          └──────────────┘
```

---

## 📦 Technology Stack Summary

### **Frontend**
- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4.0
- **Animation**: Motion/React
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **HTTP**: Native Fetch API
- **Build**: Vite

### **Backend** (Your Existing Stack)
- **Framework**: ASP.NET Core
- **Database**: SQL Server
- **Cache**: Redis
- **Payment**: Razorpay
- **Auth**: JWT + OAuth

### **Infrastructure**
- **Web Server**: Nginx / IIS
- **SSL**: Let's Encrypt / Commercial
- **CDN**: CloudFlare (optional)
- **Monitoring**: Sentry, Google Analytics

---

## 📞 Integration Endpoints Summary

| Service | Endpoint | Frontend Component | Backend Module |
|---------|----------|-------------------|----------------|
| **Authentication** | `/api/v1/auth/*` | `AuthPage.tsx` | Auth Service |
| **License Management** | `/api/v1/licenses/*` | User Dashboard | License Service |
| **Payment** | `/api/v1/payment/*` | `PricingPage.tsx` | Payment Service |
| **User Profile** | `/api/v1/users/*` | Settings Page | User Service |
| **Analytics** | `/api/v1/analytics/*` | Admin Dashboard | Analytics Module |

---

**Last Updated**: December 27, 2024  
**Version**: 1.0.0

