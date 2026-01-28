import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, API_ROUTES } from '@/shared/api';
import { quizKeys } from '../model/quiz-keys';
import type { PublishQuizPayload, Quiz } from '../model/types';

export const usePublishQuizMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: PublishQuizPayload) => {
      const data = await apiClient.post<Quiz>(API_ROUTES.quizzes.publish(id));

      if (!data) {
        throw new Error('Failed to publish quiz');
      }

      return data;
    },
    onSuccess: (publishedQuiz) => {
      queryClient.setQueryData(quizKeys.detail(publishedQuiz.id), publishedQuiz);
      queryClient.invalidateQueries({ queryKey: quizKeys.all });
    },
  });
};
