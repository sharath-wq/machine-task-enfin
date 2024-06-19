# Create and List Books

A MERN Stack applicaiton for Create and List Books.

## Table of Contents

-   [Features](#features)
-   [Installation](#installation)
-   [Backend Setup](#backend-setup)
-   [Frontend Setup](#frontend-setup)
-   [Environment Variables](#environment-variables)
-   [Running the Application](#running-the-application)
-   [API Endpoints](#api-endpoints)

## Features

-   Create Books
-   List Books
-   Responsive design
-   RESTful API
-   Modern front-end framework (React with Vite)
-   Validation on Both fronend and backend
-   Search and pagination

## Installation

### Prerequisites

Make sure you have the following installed on your machine:

-   Node.js
-   npm (Node Package Manager) or yarn

### Backend Setup

1. Clone the repository:

    ```sh
    git clone https://github.com/sharath-wq/machine-task-enfin.git
    cd machine-task-enfin
    ```

2. Navigate to the backend directory:

    ```sh
    cd server
    ```

3. Install backend dependencies:

    ```sh
    npm install
    ```

4. Create a `.env` file in the `backend` directory and add the following environment variables:

    ```plaintext
    MONGO_URI=your_mongodb_connection_string
    ```

5. Start the backend server:

    ```sh
    npm run start-dev
    ```

### Frontend Setup

1. Navigate to the frontend directory:

    ```sh
    cd ../client
    ```

2. Install frontend dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the `frontend` directory and add the following environment variable:

    ```plaintext
    VITE_API_URL=http://localhost:3000/api
    ```

4. Start the frontend development server:

    ```sh
    npm run dev
    ```

## Running the Application

To run the application locally, follow these steps:

1. Start the backend server:

    ```sh
    cd backend
    npm run start-dev
    ```

2. Start the frontend development server:

    ```sh
    cd ../frontend
    npm run dev
    ```

3. Open your browser and navigate to `http://localhost:5173` to view the application.

## API Endpoints

### Books

-   `POST /api/books` - Create a new book.
-   `GET /api/books` - Get all books.
