import request from 'supertest';
import app from '../app';
import { connectToTestDB, disconnectToTestDB } from '../database/test-db';

beforeAll(async () => {
  await connectToTestDB();
});

afterAll(async () => {
  await disconnectToTestDB();
});

describe('Stop CRUD', () => {
  describe('GET', () => {
    it('should return an array', async () => {
      const res = await request(app).get('/api/stop');
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(0);
    });
  });
  describe('POST', () => {
    it('should return a new created Stop', async () => {
      const newStop = await request(app).post('/api/stop').send({
        code: 'A3',
      });
      expect(newStop.statusCode).toBe(201);
      expect(newStop.body).toHaveProperty('code');
      expect(newStop.body.code).toBe('A3');

      const Stopes = await request(app).get('/api/stop');
      expect(Stopes.body.length).toBe(1);
    });
  });
  describe('DELETE', () => {
    it('should return an empty object', async () => {
      const newStop = await request(app).post('/api/stop').send({
        code: 'B7',
      });
      const deletedStop = await request(app).delete(
        `/api/stop/${newStop.body.code}`
      );
      expect(deletedStop.statusCode).toBe(204);
      expect(deletedStop.body).toStrictEqual({});

      const Stops = await request(app).get('/api/stop');
      expect(Stops.body.length).toBe(1);
    });
  });
});
