import { faker } from '@faker-js/faker';
import { CreateRecommendationData } from '../../../services/recommendationsService';

export default function recommendationBodyFactory() {
  return {
    name: faker.lorem.words(10),
    youtubeLink: 'https://www.youtube.com/watch?v=Yw6u6YkTgQ4',
  };
}
