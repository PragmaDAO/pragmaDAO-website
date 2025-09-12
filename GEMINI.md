# Gemini Guided Development Plan

This file contains a series of prompts to guide Gemini in helping you build out the pragmaDAO website. Copy and paste each prompt to start the corresponding phase of the project.

---

### Phase 1: Backend Scaffolding & Foundry Installation

**Your Prompt to Gemini:**

```
Gemini, let's start Phase 1. Please teach me how to set up the backend and install Foundry. I need you to:

1.  First, explain what Foundry is, what its components (`forge`, `anvil`, `chisel`) do, and why we are using it.
2.  Then, guide me through installing it using the standard method.
3.  Next, explain the concept of a Node.js and Express.js backend and why it's a good choice for this project.
4.  Finally, provide and execute a step-by-step plan to:
    a. Create a new `backend` directory.
    b. Initialize a TypeScript Node.js project inside it.
    c. Add Express.js as a dependency.
    d. Create a simple "Hello World" API endpoint to confirm the server is working.
```

---

### Phase 2: Database and User Authentication

**Your Prompt to Gemini:**

```
Gemini, let's move to Phase 2. I want to learn how to add a database and user authentication to our new backend. Please:

1.  Explain what a database is and compare PostgreSQL and SQLite for this project. Also, explain what an ORM is and why we might use Prisma.
2.  Provide a step-by-step plan to add Prisma to our project and connect it to a database.
3.  Guide me through defining the database schema for a `User` table (with username and password) and a `UserLessonProgress` table to link users to the lessons they've completed.
4.  Finally, show me how to create secure registration (`/api/register`) and login (`/api/login`) API endpoints. Explain concepts like password hashing and why it's critical for security.
```

---

### Phase 3: Solidity Code Testing with Forge

**Your Prompt to Gemini:**

```
Gemini, time for Phase 3. Let's integrate Solidity code testing using Foundry Forge. Please teach me how to do this by:

1.  Explaining how Foundry Forge works to test smart contracts written in Solidity with Solidity code (instead of using JavaScript/TypeScript).
2.  Providing a plan to create a new `/api/test-solidity` endpoint in our backend.
3.  Showing me how the backend can use Node.js's `child_process` to run Foundry's `forge test` command on user-provided Solidity code and capture its output.
4.  Guiding me through modifying the `SolidityEditor.tsx` component in the frontend to send the user's code to this new API endpoint and display the returned test results.
```

---

### Phase 4: Lesson Progress Tracking

**Your Prompt to Gemini:**

```
Gemini, let's begin Phase 4: tracking user progress. Please guide me by:

1.  Explaining the RESTful API principles we'll use for the progress-tracking endpoints (e.g., GET for fetching, POST for creating/updating).
2.  Providing a plan to create the necessary API endpoints in the backend (e.g., `GET /api/progress` and `POST /api/progress`) to save and retrieve a user's lesson progress.
3.  Showing me how to modify the frontend lesson pages to interact with these new endpoints, so that a logged-in user's progress is saved and loaded automatically.
```
---

### Phase 5: CodeMirror 6 Integration

**Your Prompt to Gemini:**

```
Gemini, let's begin Phase 5: CodeMirror 6 Integration. Please guide me by:

1.  Installing CodeMirror 6 core packages and `@replit/codemirror-lang-solidity`.
2.  Updating `SolidityEditor.tsx` to use CodeMirror 6 for code editing.
3.  Configuring Solidity syntax highlighting using `@replit/codemirror-lang-solidity`.
```
---

### Phase 6: Payments and Subscriptions

**Your Prompt to Gemini:**

```
Gemini, let's begin Phase 6: implementing payments and subscriptions. Please guide me by:

1.  First, explaining the necessary database schema changes to support subscriptions, discount codes, and referrals. I need to support at least 2,000 paying members.
2.  Providing a step-by-step plan to integrate the Stripe API for credit card payments. This should include creating API endpoints for creating subscriptions, handling webhooks for payment events, and managing subscription statuses.
3.  Showing me how to build a system for generating and redeeming discount codes. This should include an admin interface (or a simple script) to create codes and an API endpoint to validate and apply them to a subscription.
4.  Guiding me through the implementation of a referral system. This should include generating unique referral codes for users and applying discounts for both the referrer and the referred user.
5.  Finally, showing me how to integrate Thirdweb's SDK to accept USDC payments for subscriptions. This should include creating a backend endpoint to verify the transaction on the blockchain and activate the user's subscription.
```
---

## Project Documentation

### In-Depth Action Plan

#### Phase 1: Backend Scaffolding & Foundry Installation

1.  **Install Foundry:** Run the official installation script via a shell command to install `forge`, `anvil`, and `chisel`.
2.  **Create Backend Structure:** Create a `backend` directory in the project root.
3.  **Initialize Node.js Project:** Inside `backend`, initialize a new Node.js project, configure it for TypeScript, and create a `tsconfig.json` file.
4.  **Install Dependencies:** Install Express.js as the web server framework.
5.  **Create Basic Server:** Write the initial server code in `backend/src/index.ts` with a simple "/" endpoint.
6.  **Add Run Script:** Add a `dev` script to the backend's `package.json` to easily start the server.

#### Phase 2: Database and User Authentication

1.  **Launch Database:** Create a `docker-compose.yml` file to define and launch a PostgreSQL database service in a Docker container.
2.  **Integrate Prisma:** Add the Prisma ORM to the backend, connect it to the database, and initialize it.
3.  **Define Data Schema:** Edit `prisma/schema.prisma` to define the `User` and `UserLessonProgress` models.
4.  **Create Database Tables:** Run `prisma migrate` to automatically create the database tables from the schema.
5.  **Build Authentication API:** Create the `/api/register` and `/api/login` endpoints, implementing password hashing and JWTs for security.

#### Phase 3: Solidity REPL Integration

1.  **Create REPL Endpoint:** Create a new `/api/repl` endpoint in the backend to receive Solidity code.
2.  **Execute Code with Chisel:** Use Node.js's `child_process` module to execute Foundry's `chisel` tool with the user's code and capture the output.
3.  **Frontend `SolidityEditor` Update:** Modify the `SolidityEditor.tsx` component, adding a "Run" button to send code to the new endpoint.
4.  **Display Results:** Display the results from the backend below the code editor.

#### Phase 4: CodeMirror 6 Integration

1.  **Integrate CodeMirror 6:** Install CodeMirror 6 core packages and `@replit/codemirror-lang-solidity`.
2.  **Update `SolidityEditor.tsx`:** Modify the `SolidityEditor.tsx` component to use CodeMirror 6 for code editing.
3.  **Configure Solidity Highlighting:** Implement Solidity syntax highlighting using `@replit/codemirror-lang-solidity`.

#### Phase 5: Lesson Progress Tracking

*   **RESTful API principles explained:** Completed.
*   **Backend API endpoints (`GET /api/progress`, `POST /api/progress`) created:** Completed.
*   **Frontend lesson pages modified to interact with new endpoints:** Completed (including JWT authentication, fetching/updating progress, and UI integration with checkboxes).

#### Phase 6: Payments and Subscriptions

1.  **Update Database Schema:**
    *   Modify `prisma/schema.prisma` to add new models: `Subscription`, `DiscountCode`, `Referral`, and `CryptoPayment`.
    *   Update the `User` model to include `stripeCustomerId`, `subscriptionStatus`, and `referrerId`.
    *   Run `prisma migrate` to apply the schema changes to the database.
2.  **Integrate Stripe:**
    *   Install the Stripe Node.js library (`stripe`).
    *   Create new API endpoints in the backend for:
        *   `POST /api/stripe/create-subscription`: To create a new Stripe checkout session.
        *   `POST /api/stripe/webhook`: To handle incoming webhooks from Stripe for events like `checkout.session.completed`, `invoice.payment_succeeded`, `customer.subscription.deleted`, etc.
    *   Modify the frontend to include a pricing page and a checkout button that redirects to Stripe.
3.  **Implement Discount Codes:**
    *   Create a new route in `backend/src/routes/admin.ts` for generating discount codes. This can be a simple endpoint that only authorized admins can access.
    *   Create an API endpoint `POST /api/apply-discount` to validate a discount code and apply it to a user's subscription.
    *   Update the frontend checkout process to include a field for entering a discount code.
4.  **Build Referral System:**
    *   When a new user signs up, check for a `referrerId` in the request.
    *   Generate a unique referral code for each user and display it on their profile page.
    *   When a discount is applied through a referral, update the records for both the referrer and the referred user.
5.  **Integrate Thirdweb for Crypto Payments:**
    *   Install the Thirdweb SDK (`@thirdweb-dev/sdk`).
    *   Create a new API endpoint `POST /api/crypto/pay` that takes a transaction hash as input.
    *   In the backend, use the Thirdweb SDK to verify the transaction on the blockchain.
    *   If the transaction is valid, update the user's subscription status in the database.
    *   Modify the frontend to include a "Pay with USDC" button that initiates the transaction using the user's wallet (e.g., MetaMask).

### Technology Reasoning

#### Why use the Foundry Toolchain?

You are using the Foundry toolchain because it's a fast, modern, and integrated toolkit that provides everything we need for the new interactive features, specifically:

*   **Anvil:** This will run a local, high-speed Ethereum blockchain on your machine. It's for deploying and testing your smart contracts in a development environment without needing to connect to a public testnet.
*   **Forge:** This is a powerful testing framework. We'll use it to write tests for our Solidity smart contracts *in Solidity*, which is a huge advantage for ensuring they work correctly.
*   **Chisel:** This is an interactive Solidity Read-Eval-Print Loop (REPL). It's the key component that will power the live code editor on the website, allowing users to execute Solidity code snippets and get immediate feedback.

#### Why use a Database?

We are using a database to permanently store information that changes over time and is specific to each user. For this project, the database is essential for two core features:

1.  **User Accounts:** To enable users to register and log in, we need a database to securely store their credentials (like a username and a hashed password).
2.  **Lesson Progress Tracking:** To save a user's progress, we need to record which lessons they have completed. The database will store this information, allowing users to sign in and pick up where they left off.

In addition to these core features, a robust database is essential for supporting a payment and subscription system. To handle paying members, we would need to add the following to our schema:

*   **User Table Modifications**:
    *   `stripeCustomerId`: A unique ID to link a user to their Stripe customer object.
    *   `subscriptionStatus`: To track the user's current subscription status (e.g., `ACTIVE`, `CANCELED`).
    *   `referrerId`: To track who referred this user.
*   **New Tables**:
    *   `Subscription`: To store details of each user's subscription.
    *   `DiscountCode`: To store information about discount codes.
    *   `Referral`: To track referrals.
    *   `CryptoPayment`: To store a record of all cryptocurrency payments.

---

## Progress Summary

This section summarizes the work completed so far, referencing the plan outlined in this `GEMINI.md` file.

### Phase 1: Backend Scaffolding & Foundry Installation

*   **Foundry Explained:** Completed.
*   **Foundry Installation:** Confirmed existing installation.
*   **Node.js/Express.js Backend Explained:** Completed.
*   **Step 4a: Create `backend` directory:** Completed.
*   **Step 4b: Initialize TypeScript Node.js project:** Completed (including `package.json` and `tsconfig.json`).
*   **Step 4c: Add Express.js as a dependency:** Completed.
*   **Step 4d: Create simple "Hello World" API endpoint:** Completed and verified.

### Phase 2: Database and User Authentication

*   **Step 1: Explain Database, ORM, Prisma:** Completed.
*   **Step 2: Create `docker-compose.yml` for PostgreSQL:** Completed.
*   **Step 2: Start PostgreSQL Container:** Completed and verified.
*   **Step 3: Install Prisma CLI and Client:** Completed.
*   **Step 4: Initialize Prisma:** Completed (manual execution required).
*   **Step 5: Configure `.env` for Database Connection:** Completed.
*   **Step 6: Define initial schema in `prisma/schema.prisma`:** Completed (including correction for PostgreSQL ID type).
*   **Step 7: Run Prisma Migrate:** Completed and verified.
*   **Step 4 (from prompt): Create secure registration/login API endpoints:**
    *   Concepts (hashing, JWTs) explained: Completed.
    *   `bcryptjs` and `jsonwebtoken` installed: Completed.
    *   Authentication routes (`backend/src/routes/auth.ts`) created: Completed.
    *   `backend/src/index.ts` updated to use auth routes: Completed.
    *   Endpoints (`/api/auth/register`, `/api/auth/login`) are ready for testing.

### Phase 3: Solidity Code Testing with Forge

*   **Explanation of Forge testing:** Completed.
*   **Step 1 (from prompt): Create `/api/test-solidity` endpoint:** Completed (`backend/src/routes/test-solidity.ts` created).
*   **Step 2 (from prompt): Execute code with Forge:** Completed (backend uses `child_process` to run `forge test` on temporary files).
*   **Step 3 (from prompt): Modify `SolidityEditor.tsx`:** Completed (added "Run Tests" button and `handleRunTests` function).
*   **`cors` and `@types/cors` installed in backend:** Completed.
*   **Troubleshooting `EADDRINUSE` and `Cannot find module 'cors'` errors:** Completed.

### Phase 4: CodeMirror 6 Integration

*   **Integrate CodeMirror 6:** Completed.
*   **Update `SolidityEditor.tsx`:** Completed.
*   **Configure Solidity Highlighting:** Completed.

### Phase 5: Lesson Progress Tracking

*   **RESTful API principles explained:** Completed.
*   **Backend API endpoints (`GET /api/progress`, `POST /api/progress`) created:** Completed.
*   **Frontend lesson pages modified to interact with new endpoints:** Completed (including JWT authentication, fetching/updating progress, and UI integration with checkboxes).

### Phase 6: Payments and Subscriptions

Part 1: Database Schema for a Robust CRUD App

  To support a scalable CRUD (Create, Read, Update, Delete) application with
  subscriptions, we'll need to add the following to our database:

   * User Table Modifications: We'll expand the User table to include:
       * stripeCustomerId: A unique ID that connects a user to their Stripe account,
         which is essential for managing their subscription and billing.
       * subscriptionStatus: A field to track whether a user's subscription is ACTIVE,
         CANCELED, or INCOMPLETE. This will allow us to easily control access to paid
         features.
       * referrerId: A field to store the ID of the user who referred them, forming
         the basis of our referral system.

   * New Tables: We'll create several new tables to manage the payment and
     subscription process:
       * Subscription: This table will store details about each user's subscription,
         including their chosen plan, start and end dates, and current status.
       * DiscountCode: This table will hold all the information about available
         discount codes, such as the code itself, the type of discount (e.g., a
         percentage or a fixed amount), its value, and when it expires.
       * Referral: This table will link a referrer to the user they referred, enabling
         us to track and reward users for bringing new members to the platform.
       * CryptoPayment: This table will keep a record of all cryptocurrency payments,
         including the user who made the payment, the transaction hash, the amount
         paid, and the payment status.

  These additions will provide a solid foundation for building a scalable and
  feature-rich payment system.

  First, let's address the necessary database schema changes to support
  subscriptions, discount codes, and referrals, keeping in mind the need to support
  at least 2,000 paying members.

  To handle this, we'll need to modify the existing User table and introduce several
  new tables:

  Database Schema Changes for Payments and Subscriptions:

  1. User Table Modifications:

   * `stripeCustomerId` (String): A unique ID to link a user to their Stripe customer
     object. This is crucial for managing their subscription and billing directly
     through Stripe.
   * `subscriptionStatus` (Enum: `ACTIVE`, `CANCELED`, `INCOMPLETE`, `PAST_DUE`, 
     `UNPAID`): To track the user's current subscription status. This will allow us to
     easily control access to paid features and manage user lifecycles.
   * `referrerId` (String, Optional): A foreign key linking to another User's ID, to
     track who referred this user. This forms the basis of our referral system.

  2. New Tables:

   * `Subscription`:
       * id (String, Primary Key)
       * userId (String, Foreign Key to User.id): Links the subscription to a specific
         user.
       * stripeSubscriptionId (String): The ID of the subscription in Stripe.
       * planId (String): Identifier for the subscription plan (e.g., "monthly_pro",
         "annual_premium").
       * status (Enum: ACTIVE, CANCELED, PAST_DUE, UNPAID): Current status of the
         subscription.
       * startDate (DateTime): When the subscription began.
       * endDate (DateTime, Optional): When the subscription is set to end (for
         canceled or fixed-term subscriptions).
       * currentPeriodEnd (DateTime): The end of the current billing period.
       * amount (Float): The amount charged for the subscription.
       * currency (String): The currency of the subscription (e.g., "usd").
       * discountCodeId (String, Optional, Foreign Key to DiscountCode.id): If a
         discount code was applied.

   * `DiscountCode`:
       * id (String, Primary Key)
       * code (String, Unique): The actual discount code (e.g., "SAVE10",
         "FREEMONTH").
       * type (Enum: PERCENTAGE, FIXED_AMOUNT): Whether it's a percentage discount or
         a fixed amount.
       * value (Float): The discount value (e.g., 0.10 for 10%, or 5.00 for $5).
       * expiresAt (DateTime, Optional): When the discount code expires.
       * maxUses (Int, Optional): Maximum number of times the code can be used.
       * uses (Int): Current number of times the code has been used.
       * createdAt (DateTime)
       * updatedAt (DateTime)

   * `Referral`:
       * id (String, Primary Key)
       * referrerId (String, Foreign Key to User.id): The user who referred.
       * referredId (String, Foreign Key to User.id): The user who was referred.
       * referralCode (String, Unique): The unique code used for this referral.
       * status (Enum: PENDING, COMPLETED, CANCELED): Status of the referral (e.g.,
         completed when the referred user makes a payment).
       * createdAt (DateTime)
       * updatedAt (DateTime)

   * `CryptoPayment`:
       * id (String, Primary Key)
       * userId (String, Foreign Key to User.id): The user who made the payment.
       * transactionHash (String, Unique): The blockchain transaction hash.
       * amount (Float): The amount of cryptocurrency paid.
       * currency (String): The cryptocurrency used (e.g., "USDC").
       * status (Enum: PENDING, COMPLETED, FAILED): Status of the blockchain
         transaction.
       * createdAt (DateTime)
       * updatedAt (DateTime)

  These additions will provide a robust and scalable foundation for managing user
  subscriptions, discount codes, referrals, and crypto payments.


   Revised Thirdweb Integration Plan:

   1. Frontend:
       * Implement a "Connect Wallet" button using Thirdweb's React SDK.
       * Modify "Pay with USDC" to interact with a Thirdweb-deployed smart contract
         for payment, which will emit a success event.
       * Send the transaction hash to the POST /api/crypto/pay endpoint.

   2. Backend:
       * Enhance POST /api/crypto/pay to use the Thirdweb SDK to verify the
         transaction against the payment smart contract and update the user's
         subscription.
       * The THIRDWEB_PRIVATE_KEY will enable the Thirdweb SDK to interact with the
         deployed payment smart contract.

  I'll start by installing Thirdweb's React SDK in the frontend, then modify
  handleCryptoPayment to simulate contract interaction.

  Phase 6.1 fix:
  # Claude CLI Prompt: RareCode-style Payment System
# Claude CLI Prompt: RareCode-style Payment System

Create a complete blockchain education payment system similar to RareCode.ai/RareSkills with the following specifications:

## Tech Stack
- React TypeScript frontend with Thirdweb SDK
- Express.js backend with Prisma ORM
- USDC payments on Base blockchain
- TailwindCSS for styling

## Frontend Component Requirements

Create a `RareCodePayment.tsx` component with:

### UI Features
- Dark theme professional education platform design
- Wallet connection with Thirdweb ConnectWallet
- Real-time USDC balance display
- Three pricing tiers: Basic ($50), Premium ($200), Enterprise ($500)
- "Most Popular" badge on Premium tier
- Responsive grid layout for pricing cards
- Loading states and payment status feedback
- Security notice section at bottom

### Pricing Plans Structure
```typescript
Basic ($50 USDC, 30 days):
- Access to all Solidity lessons
- Basic coding challenges  
- Community Discord access
- Certificate of completion

Premium ($200 USDC, 90 days) - POPULAR:
- Everything in Basic
- Advanced ZK-proof modules
- Smart contract security training
- 1-on-1 mentor sessions
- Priority job placement support
- Lifetime Discord access

Enterprise ($500 USDC, Lifetime):
- Everything in Premium
- White-label course access
- Custom curriculum development
- Team training sessions
- Direct instructor access
```

### Blockchain Integration
- USDC contract integration on Base (address: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
- Balance checking before payment
- Direct USDC transfer to recipient address
- Transaction hash capture
- Payment verification

### Payment Flow
1. User connects wallet
2. System checks USDC balance
3. User selects plan and clicks pay
4. Execute USDC transfer on blockchain
5. Record payment in backend
6. Grant course access
7. Redirect to dashboard

## Backend API Requirements

Create Express.js routes for:

### POST `/api/payments/record`
- Record successful blockchain payment
- Grant course access based on plan
- Calculate expiration dates (30/90 days, or lifetime)
- Return success confirmation

### GET `/api/course-access`
- Check user's current access level
- Return plan type and expiration date
- Validate active access

## Prisma Schema Extensions

**IMPORTANT: Add these models AND update existing User model to support the new payment system**

Add these new models:
```prisma
model Payment {
  id              String   @id @default(cuid())
  userId          String?
  userAddress     String?
  planId          String   // 'monthly', 'annual'
  amount          Float    // 35.00 or 420.00
  currency        String   @default("USDC")
  paymentMethod   String   // 'crypto' or 'fiat'
  transactionHash String?  @unique
  thirdwebPaymentId String? @unique
  status          String   @default("completed")
  paidAt          DateTime @default(now())
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  user User? @relation(fields: [userId], references: [id])
}

model CourseAccess {
  id        String    @id @default(cuid())
  userId    String    @unique
  planId    String    // 'monthly' or 'annual'
  isActive  Boolean   @default(true)
  expiresAt DateTime  // 30 days for monthly, 365 days for annual
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  user User @relation(fields: [userId], references: [id])
}
```

**Update existing User model to include payment relationships:**
```prisma
model User {
  // ... existing fields ...
  payments      Payment[]
  courseAccess  CourseAccess?
  
  // Add these fields if they don't exist:
  walletAddress String?
  subscription  String?       // 'monthly', 'annual', or null
  subscriptionExpiresAt DateTime?
}
```

**Required Prisma migration commands to include:**
```bash
npx prisma migrate dev --name add-payment-system
npx prisma generate
```

**Database field additions needed:**
- Payment tracking with Thirdweb integration
- Subscription management (monthly/annual)
- Course access control with expiration dates
- **Billing period tracking** (start/end dates for each payment)
- **Auto-renewal settings** and status
- **First signup date** tracking
- **Ethereum address storage** for each payment
- User wallet address storage
- Payment method tracking (crypto vs fiat)
- Thirdweb payment ID storage for webhook verification

**Additional Features Required:**
- Page routing logic based on subscription status
- Payment history display with Ethereum addresses
- Subscription countdown timers
- Auto-renewal management
- Payment method display (crypto wallet vs credit card)

## Design Specifications
- Use modern glassmorphism card effects
- Indigo/purple accent colors for premium feel
- Hover animations and scale effects
- Professional typography hierarchy
- Loading spinners for async operations
- Success/error toast notifications
- Mobile-responsive design

## Security Requirements
- Use Thirdweb Pay Commerce for secure payment processing
- Validate webhook signatures from Thirdweb
- Store payment intent IDs for verification
- Verify payments through Thirdweb's API before granting access
- Secure API endpoints with authentication
- Handle payment failures gracefully
- Support both crypto and fiat payment verification

## Error Handling
- Insufficient balance warnings
- Network connectivity issues
- Transaction failures
- Backend API errors
- User-friendly error messages

Generate complete, production-ready code with proper TypeScript types, error handling, and modern React patterns. Include all necessary imports and ensure compatibility with Thirdweb SDK v4.
---
Perfect! The complete RareCode-style payment system has been implemented with all
  requested features:

  ✅ Completed Implementation

  Payment System Features:

  - Modern glassmorphism design with dark theme professional education platform styling
  - Three pricing tiers: Basic ($50, 30 days), Premium ($200, 90 days), Enterprise
  ($500, lifetime)
  - USDC payments on Base blockchain with direct wallet-to-wallet transfers
  - Real-time USDC balance display and transaction verification
  - Enhanced Prisma schema with billing period tracking, auto-renewal settings, and
  first signup date

  Payment History & Management:

  - Payment history display with Ethereum addresses and transaction links to BaseScan
  - Subscription countdown timers showing remaining days
  - Payment method tracking (crypto vs fiat) with visual indicators
  - Auto-renewal management interface

  Page Routing & Access Control:

  - ProtectedRoute component for subscription-based access control
  - useSubscription hook for real-time subscription status checking
  - Smart pricing page routing - shows subscription status for active users, payment
  options for non-subscribers
  - Plan hierarchy validation for premium features

  Security & User Experience:

  - JWT-based authentication for all payment endpoints
  - Transaction hash verification before granting access
  - Loading states, error handling, and user-friendly notifications
  - Mobile-responsive design with hover animations and modern UI patterns

  Backend API Endpoints:

  - POST /api/payments/record - Records blockchain payments and grants access
  - GET /api/payments/course-access - Checks current subscription status
  - GET /api/payments/history - Retrieves payment history with Ethereum addresses

  The system now provides a complete blockchain education payment experience similar to
   RareCode.ai/RareSkills with professional UI, secure payment processing, and
  comprehensive subscription management.

### Phase 7: Persist User Code

**Your Prompt to Gemini:**
  let's begin Phase 7. I want to the users code to save. When they revisit
   the lesson, their code should be there. Use localstorage to save the code. Save
   the user's code to the backend database when they move from the lesson to
  another lesson or to another part of the page. Create a plan and show me that
  plan before proceeding.

  Plan to Implement Code Persistence

    This plan is divided into three parts: frontend modifications to handle
    localStorage and backend communication, backend API and database changes, and
    finally, integrating everything.

    Part 1: Frontend (SolidityEditor.tsx and Lesson Components)

      1. Local Persistence with localStorage:
          * In SolidityEditor.tsx, when the component mounts, I'll check for and
            load
           any existing code from localStorage for the specific lessonId.
          * As the user types, I'll save the code to localStorage. This will be a
           debounced operation to prevent performance issues.

      2. Backend Persistence on Navigation:
          * In the individual lesson components (like HelloWorld.tsx), I'll use a
           useEffect cleanup function. When the component unmounts (i.e., the
  user
           navigates away), this function will trigger, sending the current code
  from
           the editor to the new backend endpoint.

    Part 2: Backend (API and Database)

      1. Database Schema Update:
          * I'll add a new UserCode table to the prisma/schema.prisma file. It will
           store the code for a given userId and lessonId.

      2. New API Endpoints:
          * POST /api/code: This endpoint will receive the lessonId and code and
           save or update it in the UserCode table for the currently authenticated
           user.
          * GET /api/code/:lessonId: This endpoint will retrieve the saved code for
           the authenticated user and the specified lessonId.

    Part 3: Integration


      1. Fetch Code on Load:
          * When a lesson component loads, it will call the GET /api/code/:lessonId
           endpoint to see if there's any code saved in the database.
      2. Prioritize and Display Code:
          * The SolidityEditor will prioritize loading code in the following order:
              1. Code from localStorage (to prevent loss of unsaved work from a page
                refresh).
              2. Code from the backend database (the user's previously saved work).
              3. The default lesson code (if no other code is found).

    This approach ensures that the user's code is always safe and accessible.

### Phase 7 Improved Plan: Cost-Effective Code Persistence

**Updated Strategy (Optimized for Server Costs):**

#### **Understanding Debouncing:**
Debouncing is a programming technique that delays function execution until after a specified time period has passed since the last time it was called.

**Example**: If a user types "Hello" in the editor:
- Without debouncing: Save triggered 5 times (H-e-l-l-o)
- With debouncing (500ms delay): Save triggered once, 500ms after they stop typing

**Benefits**:
- Reduces localStorage writes from hundreds to just a few
- Prevents performance issues from excessive saves
- Still provides immediate persistence without overwhelming the system

#### **Save Triggers (Cost-Optimized):**
1. **localStorage**: Debounced saves as user types (no server cost)
2. **Backend**: Only on navigation away from lessons (minimal server cost)
3. **No backend saving on test runs** (saves server resources and reduces hosting costs)

#### **Loading Priority:**
1. localStorage (immediate, free)
2. Backend database (one-time load per lesson visit)
3. Default lesson code (fallback)

#### **Cost Analysis:**
**Optimized backend API calls per user session:**
- Load saved code: 1 call per lesson visit
- Save code: 1 call when leaving lesson
- **Total: 2 calls per lesson**

**vs. "save on test run" approach:**
- Load: 1 call per lesson visit  
- Save: Multiple calls per lesson (every test run)
- **Total: 3-10+ calls per lesson**

**Cost savings: 50-80% reduction in backend calls**

#### **Implementation Strategy:**
1. ✅ Keep existing backend API (`/api/code/save`, `/api/code/load`)
2. Add localStorage with debouncing for typing
3. Add navigation-away saving to backend
4. Remove backend saving from test runs entirely

This approach provides immediate persistence (localStorage) with reliable backup (backend) while minimizing server costs.
