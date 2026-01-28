import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, API_ROUTES } from '@/shared/api';
import { quizKeys } from '../model/quiz-keys';
import type { CreateQuizPayload, Quiz } from '../model/types';

export const useCreateQuizMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateQuizPayload) => {
      const data = await apiClient.post<Quiz>(API_ROUTES.quizzes.create(), payload);

      if (!data) {
        throw new Error('Failed to create quiz');
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: quizKeys.all });
    },
  });
};
