# OrderHub - A CRM for Marketplace Order Management

OrderHub is a comprehensive CRM application designed to streamline order management for marketplace sellers. It provides a centralized platform to track orders, manage products, and integrate with popular marketplaces like Shopify and Etsy.

## Project Structure

The project is organized into two main directories:

-   `frontend/`: Contains the user-facing web application built with React, TypeScript, and Vite.
-   `backend/`: Contains the server-side API built with Node.js, Express, TypeScript, and Prisma.

## Getting Started

To get the application up and running locally, you'll need to follow the setup instructions for both the backend and the frontend.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v16 or later)
-   [npm](https://www.npmjs.com/) (v8 or later)

### Backend Setup

1.  **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the `backend` directory and add the following, replacing the placeholder values as needed:

    ```env
    DATABASE_URL="file:./dev.db"
    JWT_SECRET="your-super-secret-jwt-key"
    JWT_EXPIRES_IN="7d"
    PORT=5000
    FRONTEND_URL="http://localhost:5173" # Default Vite port
    ```

4.  **Initialize and seed the database:**

    Run the following commands to set up your SQLite database and populate it with initial data:

    ```bash
    # Set up the database schema
    npx prisma db push

    # Seed the database with test data
    npx prisma db seed
    ```

5.  **Start the backend server:**

    ```bash
    npm run dev
    ```

    The backend API will be running at `http://localhost:5000`.

### Frontend Setup

1.  **Navigate to the frontend directory (in a new terminal):**

    ```bash
    cd frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the `frontend` directory and add your Gemini API key:

    ```env
    VITE_GEMINI_API_KEY="your-gemini-api-key"
    ```
    *Note: The `VITE_` prefix is required for Vite to expose the environment variable to the client-side code.*

4.  **Start the frontend development server:**

    ```bash
    npm run dev
    ```

    The frontend application will be available at `http://localhost:5173`.

## Usage

Once both the backend and frontend servers are running, you can open your browser to `http://localhost:5173` to use the OrderHub application.

The seeded database includes a demo user:
-   **Email:** `demo@example.com`
-   **Password:** `password`