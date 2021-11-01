import request from 'supertest';
import app from '../app';
import { connectToTestDB, disconnectToTestDB } from '../database/test-db';

beforeAll(async () => {
  await connectToTestDB();
});

afterAll(async () => {
  await disconnectToTestDB();
});

describe('Line CRUD', () => {
  describe('GET', () => {
    it('should return an array', async () => {
      const res = await request(app).get('/api/line');
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(0);
    });
  });
  describe('POST', () => {
    it('should return a new created Line', async () => {
      const newLine = await request(app).post('/api/line').send({
        lineName: 'LINE123',
      });
      expect(newLine.statusCode).toBe(201);
      expect(newLine.body).toHaveProperty('lineName');
      expect(newLine.body.lineName).toBe('LINE123');

      const lines = await request(app).get('/api/line');
      expect(lines.body.length).toBe(1);
    });
  });
  describe('DELETE', () => {
    it('should return an empty object', async () => {
      const newLine = await request(app).post('/api/line').send({
        lineName: 'LINE456',
      });
      const deletedLine = await request(app).delete(
        `/api/line/${newLine.body.lineName}`
      );
      expect(deletedLine.statusCode).toBe(204);
      expect(deletedLine.body).toStrictEqual({});

      const lines = await request(app).get('/api/line');
      expect(lines.body.length).toBe(1);
    });
  });
});
