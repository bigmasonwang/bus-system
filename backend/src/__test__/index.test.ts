import request from 'supertest';
import app from '../app';

// describe('Post Endpoints', () => {
//   it('should create a new post', async () => {
//     const res = await request(app).post('/api/posts').send({
//       userId: 1,
//       title: 'test is cool',
//     });
//     expect(res.statusCode).toEqual(201);
//     expect(res.body).toHaveProperty('post');
//   });
// });

describe('Get API Endpoints', () => {
  it('should receive API working', async () => {
    const res = await request(app).get('/api');
    expect(res.statusCode).toBe(200);
  });
});
