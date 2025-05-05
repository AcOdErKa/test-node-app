const request = require('supertest');
const app = require('../server');

describe('Express App', () => {
  let server;

  beforeAll(() => {
    // Start server for testing
    server = app.listen(0); // Use random available port
  });

  afterAll((done) => {
    // Close server after all tests
    server.close(done);
  });

  describe('GET /', () => {
    it('should return a welcome message', async () => {
      const res = await request(app).get('/');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: 'Welcome to the Node.js app' });
    });
  });

  describe('POST /api/users', () => {
    it('should create a user with valid data', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ username: 'testuser', email: 'test@example.com' });
      expect(res.status).toBe(201);
      expect(res.body).toEqual({
        message: 'User created',
        data: { username: 'testuser', email: 'test@example.com' },
      });
    });

    it('should return 400 if username is missing', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ email: 'test@example.com' });
      expect(res.status).toBe(400);
      expect(res.body.errors).toContainEqual(
        expect.objectContaining({ msg: 'Username is required' })
      );
    });

    it('should return 400 if email is invalid', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ username: 'testuser', email: 'invalid' });
      expect(res.status).toBe(400);
      expect(res.body.errors).toContainEqual(
        expect.objectContaining({ msg: 'Valid email is required' })
      );
    });
  });
});
