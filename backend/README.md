# Mobile App Backend API

A Node.js/Express backend server for the Mobile App with JWT authentication and book management.

## Features

- **JWT Authentication** - Secure login with JWT tokens
- **Book Management** - View available books and manage inventory
- **Borrowing System** - Borrow and return books with real-time updates
- **CORS Enabled** - Works with React Native and web apps
- **Mock Database** - Sample data for testing

## API Endpoints

### Authentication
- `POST /auth/login` - User login (returns JWT token)

### Books
- `GET /books` - Get all available books (requires JWT)
- `POST /borrow` - Borrow a book (requires JWT)
- `GET /my-books` - Get user's borrowed books (requires JWT)
- `POST /return` - Return a book (requires JWT)

## Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

4. **Server will start on:** `http://localhost:8000`

## Test Credentials

- **Email:** `swi@gmail.com`
- **Password:** `password`

## Sample Data

The backend includes sample books:
- The Great Gatsby (3 copies available)
- To Kill a Mockingbird (2 copies available)
- 1984 (0 copies available)
- Pride and Prejudice (1 copy available)
- The Hobbit (4 copies available)

## Usage with Mobile App

1. **Start the backend server** (this directory)
2. **Start your React Native app** (parent directory)
3. **Login with test credentials**
4. **Browse and borrow books**

## API Response Examples

### Login Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "swi@gmail.com",
    "name": "Test User"
  }
}
```

### Books Response
```json
{
  "books": [
    {
      "id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "availableCopies": 3,
      "totalCopies": 5
    }
  ]
}
```

## Security Notes

- JWT secret is hardcoded for development (change in production)
- Passwords are hashed using bcrypt
- All book endpoints require valid JWT token
- CORS is enabled for cross-origin requests

## Production Considerations

- Use environment variables for JWT secret
- Implement rate limiting
- Add input validation middleware
- Use a real database (PostgreSQL, MongoDB, etc.)
- Add logging and monitoring
- Implement refresh tokens
- Add user registration endpoint
