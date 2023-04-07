const request = require('supertest');
const app = require('./api');

describe('GET /api/orders', () => {
  test('It should return a list of orders', async () => {
    const response = await request(app).get('/api/orders');
    expect(response.statusCode).toBe(200);
    // expect(response.body.length).toBeGreaterThan(0);
  }, 3000);
});

// describe('Test the API routes', () => {

  // describe('GET /api/users', () => {
  //   test('It should return a list of users', async () => {
  //     const response = await request(app).get('/api/users');
  //     expect(response.statusCode).toBe(200);
  //     // expect(response.body.length).toBeGreaterThan(0);
  //   });
  // });

  // describe('POST /api/users', () => {
  //   test('It should create a new user', async () => {
  //     const user = {
  //       email: 'test@example.com',
  //       password: 'testpassword',
  //       type: 'customer'
  //     };
  //     const response = await request(app)
  //       .post('/api/users')
  //       .send(user);
  //     expect(response.statusCode).toBe(201);
  //     expect(response.body.email).toBe(user.email);
  //   });
  // });

  // describe('GET /api/billboards', () => {
  //   test('It should return a list of billboards', async () => {
  //     const response = await request(app).get('/api/billboards');
  //     expect(response.statusCode).toBe(200);
  //     expect(response.body.length).toBeGreaterThan(0);
  //   });
  // });

  // describe('POST /api/billboards', () => {
  //   test('It should create a new billboard', async () => {
  //     const billboard = {
  //       costPerDay: 100,
  //       type: '1-sided',
  //       material: 'digital'
  //     };
  //     const response = await request(app)
  //       .post('/api/billboards')
  //       .send(billboard);
  //     expect(response.statusCode).toBe(201);
  //     expect(response.body.type).toBe(billboard.type);
  //   });
  // });



  // describe('POST /api/orders', () => {
  //   test('It should create a new order', async () => {
  //     const order = {
  //       billboard_id: 1,
  //       start_date: '2023-04-01',
  //       end_date: '2023-04-30',
  //       status_id: 1,
  //       user_id: 1,
  //       city_id: 1
  //     };
  //     const response = await request(app)
  //       .post('/api/orders')
  //       .send(order);
  //     expect(response.statusCode).toBe(201);
  //     expect(response.body.start_date).toBe(order.start_date);
  //   });
  // });

// });


// const request = require('supertest');const express = require('express');
// const bodyParser = require('body-parser');const api = require('./api');
// const app = express();
// app.use(bodyParser.json());app.use('/api', api);
// describe('Test the register route', () => {
//   test('It should respond with 201 status code', async () => {    const response = await request(app)
//       .post('/api/register')      .send({
//         email: 'test@example.com',        password: 'password',
//         type: 'customer'      });
//     expect(response.statusCode).toBe(201);  });
// });
// describe('Test the login route', () => {  test('It should respond with 200 status code', async () => {
//     const response = await request(app)      .post('/api/login')
//       .send({        email: 'test@example.com',
//         password: 'password'      });
//     expect(response.statusCode).toBe(200);  });
//   test('It should respond with 401 status code for invalid credentials', async () => {
//     const response = await request(app)      .post('/api/login')
//       .send({        email: 'test@example.com',
//         password: 'wrongpassword'      });
//     expect(response.statusCode).toBe(401);  });
// });
// describe('Test the get billboard by ID route', () => {  test('It should respond with 200 status code and the billboard', async () => {
//     const response = await request(app)      .get('/api/billboard/1');
//     expect(response.statusCode).toBe(200);    expect(response.body).toHaveProperty('id');
//   });
//   test('It should respond with 404 status code for non-existent billboard', async () => {    const response = await request(app)
//       .get('/api/billboard/100');    expect(response.statusCode).toBe(404);
//   });});
// describe('Test the create order route', () => {
//   test('It should respond with 201 status code', async () => {    const response = await request(app)
//       .post('/api/order')      .send({
//         billboardId: 1,        startDate: '2023-04-10',
//         endDate: '2023-04-20',        statusId: 1,
//         userId: 1,        cityId: 1
//       });    expect(response.statusCode).toBe(201);
//   });});