import request from 'supertest';
import app from '../app';
import { connectToTestDB, disconnectToTestDB } from '../database/test-db';

beforeAll(async () => {
  await connectToTestDB();
});

afterAll(async () => {
  await disconnectToTestDB();
});

describe('Route CRUD', () => {
  describe('GET', () => {
    it('should return an array', async () => {
      const res = await request(app).get('/api/route');
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(0);
    });
  });
  describe('POST', () => {
    it('should return a new created route', async () => {
      const newRoute = await request(app).post('/api/route').send({
        name: 'M45',
      });
      expect(newRoute.statusCode).toBe(201);
      expect(newRoute.body).toHaveProperty('name');
      expect(newRoute.body.name).toBe('M45');

      const routes = await request(app).get('/api/route');
      expect(routes.body.length).toBe(1);
    });
  });
  describe('DELETE', () => {
    it('should return an empty object', async () => {
      const newRoute = await request(app).post('/api/route').send({
        name: 'G60',
      });
      const deletedRoute = await request(app).delete(
        `/api/route/${newRoute.body.name}`
      );
      expect(deletedRoute.statusCode).toBe(204);
      expect(deletedRoute.body).toStrictEqual({});

      const routes = await request(app).get('/api/route');
      expect(routes.body.length).toBe(1);
    });
  });
});
