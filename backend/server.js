const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// JWT Secret (in production, use environment variable)
const JWT_SECRET = 'your-super-secret-jwt-key-change-in-production';

// Mock database (in production, use real database)
const users = [
  {
    id: 1,
    email: 'swi@gmail.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // 'password'
    name: 'Test User'
  }
];

const books = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    availableCopies: 3,
    totalCopies: 5
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    availableCopies: 2,
    totalCopies: 4
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
    availableCopies: 0,
    totalCopies: 2
  },
  {
    id: 4,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    availableCopies: 1,
    totalCopies: 3
  },
  {
    id: 5,
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    availableCopies: 4,
    totalCopies: 6
  }
];

const borrowedBooks = [];

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Mobile App Backend API is running!' });
});

// Login endpoint
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get books endpoint (protected)
app.get('/books', authenticateToken, (req, res) => {
  try {
    res.json({ books });
  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Borrow book endpoint (protected)
app.post('/borrow', authenticateToken, async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.userId;

    // Validate input
    if (!bookId) {
      return res.status(400).json({ message: 'Book ID is required' });
    }

    // Find book
    const book = books.find(b => b.id === parseInt(bookId));
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if book is available
    if (book.availableCopies <= 0) {
      return res.status(400).json({ message: 'Book is not available for borrowing' });
    }

    // Check if user already borrowed this book
    const alreadyBorrowed = borrowedBooks.find(bb => bb.userId === userId && bb.bookId === parseInt(bookId));
    if (alreadyBorrowed) {
      return res.status(400).json({ message: 'You have already borrowed this book' });
    }

    // Borrow the book
    book.availableCopies--;
    borrowedBooks.push({
      id: borrowedBooks.length + 1,
      userId,
      bookId: parseInt(bookId),
      borrowedAt: new Date(),
      bookTitle: book.title
    });

    res.json({
      success: true,
      message: 'Book borrowed successfully!',
      book: {
        id: book.id,
        title: book.title,
        availableCopies: book.availableCopies
      }
    });

  } catch (error) {
    console.error('Borrow book error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user's borrowed books (protected)
app.get('/my-books', authenticateToken, (req, res) => {
  try {
    const userId = req.user.userId;
    const userBorrowedBooks = borrowedBooks.filter(bb => bb.userId === userId);
    
    res.json({ borrowedBooks: userBorrowedBooks });
  } catch (error) {
    console.error('Get my books error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Return book endpoint (protected)
app.post('/return', authenticateToken, async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.userId;

    // Find borrowed book
    const borrowedBookIndex = borrowedBooks.findIndex(bb => 
      bb.userId === userId && bb.bookId === parseInt(bookId)
    );

    if (borrowedBookIndex === -1) {
      return res.status(404).json({ message: 'Book not found in your borrowed list' });
    }

    // Return the book
    const book = books.find(b => b.id === parseInt(bookId));
    if (book) {
      book.availableCopies++;
    }

    // Remove from borrowed books
    borrowedBooks.splice(borrowedBookIndex, 1);

    res.json({
      success: true,
      message: 'Book returned successfully!',
      book: {
        id: book.id,
        title: book.title,
        availableCopies: book.availableCopies
      }
    });

  } catch (error) {
    console.error('Return book error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 Available endpoints:`);
  console.log(`   POST /auth/login - User authentication`);
  console.log(`   GET  /books - Get all books`);
  console.log(`   POST /borrow - Borrow a book`);
  console.log(`   GET  /my-books - Get user's borrowed books`);
  console.log(`   POST /return - Return a book`);
  console.log(`\n🔑 Test login credentials:`);
  console.log(`   Email: swi@gmail.com`);
  console.log(`   Password: password`);
});
