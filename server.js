const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON and log requests
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Sample in-memory user store
const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// Root endpoint
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Get all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Create a new user
app.post('/api/users', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
    email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
