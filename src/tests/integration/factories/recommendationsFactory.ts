import {Request, Response} from 'express'

import { prisma } from '../../../database';
import faker from '@faker-js/faker';
import recommendationBodyFactory from './recommendationBodyFactory';

export default async function recommendationsFactory() {
  await prisma.recommendation.createMany({
    data: [
      {
        name: faker.lorem.words(3),
        youtubeLink: 'https://www.youtube.com/watch?v=Yw6u6YkTgQ4',
        score: faker.datatype.number(1000),
      },
      {
        name: faker.lorem.words(3),
        youtubeLink: 'https://www.youtube.com/watch?v=Yw6u6YkTgQ4',
        score: faker.datatype.number(1000),
      },
      {
        name: faker.lorem.words(3),
        youtubeLink: 'https://www.youtube.com/watch?v=Yw6u6YkTgQ4',
        score: faker.datatype.number(1000),
      },
      {
        name: faker.lorem.words(3),
        youtubeLink: 'https://www.youtube.com/watch?v=Yw6u6YkTgQ4',
        score: faker.datatype.number(1000),
      },
      {
        name: faker.lorem.words(3),
        youtubeLink: 'https://www.youtube.com/watch?v=Yw6u6YkTgQ4',
        score: faker.datatype.number(1000),
      },
      {
        name: faker.lorem.words(3),
        youtubeLink: 'https://www.youtube.com/watch?v=Yw6u6YkTgQ4',
        score: faker.datatype.number(1000),
      },
      {
        name: faker.lorem.words(3),
        youtubeLink: 'https://www.youtube.com/watch?v=Yw6u6YkTgQ4',
        score: faker.datatype.number(1000),
      },
      {
        name: faker.lorem.words(3),
        youtubeLink: 'https://www.youtube.com/watch?v=Yw6u6YkTgQ4',
        score: faker.datatype.number(1000),
      },
      {
        name: faker.lorem.words(3),
        youtubeLink: 'https://www.youtube.com/watch?v=Yw6u6YkTgQ4',
        score: faker.datatype.number(1000),
      },
      {
        name: faker.lorem.words(3),
        youtubeLink: 'https://www.youtube.com/watch?v=Yw6u6YkTgQ4',
        score: faker.datatype.number(1000),
      },
      {
        name: faker.lorem.words(3),
        youtubeLink: 'https://www.youtube.com/watch?v=Yw6u6YkTgQ4',
        score: faker.datatype.number(1000),
      },
      {
        name: faker.lorem.words(3),
        youtubeLink: 'https://www.youtube.com/watch?v=Yw6u6YkTgQ4',
        score: faker.datatype.number(1000),
      },
    ],
    //skipDuplicates: true
  });
}
