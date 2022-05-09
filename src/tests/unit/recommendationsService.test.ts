import { jest } from '@jest/globals';

import { recommendationRepository } from '../../repositories/recommendationRepository';
import { recommendationService } from '../../services/recommendationsService';

import recommendationBodyFactory from '../integration/factories/recommendationBodyFactory.js';

describe('Recommendation service unit tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should create recommendation', async () => {
    const recommendationData = recommendationBodyFactory();
    const recommendationRepositoryInsert = jest
      .spyOn(recommendationRepository, 'create')
      .mockResolvedValue(null);

    await recommendationService.insert(recommendationData);
    expect(recommendationRepositoryInsert).toBeCalledTimes(1);
    expect(recommendationRepositoryInsert).toBeCalledWith(recommendationData);
  });

  it('should update score (upvote)', () => {})
  it('should update score (downvote)', () => {})
  it('should delete recommendation if score is lower than -5', () => {})

});
