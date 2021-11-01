import request from 'supertest';
import app from '../app';
import { connectToTestDB, disconnectToTestDB } from '../database/test-db';

beforeAll(async () => {
  await connectToTestDB();
});

afterAll(async () => {
  await disconnectToTestDB();
});

describe('Bus CRUD', () => {
  describe('GET', () => {
    it('should return an array', async () => {
      const res = await request(app).get('/api/bus');
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(0);
    });
  });
  describe('POST', () => {
    it('should return a new created bus', async () => {
      const newBus = await request(app).post('/api/bus').send({
        registration: 'ABC-123',
      });
      expect(newBus.statusCode).toBe(201);
      expect(newBus.body).toHaveProperty('registration');
      expect(newBus.body.registration).toBe('ABC-123');

      const buses = await request(app).get('/api/bus');
      expect(buses.body.length).toBe(1);
    });
  });
  describe('DELETE', () => {
    it('should return an empty object', async () => {
      const newBus = await request(app).post('/api/bus').send({
        registration: 'ABC-111',
      });
      const deletedBus = await request(app).delete(
        `/api/bus/${newBus.body._id}`
      );
      expect(deletedBus.statusCode).toBe(204);
      expect(deletedBus.body).toStrictEqual({});

      const buses = await request(app).get('/api/bus');
      expect(buses.body.length).toBe(1);
    });
  });
});
