import request from 'supertest';
import app from '../app';
import { connectToTestDB, disconnectToTestDB } from '../database/test-db';

beforeAll(async () => {
  await connectToTestDB();
  await request(app).post('/api/stop').send({ code: 'B2' });
  await request(app).post('/api/stop').send({ code: 'A3' });
  await request(app).post('/api/stop').send({ code: 'D5' });

  await request(app).post('/api/route').send({ name: 'Z77' });
  await request(app).post('/api/route').send({ name: 'H66' });
});

afterAll(async () => {
  await disconnectToTestDB();
});

describe('Set up routes with stops', () => {
  describe('set stops -> route', () => {
    it('should return 201', async () => {
      const res = await request(app)
        .post('/api/route/Z77')
        .send({
          stopCodes: ['B2', 'A3', 'D5', 'Not Exist One'],
        });
      expect(res.statusCode).toBe(201);
    });
    it('should have 3 stops', async () => {
      const res = await request(app).get('/api/route/Z77');
      expect(res.statusCode).toBe(200);
      expect(res.body.stops.length).toBe(3);
    });
  });
  describe('set routes => stop', () => {
    it('should return 201', async () => {
      const res = await request(app)
        .post('/api/route/H66')
        .send({
          stopCodes: ['B2', 'D5'],
        });
      expect(res.statusCode).toBe(201);
    });
    it('should connect to 2 routes', async () => {
      const res = await request(app).get('/api/stop/B2');
      expect(res.statusCode).toBe(200);
      expect(res.body.routes.length).toBe(2);
    });
  });
});
