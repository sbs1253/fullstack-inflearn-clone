import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('Test endpoints', () => {
    it('/test (POST) should create a test', () => {
      return request(app.getHttpServer())
        .post('/test')
        .send({ id: 'test-e2e-123' })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.id).toBe('test-e2e-123');
        });
    });

    it('/test (GET) should return all tests', async () => {
      // First create a test
      await request(app.getHttpServer())
        .post('/test')
        .send({ id: 'test-get-all' });

      return request(app.getHttpServer())
        .get('/test')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
        });
    });

    it('/test/:id (GET) should return a specific test', async () => {
      const testId = 'test-get-specific';
      
      // First create a test
      await request(app.getHttpServer())
        .post('/test')
        .send({ id: testId });

      return request(app.getHttpServer())
        .get(`/test/${testId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.id).toBe(testId);
        });
    });

    it('/test/:id (DELETE) should delete a test', async () => {
      const testId = 'test-delete';
      
      // First create a test
      await request(app.getHttpServer())
        .post('/test')
        .send({ id: testId });

      return request(app.getHttpServer())
        .delete(`/test/${testId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.id).toBe(testId);
        });
    });

    it('should handle full CRUD cycle', async () => {
      const testId = 'test-crud-cycle';

      // Create
      await request(app.getHttpServer())
        .post('/test')
        .send({ id: testId })
        .expect(201);

      // Read
      await request(app.getHttpServer())
        .get(`/test/${testId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(testId);
        });

      // Delete
      await request(app.getHttpServer())
        .delete(`/test/${testId}`)
        .expect(200);

      // Verify deletion (should return 404)
      await request(app.getHttpServer())
        .get(`/test/${testId}`)
        .expect(404);
    });
  });
});
