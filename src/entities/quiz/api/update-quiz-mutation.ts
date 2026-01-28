import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, API_ROUTES } from '@/shared/api';
import { quizKeys } from '../model/quiz-keys';
import type { Quiz, UpdateQuizPayload } from '../model/types';

export const useUpdateQuizMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...payload }: UpdateQuizPayload) => {
      const data = await apiClient.put<Quiz>(API_ROUTES.quizzes.update(id), payload);

      if (!data) {
        throw new Error('Failed to update quiz');
      }

      return data;
    },
    onSuccess: (updatedQuiz) => {
      queryClient.setQueryData(quizKeys.detail(updatedQuiz.id), updatedQuiz);
    },
  });
};
