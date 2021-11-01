import request from 'supertest';
import app from '../app';
import { connectToTestDB, disconnectToTestDB } from '../database/test-db';

beforeAll(async () => {
  await connectToTestDB();

  await request(app).post('/api/route').send({ name: 'Z77' });
  await request(app).post('/api/route').send({ name: 'H66' });

  await request(app).post('/api/line').send({ lineName: 'L345' });
});

afterAll(async () => {
  await disconnectToTestDB();
});

describe('Set up line with routes', () => {
  describe('set forword route -> line', () => {
    it('should return 201', async () => {
      const res = await request(app)
        .post('/api/line/L345')
        .send({
          forwordRouteName: 'Z77'
        });
      expect(res.statusCode).toBe(201);
    });
  });

  describe('set backword route -> line', () => {
    it('should return 201', async () => {
      const res = await request(app)
        .post('/api/line/L345')
        .send({
          backwordRouteName: 'H66'
        });
      expect(res.statusCode).toBe(201);
    });
  });

  describe('get line info', () => {
    it('should contain 2 routes', async () => {
      const res = await request(app).get('/api/line/L345');
      expect(res.statusCode).toBe(200);
      expect(res.body.routes).toHaveProperty('forward');
      expect(res.body.routes).toHaveProperty('backword');
    });
  });
});
