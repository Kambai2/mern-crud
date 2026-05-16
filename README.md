# MERN CRUD Application

A simple MERN stack user management app for creating, reading, updating, and deleting users.

## Features

- Add new users with name, email, and address
- View all users in a responsive table
- Update existing user details
- Delete users with confirmation
- Responsive Add and Update forms for mobile screens
- React frontend with Axios and React Router
- Express/MongoDB backend with Mongoose

## Project Structure

- `client/` - React frontend
- `server/` - Express backend API
- `server/models/` - Mongoose schema
- `server/controllers/` - Route logic
- `server/routes/` - API routes

## Setup

1. Install dependencies for the backend:

```bash
cd server
npm install
```

2. Install dependencies for the frontend:

```bash
cd ../client
npm install
```

3. Create a `.env` file in the `server/` folder with your MongoDB connection string:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

> The `.env` file is intentionally excluded from the repository and should not be committed.

4. Start the backend server:

```bash
cd server
node index.js
```

5. Start the frontend app:

```bash
cd client
npm start
```

6. Open the app in your browser at:

```text
http://localhost:3000
```

## Notes

- The backend uses `MONGO_URI` from environment variables.
- If you prefer live reload for the backend, use `npx nodemon index.js`.
- The frontend makes API requests to `http://localhost:5000/api`.

## GitHub

This is intended to be published as a public GitHub repository. The `.env` file is not included in version control.
