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

**Testing Flow Explanation (Isolated Architecture):**

To ensure that a user's code in one lesson cannot affect another, the backend uses an isolated testing architecture. Each time a user runs a test, the following happens:

1.  **User clicks "Run Tests"**: In the `SolidityEditor.tsx` component, this triggers the `handleRunTests` function.
2.  **Frontend sends request**: `handleRunTests` makes a `POST` request to the `/api/test-solidity` endpoint, containing the user's Solidity code and the `lessonId`.
3.  **Backend receives request**: The Express server receives the request.
4.  **Backend Creates Temporary Environment**:
    a.  The backend creates a new, unique temporary directory on the server (e.g., `/tmp/pragma-forge-xyz`).
    b.  It initializes a clean, empty Forge project in this directory.
5.  **Backend Prepares Files**:
    a.  The backend saves the user's submitted code as a contract file (e.g., `HelloWorld.sol`) in the temporary project's `src` directory.
    b.  It reads the official test file for the lesson from the main project's `forge_base_project/test` directory.
    c.  It automatically updates the test file's import path to point to the user's contract in the temporary `src` directory.
    d.  It saves this updated test file in the temporary project's `test` directory.
6.  **Backend Runs Isolated Test**: The backend executes the `forge test` command *inside the temporary project*. Since this project only contains the single contract and its test, it is completely isolated from all other lessons.
7.  **Backend Captures Output**: The backend captures the complete output (stdout and stderr) from the `forge test` command.
8.  **Backend Sends JSON Response**: The backend sends a JSON response to the frontend, containing the full test output and a `success` flag.
9.  **Backend Cleans Up**: The backend deletes the entire temporary directory and its contents.
10. **Frontend Displays Output**: The frontend receives the JSON response and displays the test output in the IDE's output panel.

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

#### Phase 3: Solidity Code Testing with Forge

1.  **Create Test Endpoint:** Create a new `/api/test-solidity` endpoint in the backend to receive Solidity code.
2.  **Execute Code with Forge:** Use Node.js's `child_process` module to execute Foundry's `forge test` command on the user's code and capture the output. This will involve writing the user's code to a temporary file, creating a test file for it, and then running `forge test`.
3.  **Frontend `SolidityEditor` Update:** Modify the `SolidityEditor.tsx` component, adding a "Run Tests" button to send code to the new API endpoint.
4.  **Display Results:** Display the test results from the backend below the code editor.

#### Phase 4: Lesson Progress Tracking

1.  **Explain RESTful API Principles:** (Already done)
2.  **Create Backend API Endpoints:** (Already done)
3.  **Frontend Integration for Progress Tracking:**
    *   **3.1 Authentication Context and User ID:**
        *   **Goal:** Ensure the `userId` is accessible throughout the frontend for authenticated API calls.
        *   **Action:** Review `src/App.tsx` and related authentication components (e.g., login forms, user state management) to identify where the user's logged-in status and `userId` are stored. If not already present, consider implementing a React Context or similar global state management for user authentication.
    *   **3.2 Fetching User Progress on Lessons Page Load:**
        *   **Goal:** Display which lessons a logged-in user has completed on the `LessonsPage`.
        *   **Action:**
            *   Modify `src/pages/LessonsPage.tsx`.
            *   Inside a `useEffect` hook, if a user is logged in, make an authenticated `GET` request to `/api/progress`.
            *   Store the fetched progress data (e.g., an array of `lessonId`s that are completed) in the component's state.
            *   Pass this `completedLessons` data down to the individual lesson display components (e.g., `LessonRow` if you have one, or directly to the `lessons` array in `lessons.ts` if it's mutable and shared).
            *   Update the UI to visually indicate completed lessons (e.g., a checkmark, different styling).
    *   **3.3 Updating User Progress from Lesson Pages:**
        *   **Goal:** Allow users to mark a lesson as completed from within the lesson page.
        *   **Action:**
            *   Modify individual lesson components (e.g., `src/lessons/HelloWorld.tsx`, `src/lessons/VariablesTypes.tsx`, etc.).
            *   Add a "Mark as Complete" button or integrate the completion logic with passing all tests.
            *   When triggered, make an authenticated `POST` request to `/api/progress` with the `lessonId` and `completed: true`.
            *   Handle the response: if successful, update the local state and potentially trigger a re-fetch of progress data to ensure consistency across the app.
    *   **3.4 Displaying Progress in Lesson Components:**
        *   **Goal:** Visually show the completion status within each lesson component.
        *   **Action:**
            *   Modify `src/components/Lesson.tsx` (or the component that renders individual lesson details).
            *   Accept a prop (e.g., `isCompleted: boolean`) that indicates whether the current lesson is completed for the logged-in user.
            *   Use this prop to conditionally render a checkmark, change styling, or disable certain actions.

### Technology Reasoning

#### Why use the Foundry Toolchain?

You are using the Foundry toolchain because it's a fast, modern, and integrated toolkit that provides everything we need for the new interactive features, specifically:

*   **Anvil:** This will run a local, high-speed Ethereum blockchain on your machine. It's for deploying and testing your smart contracts in a development environment without needing to connect to a public testnet.
*   **Forge:** This is a powerful testing framework. We'll use it to write tests for our Solidity smart contracts *in Solidity*, which is a huge advantage for ensuring they work correctly.
*   **Chisel:** This is an interactive Solidity Read-Eval-Print Loop (REPL). While not directly used for the testing endpoint, it's part of the Foundry suite and could be used for other interactive Solidity features in the future.

#### Why use a Database?

We are using a database to permanently store information that changes over time and is specific to each user. For this project, the database is essential for two core features:

1.  **User Accounts:** To enable users to register and log in, we need a database to securely store their credentials (like a username and a hashed password).
2.  **Lesson Progress Tracking:** To save a user's progress, we need to record which lessons they have completed. The database will store this information, allowing users to sign in and pick up where they left off.

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
*   **Step 6: Define initial schema in `schema.prisma`:** Completed (including correction for PostgreSQL ID type).
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

**Your Prompt to Gemini:**

```
Gemini, let's begin Phase 5: tracking user progress. Please guide me by:

1.  Explaining the RESTful API principles we'll use for the progress-tracking endpoints (e.g., GET for fetching, POST for creating/updating).
2.  Providing a plan to create the necessary API endpoints in the backend (e.g., `GET /api/progress` and `POST /api/progress`) to save and retrieve a user's lesson progress.
3.  Showing me how to modify the frontend lesson pages to interact with these new endpoints, so that a logged-in user's progress is saved and loaded automatically.
```
---
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
d
1.  **Integrate CodeMirror 6:** Install CodeMirror 6 core packages and `@replit/codemirror-lang-solidity`.
2.  **Update `SolidityEditor.tsx`:** Modify the `SolidityEditor.tsx` component to use CodeMirror 6 for code editing.
3.  **Configure Solidity Highlighting:** Implement Solidity syntax highlighting using `@replit/codemirror-lang-solidity`.

#### Phase 5: Lesson Progress Tracking

*   **RESTful API principles explained:** Completed.
*   **Backend API endpoints (`GET /api/progress`, `POST /api/progress`) created:** Completed.
*   **Frontend lesson pages modified to interact with new endpoints:** Completed (including JWT authentication, fetching/updating progress, and UI integration with checkboxes).

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
*   **Step 6: Define initial schema in `schema.prisma`:** Completed (including correction for PostgreSQL ID type).
*   **Step 7: Run Prisma Migrate:** Completed and verified.
*   **Step 4 (from prompt): Create secure registration/login API endpoints:**
    *   Concepts (hashing, JWTs) explained: Completed.
    *   `bcryptjs` and `jsonwebtoken` installed: Completed.
    *   Authentication routes (`backend/src/routes/auth.ts`) created: Completed.
    *   `backend/src/index.ts` updated to use auth routes: Completed.
    *   Endpoints (`/api/auth/register`, `/api/auth/login`) are ready for testing.