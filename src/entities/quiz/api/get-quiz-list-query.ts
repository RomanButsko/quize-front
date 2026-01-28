import { queryOptions } from '@tanstack/react-query';
import { apiClient, API_ROUTES } from '@/shared/api';
import { quizKeys } from '../model/quiz-keys';
import type { QuizListItemDto } from '../model/types';
import { mapQuizListDtoToModel } from '../model/mappers-dto';

export const getQuizListQuery = () =>
  queryOptions({
    queryKey: quizKeys.all,
    queryFn: async () => {
      const data = await apiClient.get<QuizListItemDto[]>(API_ROUTES.quizzes.all());

      if (!data) {
        throw new Error('Failed to fetch quiz list');
      }

      return mapQuizListDtoToModel(data);
    },
  });
