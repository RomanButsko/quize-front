import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, API_ROUTES } from '@/shared/api';
import { showSuccessToast, showErrorToast, getErrorMessage } from '@/shared/lib';
import { quizKeys } from '../model/quiz-keys';
import type { UnpublishQuizPayload, Quiz } from '../model/types';

export const useUnpublishQuizMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: UnpublishQuizPayload) => {
      const data = await apiClient.post<Quiz>(API_ROUTES.quizzes.unpublish(id));

      if (!data) {
        throw new Error('Failed to unpublish quiz');
      }

      return data;
    },
    onSuccess: (unpublishedQuiz) => {
      queryClient.setQueryData(quizKeys.detail(unpublishedQuiz.id), unpublishedQuiz);
      queryClient.invalidateQueries({ queryKey: quizKeys.all });
      showSuccessToast('Quiz unpublished successfully');
    },
    onError: (error) => {
      showErrorToast(getErrorMessage(error));
    },
  });
};
