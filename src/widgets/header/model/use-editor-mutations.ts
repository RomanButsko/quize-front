'use client';

import { useRouter } from 'next/navigation';
import { useCreateQuizMutation } from '@/entities/quiz/api/create-quiz-mutation';
import { useUpdateQuizMutation } from '@/entities/quiz/api/update-quiz-mutation';
import { usePublishQuizMutation } from '@/entities/quiz/api/publish-quiz-mutation';
import { paths } from '@/shared/config';
import { useEditorActionsState } from './use-editor-actions-state';

export const useEditorMutations = () => {
  const router = useRouter();

  const { quizId, title, blocks, updateQuizInfo } = useEditorActionsState();

  const createQuizMutation = useCreateQuizMutation();
  const updateQuizMutation = useUpdateQuizMutation();
  const publishQuizMutation = usePublishQuizMutation();

  const isSaving = createQuizMutation.isPending || updateQuizMutation.isPending;
  const isPublishing = publishQuizMutation.isPending;

  const handleSave = () => {
    if (quizId) {
      updateQuizMutation.mutate({ id: quizId, title, blocks });
    } else {
      createQuizMutation.mutate(
        { title, blocks },
        {
          onSuccess: (createdQuiz) => {
            updateQuizInfo(createdQuiz.id, createdQuiz.title);
          },
        }
      );
    }
  };

  const handlePublish = () => {
    if (!quizId) return;

    publishQuizMutation.mutate(
      { id: quizId },
      {
        onSuccess: () => {
          router.push(paths.dashboard);
        },
      }
    );
  };

  return {
    isSaving,
    isPublishing,
    handleSave,
    handlePublish,
  };
};
