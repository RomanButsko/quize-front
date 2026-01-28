import { queryOptions } from '@tanstack/react-query';
import { apiClient, API_ROUTES } from '@/shared/api';
import { quizKeys } from '../model/quiz-keys';
import type { QuizItemDto } from '../model/types';
import { mapQuizDtoToModel } from '../model/mappers-dto';

export const getQuizByIdQuery = (id: string) =>
  queryOptions({
    queryKey: quizKeys.detail(id),
    queryFn: async () => {
      const data = await apiClient.get<QuizItemDto>(API_ROUTES.quizzes.byId(id));

      if (!data) {
        throw new Error(`Quiz with id ${id} not found`);
      }

      return mapQuizDtoToModel(data);
    },
    enabled: !!id,
  });
