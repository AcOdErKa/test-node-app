const request = require('supertest');
const app = require('../server');

describe('Express Server', () => {
  // Tests for GET /
  describe('GET /', () => {
    it('should return Hello, World! with status 200', async () => {
      const res = await request(app).get('/');
      expect(res.status).toBe(200);
      expect(res.text).toBe('Hello, World!');
    });
  });

  // Tests for GET /api/users
  describe('GET /api/users', () => {
    it('should return a list of users with status 200', async () => {
      const res = await request(app).get('/api/users');
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty('id');
      expect(res.body[0]).toHaveProperty('name');
      expect(res.body[0]).toHaveProperty('email');
    });
  });

  // Tests for POST /api/users
  describe('POST /api/users', () => {
    it('should create a new user with valid input and return 201', async () => {
      const newUser = { name: 'Charlie', email: 'charlie@example.com' };
      const res = await request(app)
        .post('/api/users')
        .send(newUser);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe(newUser.name);
      expect(res.body.email).toBe(newUser.email);
    });

    it('should return 400 for missing name', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ email: 'invalid@example.com' });
      expect(res.status).toBe(400);
      expect(res.body.errors).toBeInstanceOf(Array);
      expect(res.body.errors[0].msg).toBe('Name is required');
    });

    it('should return 400 for invalid email', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ name: 'Invalid', email: 'not-an-email' });
      expect(res.status).toBe(400);
      expect(res.body.errors).toBeInstanceOf(Array);
      expect(res.body.errors[0].msg).toBe('Valid email is required');
    });

    it('should return 400 for empty request body', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({});
      expect(res.status).toBe(400);
      expect(res.body.errors).toBeInstanceOf(Array);
      expect(res.body.errors).toHaveLength(2);
    });
  });
});
