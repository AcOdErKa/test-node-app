const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Node.js app' });
});

// User creation endpoint with validation
app.post(
  '/api/users',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.status(201).json({ message: 'User created', data: req.body });
  }
);

// Start server only if not in test environment
if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;
