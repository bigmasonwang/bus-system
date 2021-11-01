import request from 'supertest';
import app from '../app';
import { connectToTestDB, disconnectToTestDB } from '../database/test-db';

beforeAll(async () => {
  await connectToTestDB();
  await request(app).post('/api/line').send({ lineName: 'L345' });
  await request(app).post('/api/bus').send({
    registration: 'ABC-987',
  });
});

afterAll(async () => {
  await disconnectToTestDB();
});

describe('Set up line to bus', () => {
  it('should return 201', async () => {
    const res = await request(app).post('/api/bus/ABC-987').send({
      lineName: 'L345',
      start: '1635768241176',
    });
    expect(res.statusCode).toBe(201);
  });
});
