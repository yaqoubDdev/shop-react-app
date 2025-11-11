# Shop React App

A product management application built with React and Vite, featuring order tracking, product management, and order history.

## Features

- Add products with name, price, and quantity
- Create product orders with optional labels
- View order history with timestamps
- Display order totals and calculations
- Persistent data storage with backend API

## Project Structure

- `src/` - Frontend React application
- `backend/` - Express.js backend API with SQLite database
- `db.json` - Dummy data file (used for database initialization)

## Setup

### Frontend

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

### Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install backend dependencies:
```bash
npm install
```

3. Initialize the database with dummy data:
```bash
npm run init-db
```

4. Start the backend server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The backend API will run on `http://localhost:2000`

## Running the Application

1. Start the backend server first (in the `backend` directory)
2. Start the frontend development server (in the root directory)
3. Open your browser to the frontend URL (usually `http://localhost:5173`)

## API Endpoints

The backend provides the following endpoints:

- `GET /products` - Get all product orders
- `POST /products` - Create a new product order
- `GET /products/:id` - Get a single product order by ID
- `DELETE /products/:id` - Delete a product order by ID

See `backend/README.md` for detailed API documentation.

## Technology Stack

### Frontend
- React 18
- Vite
- Axios
- CSS3

### Backend
- Node.js
- Express.js
- SQLite (better-sqlite3)
- CORS

## Development

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend Scripts
- `npm start` - Start the server
- `npm run dev` - Start server with auto-reload
- `npm run init-db` - Initialize database with dummy data

## Database

The backend uses SQLite for data persistence. The database file (`database.sqlite`) is created automatically when you run the backend server for the first time. Use `npm run init-db` to seed the database with initial dummy data.

## Notes

- The old `json-server` script is still available in package.json but the backend should be used instead
- The backend runs on port 2000 by default
- CORS is enabled to allow frontend requests
- The database file is gitignored and should not be committed
