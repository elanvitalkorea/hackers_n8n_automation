# Application Flow - Next.js SaaS Starter

This document contains the flow diagrams for the SaaS starter application, from high-level overview to detailed flows.

## High-Level Application Overview

```mermaid
---
config:
  layout: elk
  look: handDrawn
  theme: neutral
---
flowchart TB
    %% Entry Points
    subgraph Public["🌐 Public Access"]
        Landing["🏠 Landing Page<br/>app/(dashboard)/page.tsx"]
        Pricing["💰 Pricing Page<br/>app/(dashboard)/pricing/page.tsx"]
        SignIn["🔑 Sign In<br/>app/(login)/sign-in/page.tsx"]
        SignUp["✍️ Sign Up<br/>app/(login)/sign-up/page.tsx"]
    end
    
    %% Core App
    subgraph Protected["🔒 Protected Dashboard"]
        direction TB
        Team["👥 Team Settings<br/>app/(dashboard)/dashboard/page.tsx<br/>- View members<br/>- Invite users<br/>- Manage roles"]
        General["⚙️ General Settings<br/>app/(dashboard)/dashboard/general/page.tsx<br/>- Update name/email"]
        Security["🔐 Security Settings<br/>app/(dashboard)/dashboard/security/page.tsx<br/>- Change password<br/>- Delete account"]
        Activity["📋 Activity Log<br/>app/(dashboard)/dashboard/activity/page.tsx<br/>- View recent actions"]
    end
    
    %% External Services
    subgraph Stripe["💳 Stripe Integration"]
        Checkout["Checkout<br/>lib/payments/actions.ts<br/>(createCheckoutSession)"]
        Portal["Customer Portal<br/>lib/payments/actions.ts<br/>(createCustomerPortalSession)"]
    end
    
    %% Authentication Flow
    Landing --> SignIn
    Landing --> SignUp
    Landing --> Pricing
    
    SignUp -->|"signUp()<br/>app/(login)/actions.ts"| Auth["🔐 JWT Auth<br/>lib/auth/session.ts"]
    SignIn -->|"signIn()<br/>app/(login)/actions.ts"| Auth
    
    Auth -->|Session Cookie| Protected
    
    %% Dashboard Navigation
    Protected --> Team
    Protected --> General
    Protected --> Security
    Protected --> Activity
    
    %% Payment Flow
    Pricing -->|Select Plan| Checkout
    Checkout -->|"Success<br/>app/api/stripe/checkout/route.ts"| Team
    Team -->|Manage| Portal
    Portal -.->|"Webhook<br/>app/api/stripe/webhook/route.ts"| Team
    
    %% Middleware
    Protected -.->|Protected by| Middleware["🛡️ Middleware<br/>middleware.ts<br/>lib/auth/middleware.ts"]
    
    style Landing fill:#e3f2fd
    style Protected fill:#fff3e0
    style Stripe fill:#ffe0b2
    style Auth fill:#c8e6c9
    style Middleware fill:#f3e5f5
```

## User Journey by Role

```mermaid
---
config:
  layout: dagre
  look: handDrawn
  theme: neutral
---
flowchart LR
    %% New User Journey
    subgraph NewUser["👤 New User Journey"]
        direction TB
        N1["1. Visit Site"]
        N2["2. Sign Up"]
        N3["3. Create Team<br/>(Becomes Owner)"]
        N4["4. Browse Pricing"]
        N5["5. Subscribe"]
        N6["6. Invite Members"]
        
        N1 --> N2 --> N3 --> N4 --> N5 --> N6
    end
    
    %% Invited User Journey
    subgraph InvitedUser["✉️ Invited User Journey"]
        direction TB
        I1["1. Receive Invite"]
        I2["2. Sign Up with Invite"]
        I3["3. Join Team<br/>(As Member)"]
        I4["4. Access Dashboard"]
        
        I1 --> I2 --> I3 --> I4
    end
    
    %% Owner Actions
    subgraph Owner["👑 Owner Actions"]
        direction TB
        O1["• Manage Subscription"]
        O2["• Invite Members"]
        O3["• Remove Members"]
        O4["• View Activity"]
    end
    
    %% Member Actions
    subgraph Member["👥 Member Actions"]
        direction TB
        M1["• Update Profile"]
        M2["• Change Password"]
        M3["• View Team"]
        M4["• View Activity"]
    end
    
    N6 -.->|Creates Invite| I1
    N3 --> Owner
    I3 --> Member
    
    style NewUser fill:#e1f5e1
    style InvitedUser fill:#e3f2fd
    style Owner fill:#fff3e0
    style Member fill:#f3e5f5
```

## Core Flows Summary

```mermaid
---
config:
  layout: elk
  look: handDrawn
  theme: neutral
  elk:
    nodePlacementStrategy: SIMPLE
---
flowchart TB
    %% Authentication
    subgraph Auth["🔐 Authentication - lib/auth/"]
        direction LR
        A1["Email + Password<br/>app/(login)/actions.ts"] --> A2["bcrypt Hash/Verify<br/>session.ts"] --> A3["JWT Token<br/>jose library"] --> A4["httpOnly Cookie<br/>setSession()"]
    end
    
    %% Payment
    subgraph Payment["💳 Payment - lib/payments/ & app/api/stripe/"]
        direction LR
        P1["Select Plan<br/>pricing/page.tsx"] --> P2["Stripe Checkout<br/>actions.ts"] --> P3["Success Callback<br/>checkout/route.ts"] --> P4["Update Team DB<br/>lib/db/queries.ts"]
        P5["Manage Button<br/>dashboard/page.tsx"] --> P6["Stripe Portal<br/>actions.ts"] --> P7["Change Webhook<br/>webhook/route.ts"] --> P4
    end
    
    %% Team
    subgraph TeamMgmt["👥 Team Management - app/(login)/actions.ts"]
        direction LR
        T1["inviteTeamMember()"] --> T2["Create Invitation<br/>lib/db/queries.ts"] --> T3["User Signs Up<br/>with inviteId"] --> T4["Add to Team<br/>team_members"]
        T5["removeTeamMember()"] --> T6["Delete Record<br/>lib/db/queries.ts"]
    end
    
    %% Middleware
    Request["📨 Every Request to<br/>/dashboard/*"] --> Middleware{"🛡️ Middleware<br/>middleware.ts"}
    Middleware -->|"Valid Session"| Allow["✅ Allow Access<br/>lib/auth/middleware.ts"]
    Middleware -->|"No/Invalid Session"| Deny["❌ Redirect to /sign-in"]
    Middleware -->|"GET Request"| Refresh["🔄 Refresh Token<br/>updateSession() +1 day"]
    
    Auth --> Allow
    
    style Auth fill:#c8e6c9
    style Payment fill:#ffe0b2
    style TeamMgmt fill:#e3f2fd
    style Middleware fill:#f3e5f5
    style Allow fill:#e1f5e1
    style Deny fill:#ffcdd2
```

## File Structure & Key Actions

```mermaid
---
config:
  layout: elk
  look: handDrawn
  theme: neutral
---
flowchart TB
    %% Pages
    subgraph Pages["📄 Pages (UI)"]
        direction TB
        P1["app/(dashboard)/page.tsx<br/>Landing Page"]
        P2["app/(login)/sign-in/page.tsx<br/>Sign In Form"]
        P3["app/(login)/sign-up/page.tsx<br/>Sign Up Form"]
        P4["app/(dashboard)/pricing/page.tsx<br/>Pricing Plans"]
        P5["app/(dashboard)/dashboard/page.tsx<br/>Team Settings"]
        P6["app/(dashboard)/dashboard/general/page.tsx<br/>General Settings"]
        P7["app/(dashboard)/dashboard/security/page.tsx<br/>Security Settings"]
        P8["app/(dashboard)/dashboard/activity/page.tsx<br/>Activity Log"]
    end
    
    %% Server Actions
    subgraph Actions["⚡ Server Actions"]
        direction TB
        A1["app/(login)/actions.ts<br/>• signIn()<br/>• signUp()<br/>• signOut()<br/>• updateAccount()<br/>• updatePassword()<br/>• deleteAccount()<br/>• inviteTeamMember()<br/>• removeTeamMember()"]
        A2["lib/payments/actions.ts<br/>• createCheckoutSession()<br/>• createCustomerPortalSession()<br/>• handleSubscriptionChange()"]
    end
    
    %% API Routes
    subgraph API["🔌 API Routes"]
        direction TB
        API1["app/api/user/route.ts<br/>GET current user"]
        API2["app/api/team/route.ts<br/>GET team + members"]
        API3["app/api/stripe/checkout/route.ts<br/>GET process checkout success"]
        API4["app/api/stripe/webhook/route.ts<br/>POST Stripe webhooks"]
    end
    
    %% Auth & Middleware
    subgraph Auth["🔐 Authentication"]
        direction TB
        Auth1["middleware.ts<br/>Route protection"]
        Auth2["lib/auth/middleware.ts<br/>verifySession()<br/>withTeam()"]
        Auth3["lib/auth/session.ts<br/>• createToken()<br/>• verifyToken()<br/>• setSession()<br/>• deleteSession()<br/>• updateSession()"]
    end
    
    %% Database
    subgraph DB["🗄️ Database"]
        direction TB
        DB1["lib/db/schema.ts<br/>Tables:<br/>• users<br/>• teams<br/>• team_members<br/>• invitations<br/>• activity_logs"]
        DB2["lib/db/queries.ts<br/>• getUser()<br/>• getTeamForUser()<br/>• updateTeamSubscription()<br/>• getActivityLogs()"]
        DB3["lib/db/drizzle.ts<br/>Database connection"]
    end
    
    %% External Services
    subgraph External["🌐 External Services"]
        direction TB
        E1["lib/payments/stripe.ts<br/>Stripe client config"]
    end
    
    %% Connections
    P2 --> A1
    P3 --> A1
    P5 --> A1
    P6 --> A1
    P7 --> A1
    
    P4 --> A2
    P5 --> A2
    
    Pages -.-> API
    
    A1 --> Auth3
    A2 --> E1
    
    Auth1 --> Auth2
    Auth2 --> Auth3
    
    Auth3 --> DB2
    A1 --> DB2
    A2 --> DB2
    API --> DB2
    
    DB2 --> DB3
    DB2 --> DB1
    
    API3 --> E1
    API4 --> E1
    API4 --> A2
    
    style Pages fill:#e3f2fd
    style Actions fill:#fff3e0
    style API fill:#c8e6c9
    style Auth fill:#f3e5f5
    style DB fill:#e1f5e1
    style External fill:#ffe0b2
```

## Complete Application Flow (Detailed)

```mermaid
---
config:
  layout: elk
  look: classic
  theme: default
  elk:
    mergeEdges: true
    nodePlacementStrategy: LINEAR_SEGMENTS
---
flowchart TB
    Start([User Visits App]) --> Landing[/ Landing Page /]
    
    Landing --> CheckAuth{Authenticated?}
    
    CheckAuth -->|No| PublicRoutes[Public Routes]
    CheckAuth -->|Yes| Dashboard[/Dashboard/]
    
    PublicRoutes --> Pricing[Pricing Page]
    PublicRoutes --> SignIn[Sign In Page]
    PublicRoutes --> SignUp[Sign Up Page]
    
    %% Sign Up Flow
    SignUp --> HasInvite{Has Invite ID?}
    HasInvite -->|Yes| SignUpWithInvite[Sign Up with Invite]
    HasInvite -->|No| SignUpNormal[Sign Up Normal]
    
    SignUpWithInvite --> CreateUser1[Create User Account]
    SignUpNormal --> CreateUser2[Create User Account]
    
    CreateUser1 --> JoinTeam[Join Existing Team]
    CreateUser2 --> CreateTeam[Create New Team as Owner]
    
    JoinTeam --> SetSession1[Set JWT Session Cookie]
    CreateTeam --> SetSession2[Set JWT Session Cookie]
    
    SetSession1 --> LogActivity1[Log Sign Up Activity]
    SetSession2 --> LogActivity2[Log Sign Up Activity]
    
    LogActivity1 --> Dashboard
    LogActivity2 --> Dashboard
    
    %% Sign In Flow
    SignIn --> ValidateCredentials{Valid Credentials?}
    ValidateCredentials -->|No| SignInError[Show Error]
    ValidateCredentials -->|Yes| SetSession3[Set JWT Session Cookie]
    SignInError --> SignIn
    SetSession3 --> LogActivity3[Log Sign In Activity]
    LogActivity3 --> Dashboard
    
    %% Dashboard Routes
    Dashboard --> DashboardSections{Choose Section}
    
    DashboardSections --> TeamSettings[Team Settings]
    DashboardSections --> GeneralSettings[General Settings]
    DashboardSections --> SecuritySettings[Security Settings]
    DashboardSections --> ActivityLog[Activity Log]
    
    %% Team Settings Flow
    TeamSettings --> TeamActions{Action}
    TeamActions --> ViewSubscription[View Subscription Status]
    TeamActions --> ManageMembers[Manage Team Members]
    TeamActions --> InviteMember[Invite Member]
    
    ViewSubscription --> HasSubscription{Has Active Subscription?}
    HasSubscription -->|Yes| CustomerPortal[Open Stripe Customer Portal]
    HasSubscription -->|No| GoToPricing[Go to Pricing]
    
    CustomerPortal --> StripePortal[Stripe Billing Portal]
    StripePortal --> ModifySubscription[Change/Cancel Subscription]
    ModifySubscription --> StripeWebhook1[Stripe Webhook Triggered]
    StripeWebhook1 --> UpdateTeamDB1[Update Team in Database]
    UpdateTeamDB1 --> Dashboard
    
    ManageMembers --> CheckRole1{Is Owner?}
    CheckRole1 -->|Yes| RemoveMember[Remove Team Member]
    CheckRole1 -->|No| ViewOnly1[View Only]
    RemoveMember --> LogActivity4[Log Member Removal]
    LogActivity4 --> TeamSettings
    
    InviteMember --> CheckRole2{Is Owner?}
    CheckRole2 -->|Yes| CreateInvite[Create Invitation Record]
    CheckRole2 -->|No| Disabled[Button Disabled]
    CreateInvite --> SendInviteEmail[Send Invite Email]
    SendInviteEmail --> LogActivity5[Log Invite Activity]
    LogActivity5 --> TeamSettings
    
    %% Pricing & Checkout Flow
    GoToPricing --> Pricing
    Pricing --> SelectPlan[Select Plan]
    SelectPlan --> CreateCheckout[Create Stripe Checkout Session]
    CreateCheckout --> StripeCheckout[Redirect to Stripe Checkout]
    
    StripeCheckout --> PaymentResult{Payment Success?}
    PaymentResult -->|No| Pricing
    PaymentResult -->|Yes| CheckoutCallback["api/stripe/checkout"]
    
    CheckoutCallback --> RetrieveSession[Retrieve Checkout Session]
    RetrieveSession --> UpdateTeamDB2[Update Team Subscription Info]
    UpdateTeamDB2 --> LogActivity6[Log Subscription Activity]
    LogActivity6 --> Dashboard
    
    %% General Settings Flow
    GeneralSettings --> GeneralActions{Action}
    GeneralActions --> UpdateName[Update Name]
    GeneralActions --> UpdateEmail[Update Email]
    
    UpdateName --> ValidateInput1{Valid Input?}
    UpdateEmail --> ValidateInput2{Valid Input?}
    
    ValidateInput1 -->|Yes| UpdateUserDB1[Update User in Database]
    ValidateInput1 -->|No| ShowError1[Show Validation Error]
    ValidateInput2 -->|Yes| UpdateUserDB2[Update User in Database]
    ValidateInput2 -->|No| ShowError2[Show Validation Error]
    
    UpdateUserDB1 --> LogActivity7[Log Account Update]
    UpdateUserDB2 --> LogActivity8[Log Account Update]
    LogActivity7 --> GeneralSettings
    LogActivity8 --> GeneralSettings
    
    %% Security Settings Flow
    SecuritySettings --> SecurityActions{Action}
    SecurityActions --> ChangePassword[Change Password]
    SecurityActions --> DeleteAccount[Delete Account]
    SecurityActions --> SignOut[Sign Out]
    
    ChangePassword --> ValidateCurrent{Current Password Valid?}
    ValidateCurrent -->|No| PasswordError[Show Error]
    ValidateCurrent -->|Yes| ValidateNew{New Password Valid?}
    ValidateNew -->|No| PasswordError
    ValidateNew -->|Yes| HashPassword[Hash New Password]
    HashPassword --> UpdatePassword[Update Password in DB]
    UpdatePassword --> LogActivity9[Log Password Change]
    LogActivity9 --> SecuritySettings
    
    DeleteAccount --> ConfirmDelete{Confirm Deletion?}
    ConfirmDelete -->|No| SecuritySettings
    ConfirmDelete -->|Yes| SoftDelete[Soft Delete User]
    SoftDelete --> AddDeletedSuffix[Add Suffix to Email]
    AddDeletedSuffix --> LogActivity10[Log Account Deletion]
    LogActivity10 --> ClearSession1[Clear Session Cookie]
    ClearSession1 --> Landing
    
    SignOut --> LogActivity11[Log Sign Out]
    LogActivity11 --> ClearSession2[Clear Session Cookie]
    ClearSession2 --> Landing
    
    %% Activity Log Flow
    ActivityLog --> FetchActivities[Fetch Recent 10 Activities]
    FetchActivities --> DisplayActivities[Display Activity List]
    DisplayActivities --> ActivityLog
    
    %% Middleware Protection
    Dashboard -.->|Every Request| GlobalMiddleware{Middleware Check}
    GeneralSettings -.->|Every Request| GlobalMiddleware
    SecuritySettings -.->|Every Request| GlobalMiddleware
    ActivityLog -.->|Every Request| GlobalMiddleware
    TeamSettings -.->|Every Request| GlobalMiddleware
    
    GlobalMiddleware -->|Has Valid Session| AllowAccess[Allow Access]
    GlobalMiddleware -->|No Session/Invalid| RedirectSignIn[Redirect to /sign-in]
    GlobalMiddleware -->|GET Request| RefreshSession[Refresh Session Token]
    RedirectSignIn --> SignIn
    
    %% Stripe Webhook Flow
    StripeWebhookEndpoint[Stripe Webhook Endpoint] --> VerifySignature{Valid Signature?}
    VerifySignature -->|No| Return403[Return 403]
    VerifySignature -->|Yes| CheckEventType{Event Type}
    
    CheckEventType -->|subscription.updated| UpdateSubscription[Update Subscription Status]
    CheckEventType -->|subscription.deleted| DeleteSubscription[Mark Subscription Deleted]
    CheckEventType -->|other| IgnoreEvent[Ignore Event]
    
    UpdateSubscription --> FindTeam1[Find Team by Customer ID]
    DeleteSubscription --> FindTeam2[Find Team by Customer ID]
    
    FindTeam1 --> UpdateTeamDB3[Update Team Record]
    FindTeam2 --> UpdateTeamDB4[Update Team Record]
    
    UpdateTeamDB3 --> Return200_1[Return 200 OK]
    UpdateTeamDB4 --> Return200_2[Return 200 OK]
    
    %% API Routes
    APIUser["GET /api/user"] --> GetSessionUser[Get Session User Data]
    GetSessionUser --> ReturnUser[Return User JSON]
    
    APITeam["GET /api/team"] --> GetSessionTeam[Get Session Team + Members]
    GetSessionTeam --> ReturnTeam[Return Team JSON]
    
    style Start fill:#e1f5e1
    style Landing fill:#e3f2fd
    style Dashboard fill:#fff3e0
    style SignUp fill:#f3e5f5
    style SignIn fill:#f3e5f5
    style StripeCheckout fill:#ffe0b2
    style StripePortal fill:#ffe0b2
    style ClearSession1 fill:#ffcdd2
    style ClearSession2 fill:#ffcdd2
    style SoftDelete fill:#ffcdd2
```

## Tech Stack Integration

```mermaid
---
config:
  layout: elk
  look: handDrawn
  theme: neutral
---
flowchart TB
    %% Frontend
    subgraph Frontend["⚛️ Frontend (Next.js 15)"]
        Pages["📄 Pages<br/>app/**/*.tsx"]
        Components["🎨 UI Components<br/>components/ui/*.tsx<br/>(shadcn/ui)"]
        Actions["⚡ Server Actions<br/>app/(login)/actions.ts"]
    end
    
    %% Backend
    subgraph Backend["🔧 Backend Services"]
        API["🔌 API Routes<br/>app/api/**/route.ts"]
        Middleware["🛡️ Middleware<br/>middleware.ts<br/>lib/auth/middleware.ts"]
        Auth["🔐 JWT Auth<br/>lib/auth/session.ts<br/>(jose library)"]
    end
    
    %% Database
    subgraph Database["🗄️ Database Layer"]
        Drizzle["📊 Drizzle ORM<br/>lib/db/drizzle.ts<br/>lib/db/queries.ts"]
        Schema["📋 Schema<br/>lib/db/schema.ts"]
        Postgres["🐘 PostgreSQL<br/>(postgres package)"]
    end
    
    %% External
    subgraph External["🌐 External Services"]
        Stripe["💳 Stripe API<br/>lib/payments/stripe.ts<br/>- Checkout<br/>- Portal<br/>- Webhooks"]
    end
    
    %% Connections
    Pages --> Actions
    Pages --> Components
    Actions --> API
    Actions --> Auth
    
    API --> Middleware
    Middleware --> Auth
    
    Auth --> Drizzle
    API --> Drizzle
    Actions --> Drizzle
    Drizzle --> Schema
    Schema --> Postgres
    
    API <--> Stripe
    Actions <--> Stripe
    
    style Frontend fill:#e3f2fd
    style Backend fill:#fff3e0
    style Database fill:#c8e6c9
    style External fill:#ffe0b2
```

## Authentication Flow Detail

```mermaid
---
config:
  layout: dagre
  look: handDrawn
  theme: neutral
---
flowchart TD
    Start([🌐 Request to /dashboard/*]) --> Middleware["🛡️ middleware.ts<br/>verifySession()"]
    
    Middleware --> CheckCookie{Has Session<br/>Cookie?}
    
    CheckCookie -->|❌ No| Redirect1["Redirect to<br/>/sign-in"]
    CheckCookie -->|✅ Yes| VerifyJWT{"lib/auth/session.ts<br/>verifyToken()<br/>JWT Valid?"}
    
    VerifyJWT -->|❌ No| Redirect2["Redirect to<br/>/sign-in"]
    VerifyJWT -->|✅ Yes| CheckMethod{Request Type?}
    
    CheckMethod -->|GET| RefreshToken["🔄 updateSession()<br/>Extend token +1 Day"]
    CheckMethod -->|POST/PUT/DELETE| Continue["✅ Continue"]
    
    RefreshToken --> SetNewCookie["setSession()<br/>Set New Cookie"]
    SetNewCookie --> Continue
    
    Continue --> Execute["Execute Request<br/>(Page or Action)"]
    Execute --> Response["📤 Return Response"]
    
    %% Sign In/Up Flow
    SignInPage["app/(login)/sign-in/page.tsx"] --> SignInAction["signIn()<br/>app/(login)/actions.ts"]
    SignUpPage["app/(login)/sign-up/page.tsx"] --> SignUpAction["signUp()<br/>app/(login)/actions.ts"]
    
    SignInAction --> ValidatePassword["bcrypt.compare()<br/>Validate Password"]
    SignUpAction --> HashPassword["bcrypt.hash()<br/>Hash Password"]
    
    ValidatePassword --> CreateToken["createToken()<br/>lib/auth/session.ts"]
    HashPassword --> CreateUser["Insert User<br/>lib/db/queries.ts"]
    CreateUser --> CreateToken
    
    CreateToken --> SetSession["setSession()<br/>Create Cookie"]
    SetSession --> RedirectDash["Redirect to /dashboard"]
    
    style Start fill:#e3f2fd
    style Redirect1 fill:#ffcdd2
    style Redirect2 fill:#ffcdd2
    style Execute fill:#c8e6c9
    style Response fill:#c8e6c9
    style SignInPage fill:#e3f2fd
    style SignUpPage fill:#e3f2fd
```

## Payment Flow Detail

```mermaid
---
config:
  layout: elk
  look: handDrawn
  theme: neutral
---
flowchart TB
    %% Initial Checkout
    subgraph Checkout["💳 Checkout Flow"]
        direction TB
        User["👤 User on<br/>app/(dashboard)/pricing/page.tsx"] --> SelectPlan["Click Plan Button<br/>(form submission)"]
        SelectPlan --> CreateSession["createCheckoutSession()<br/>lib/payments/actions.ts"]
        CreateSession --> StripeAPI1["stripe.checkout.sessions.create()<br/>lib/payments/stripe.ts"]
        StripeAPI1 --> StripeCheckout["🌐 Stripe Checkout Page"]
        StripeCheckout --> Payment{"Payment<br/>Success?"}
        Payment -->|"✅ Yes"| Success["success_url:<br/>app/api/stripe/checkout/route.ts"]
        Payment -->|"❌ No"| Cancel["cancel_url:<br/>Return to /pricing"]
        Success --> RetrieveSession["stripe.checkout.sessions.retrieve()"]
        RetrieveSession --> UpdateDB["📝 updateTeamSubscription()<br/>lib/db/queries.ts<br/>- stripeCustomerId<br/>- stripeSubscriptionId<br/>- planName<br/>- subscriptionStatus"]
        UpdateDB --> Dashboard["Redirect to /dashboard"]
    end
    
    %% Portal Management
    subgraph Portal["⚙️ Subscription Management"]
        direction TB
        ManageBtn["'Manage Subscription'<br/>app/(dashboard)/dashboard/page.tsx"] --> CreatePortal["createCustomerPortalSession()<br/>lib/payments/actions.ts"]
        CreatePortal --> StripeAPI2["stripe.billingPortal.sessions.create()<br/>lib/payments/stripe.ts"]
        StripeAPI2 --> StripePortal["🌐 Stripe Portal"]
        StripePortal --> Modify["User Modifies:<br/>- Change plan<br/>- Update payment<br/>- Cancel subscription"]
    end
    
    %% Webhook
    subgraph Webhook["🔔 Webhook Handler"]
        direction TB
        Event["Stripe Event<br/>(POST)"] --> WebhookRoute["app/api/stripe/webhook/route.ts"]
        WebhookRoute --> Verify{"stripe.webhooks.constructEvent()<br/>Verify Signature?"}
        Verify -->|"❌ Invalid"| Reject["403 Forbidden"]
        Verify -->|"✅ Valid"| EventType{"Event Type?"}
        EventType -->|"customer.subscription.updated"| Update["handleSubscriptionChange()<br/>lib/payments/actions.ts"]
        EventType -->|"customer.subscription.deleted"| Delete["handleSubscriptionChange()<br/>(status: 'deleted')"]
        EventType -->|"other"| Ignore["200 OK"]
        Update --> UpdateTeam1["updateTeamSubscription()<br/>lib/db/queries.ts"]
        Delete --> UpdateTeam2["updateTeamSubscription()<br/>lib/db/queries.ts"]
        UpdateTeam1 --> Return["200 OK"]
        UpdateTeam2 --> Return
    end
    
    %% Connections
    Modify -.->|"Triggers"| Event
    
    style User fill:#e1f5e1
    style StripeCheckout fill:#ffe0b2
    style StripePortal fill:#ffe0b2
    style UpdateDB fill:#c8e6c9
    style Event fill:#e1bee7
    style Reject fill:#ffcdd2
```

## Database Schema Relations

```mermaid
---
config:
  layout: dagre
  look: handDrawn
  theme: neutral
---
erDiagram
    USERS ||--o{ TEAM_MEMBERS : "belongs to"
    TEAMS ||--o{ TEAM_MEMBERS : "has"
    TEAMS ||--o{ INVITATIONS : "sends"
    TEAMS ||--o{ ACTIVITY_LOGS : "tracks"
    USERS ||--o{ ACTIVITY_LOGS : "performs"
    
    USERS {
        int id PK "Primary Key"
        string name "User Name"
        string email UK "Unique Email"
        string passwordHash "Bcrypt Hash"
        string role "member/owner"
        timestamp createdAt
        timestamp deletedAt "Soft Delete"
    }
    
    TEAMS {
        int id PK
        string name "Team Name"
        string stripeCustomerId UK "Stripe Customer"
        string stripeSubscriptionId UK "Subscription"
        string stripeProductId "Product/Plan"
        string planName "Plan Name"
        string subscriptionStatus "active/canceled"
        timestamp createdAt
    }
    
    TEAM_MEMBERS {
        int id PK
        int userId FK "User Reference"
        int teamId FK "Team Reference"
        string role "owner/member"
        timestamp joinedAt
    }
    
    INVITATIONS {
        int id PK
        int teamId FK
        string email "Invitee Email"
        string role "Assigned Role"
        string status "pending/accepted"
        timestamp invitedAt
    }
    
    ACTIVITY_LOGS {
        int id PK
        int teamId FK
        int userId FK
        string action "Action Type"
        string ipAddress "User IP"
        timestamp timestamp
    }
```

## Key Features Summary

### 1. Authentication
- Email/password authentication with bcrypt hashing
- JWT tokens stored in httpOnly cookies
- Session refresh on GET requests (extends 1 day)
- Global middleware protection for `/dashboard` routes

### 2. Team Management
- Owner and Member roles (RBAC)
- Team creation on sign-up
- Member invitation system
- Member removal (owner only)

### 3. Payments
- Stripe Checkout integration
- Customer Portal for subscription management
- Webhook handling for subscription updates
- Subscription status synced to database

### 4. User Settings
- Account info updates (name, email)
- Password change with validation
- Soft delete account (adds suffix to email)

### 5. Activity Logging
- Tracks all major user actions
- Stores: user, team, action type, IP, timestamp
- Displays recent 10 activities

### 6. API Routes
- `/api/user` - Get current user
- `/api/team` - Get current team with members
- `/api/stripe/webhook` - Handle Stripe events
- `/api/stripe/checkout` - Process successful checkout

---

## Quick Reference: File Locations

### 📄 Pages (Frontend UI)

| Route | File | Purpose |
|-------|------|---------|
| `/` | `app/(dashboard)/page.tsx` | Landing page with terminal animation |
| `/pricing` | `app/(dashboard)/pricing/page.tsx` | Pricing plans and subscription options |
| `/sign-in` | `app/(login)/sign-in/page.tsx` | Sign in form |
| `/sign-up` | `app/(login)/sign-up/page.tsx` | Sign up form with optional invite |
| `/dashboard` | `app/(dashboard)/dashboard/page.tsx` | Team settings (members, subscription) |
| `/dashboard/general` | `app/(dashboard)/dashboard/general/page.tsx` | Account settings (name, email) |
| `/dashboard/security` | `app/(dashboard)/dashboard/security/page.tsx` | Security settings (password, delete) |
| `/dashboard/activity` | `app/(dashboard)/dashboard/activity/page.tsx` | Activity log viewer |

### ⚡ Server Actions

| File | Functions | Purpose |
|------|-----------|---------|
| `app/(login)/actions.ts` | `signIn()`, `signUp()`, `signOut()` | Authentication actions |
| | `updateAccount()`, `updatePassword()`, `deleteAccount()` | Account management |
| | `inviteTeamMember()`, `removeTeamMember()` | Team management |
| `lib/payments/actions.ts` | `createCheckoutSession()` | Create Stripe checkout |
| | `createCustomerPortalSession()` | Open Stripe portal |
| | `handleSubscriptionChange()` | Process webhook updates |

### 🔌 API Routes

| Route | File | Method | Purpose |
|-------|------|--------|---------|
| `/api/user` | `app/api/user/route.ts` | GET | Get current user data |
| `/api/team` | `app/api/team/route.ts` | GET | Get team with members |
| `/api/stripe/checkout` | `app/api/stripe/checkout/route.ts` | GET | Process checkout success callback |
| `/api/stripe/webhook` | `app/api/stripe/webhook/route.ts` | POST | Handle Stripe webhook events |

### 🔐 Authentication & Middleware

| File | Functions/Purpose |
|------|-------------------|
| `middleware.ts` | Global middleware - protects `/dashboard/*` routes |
| `lib/auth/middleware.ts` | `verifySession()` - Validates JWT tokens<br/>`withTeam()` - Team context wrapper |
| `lib/auth/session.ts` | `createToken()` - Generate JWT<br/>`verifyToken()` - Validate JWT<br/>`setSession()` - Set cookie<br/>`deleteSession()` - Clear cookie<br/>`updateSession()` - Refresh token |

### 🗄️ Database Layer

| File | Purpose |
|------|---------|
| `lib/db/schema.ts` | Database schema definitions:<br/>- `users`, `teams`, `team_members`<br/>- `invitations`, `activity_logs` |
| `lib/db/queries.ts` | Database query functions:<br/>- `getUser()`, `getTeamForUser()`<br/>- `updateTeamSubscription()`<br/>- `getActivityLogs()` |
| `lib/db/drizzle.ts` | Drizzle ORM client configuration |
| `lib/db/setup.ts` | Database setup script |
| `lib/db/seed.ts` | Database seeding script |

### 💳 Payments (Stripe)

| File | Functions/Purpose |
|------|-------------------|
| `lib/payments/stripe.ts` | Stripe client initialization and configuration |
| `lib/payments/actions.ts` | Payment-related server actions (checkout, portal, webhooks) |

### 🎨 UI Components

| Directory | Purpose |
|-----------|---------|
| `components/ui/*.tsx` | shadcn/ui components:<br/>- `button.tsx`, `input.tsx`, `card.tsx`<br/>- `dropdown-menu.tsx`, `avatar.tsx`, etc. |

### ⚙️ Configuration

| File | Purpose |
|------|---------|
| `middleware.ts` | Next.js middleware entry point |
| `next.config.ts` | Next.js configuration |
| `drizzle.config.ts` | Drizzle ORM configuration |
| `.env.example` | Environment variables template |

---

## How to Make Changes

### Adding a New Page
1. Create page in `app/` directory following route structure
2. Add to dashboard layout if protected: `app/(dashboard)/dashboard/YOUR_PAGE/page.tsx`

### Adding a New Server Action
1. Add function to `app/(login)/actions.ts` (for auth/account/team)
2. Or `lib/payments/actions.ts` (for payment-related)
3. Use `withAuth()` or `withTeam()` wrappers for authentication
4. Validate input with Zod schemas

### Modifying Authentication
1. JWT logic: `lib/auth/session.ts`
2. Middleware protection: `middleware.ts` and `lib/auth/middleware.ts`
3. Session duration: Update token expiry in `createToken()`

### Changing Database Schema
1. Update schema: `lib/db/schema.ts`
2. Generate migration: `pnpm db:generate`
3. Run migration: `pnpm db:migrate`
4. Update queries: `lib/db/queries.ts`

### Modifying Payment Flow
1. Checkout: `lib/payments/actions.ts` → `createCheckoutSession()`
2. Success callback: `app/api/stripe/checkout/route.ts`
3. Webhooks: `app/api/stripe/webhook/route.ts`
4. Portal: `lib/payments/actions.ts` → `createCustomerPortalSession()`

### Adding Activity Logging
Add logging calls in server actions using the activity log pattern:
```typescript
await db.insert(activityLogs).values({
  teamId: team.id,
  userId: user.id,
  action: 'your_action_type',
  ipAddress: headers().get('x-forwarded-for') || 'unknown',
});
```
