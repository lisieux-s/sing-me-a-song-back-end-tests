import faker from '@faker-js/faker';
import supertest from 'supertest';
import app from '../../app';

import { prisma } from '../../database';
import { CreateRecommendationData } from '../../services/recommendationsService';
import recommendationBodyFactory from './factories/recommendationBodyFactory';
import recommendationsFactory from './factories/recommendationsFactory';

const agent = supertest(app);

describe('Recommendation tests - POST /', () => {
  beforeEach(truncateRecommendations);
  afterAll(disconnect);

  it('should return status 422 if body is invalid', async () => {
    const body = {};
    const res = await agent.post('/recommendations').send(body);
    expect(res.status).toEqual(422);
  });

  it('should return status 409 if there is an entry with that name already', async () => {
    const body = recommendationBodyFactory();
    await agent.post('/recommendations').send(body);
    const res = await agent.post('/recommendations').send(body);
    expect(res.status).toEqual(409);
  });

  it('should return status 201 given a valid body', async () => {
    const body = recommendationBodyFactory();
    const res = await agent.post('/recommendations').send(body);
    const recommendation = await prisma.recommendation.findUnique({
      where: {
        name: body.name,
      },
    });
    expect(res.status).toEqual(201);
    expect(recommendation).not.toBeNull();
  });
});

describe('Recommendation tests - GET /recommendations', () => {
  beforeEach(truncateRecommendations);
  afterAll(disconnect);

  it('should return no data if there is none', async () => {
    const recommendations = await prisma.recommendation.findMany();

    expect(recommendations).toEqual([]);
  });

  it('should return data if there is any', async () => {
    await agent.post('recommendations').send(recommendationBodyFactory());
    const recommendations = await prisma.recommendation.findMany();

    expect(recommendations).not.toBeNull();
  });
});

describe('Recommendation tests - GET /random', () => {
  beforeEach(truncateRecommendations);
  afterAll(disconnect);

  it('should return a recommendation', async () => {
    const body = recommendationBodyFactory();
    await agent.post('/recommendations').send(body);
    const res = await agent.get('/recommendations/random');

    expect(res.status).toBe(200);
  });
});

describe('Recommendation tests - GET /top/:amount', () => {
  beforeEach(truncateRecommendations);
  afterAll(disconnect);

  it('should return a given recommendations ordered by score', async () => {
    let i = 0;
    while (i < 10) {
      await agent.post('/recommendations').send(recommendationBodyFactory());
      i++;
    }
    const amount = faker.datatype.number(10);
    const res = await agent.get(`/recommendations/top/${amount + 1}`);

    expect(res.body.length).toEqual(amount + 1);
    expect(res.body[0].score).toBeGreaterThanOrEqual(
      res.body[faker.datatype.number(10)].score
    );
    expect(res.status).toEqual(200);
  });
});

describe('Recommendation tests - GET /:id', () => {
  beforeEach(truncateRecommendations);
  afterAll(disconnect);

  it('should return recommendation with given id', async () => {
    let i = 0;
    while (i < 10) {
      await agent.post('/recommendations').send(recommendationBodyFactory());
      i++;
    }
    const res = await agent.get(
      `/recommendations/${faker.datatype.number(10)}`
    );

    expect(res).not.toBe([]);
  });
});

describe('Recommendation tests - POST /:id/upvote', () => {
  beforeEach(truncateRecommendations);
  afterAll(disconnect);

  it('should increase recommendation score', async () => {
    const body = recommendationBodyFactory();
    await agent.post('/recommendations').send(body);

    const previousQuery = await prisma.recommendation.findUnique({
        where: {
            id: 1
        }
    });
    await agent.post('/recommendations/1/upvote').send()

    const currentQuery = await prisma.recommendation.findUnique({
        where: {
            id: 1
        }
    })

    expect(currentQuery.score).toBeGreaterThan(previousQuery.score)

  });
});

describe('Recommendation tests - POST /:id/downvote', () => {
    beforeEach(truncateRecommendations);
  afterAll(disconnect);

  it('should increase recommendation score', async () => {
    const body = recommendationBodyFactory();
    await agent.post('/recommendations').send(body);

    const previousQuery = await prisma.recommendation.findUnique({
        where: {
            id: 1
        }
    });
    await agent.post('/recommendations/1/downvote').send()

    const currentQuery = await prisma.recommendation.findUnique({
        where: {
            id: 1
        }
    })

    expect(currentQuery.score).not.toBeGreaterThan(previousQuery.score)

  });
});

async function disconnect() {
  await prisma.$disconnect();
}

async function truncateRecommendations() {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
}
