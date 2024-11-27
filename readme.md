# Books API

This is a **Books API** project for managing books, developed as part of the Stage Two Backend Track project. It is built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**.

## Features

- **Get all books**
- **Get a book by ID**
- **Add a new book**
- **Update a book**
- **Delete a book**
- **Retrieve My favorite book**

## Requirements

Before running this project, ensure you have:

- **Node.js** (version 16 or higher)
- **npm** (version 7 or higher)
- **MongoDB** (running locally or accessible via a connection string)

## Setup Instructions

Follow these steps to set up and run the project on your local machine:

### 1. Clone the Repository

```bash
  git clone https://github.com/your-username/books-api.git
  cd books-api
```

### 2. Install Dependencies

Install the required packages using npm:

```
    npm install
```

### 3. Configure Environment Variables

Create a .env file in the project root and add your MongoDB connection string:

```
    MONGO_URI=your-mongodb-connection-string
```

Replace your-mongodb-connection-string with the actual MongoDB URI.

### 4. Build the Project

Compile the TypeScript code to JavaScript:

```
npm run build
```

### 5. Run the Application

Start the application in development mode with Nodemon:

```
    npm run dev
```

Alternatively, start the application in production mode:

npm start

The server will run at http://localhost:3000.
API Endpoints
Base URL

>       http://localhost:3000

> Routes

```bash
    Method	Endpoint	Description
    GET	/books	Get all books
    POST	/books	Add a new book
    GET	/books/:id	Get a specific book by ID
    PUT	/books/:id	Update a specific book by ID
    DELETE	/books/:id	Delete a specific book by ID
    GET	/books/favorite	Get favorite books
    Example Default Route
```

Visit / to get a summary of the API endpoints and example usage.
Scripts

```bash

    npm run dev: Start the app in development mode with live reload.
    npm run build: Compile TypeScript to JavaScript.
    npm start: Run the compiled app in production mode.
    npm run setup-production-app: Install dependencies and build the app.

```

### Author

**Edmealem Kassahun**
License: **MIT**

Feel free to fork, contribute, or provide feedback!\*\*\*\*
