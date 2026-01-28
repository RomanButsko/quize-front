'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getQuizByIdQuery } from '@/entities/quiz';
import { useAppDispatch } from '@/shared/store/hooks';
import { initializeEditor, resetEditor } from '@/shared/store';

type UseInitializeEditorParams = {
  quizId?: string;
};

export const useInitializeEditor = ({ quizId }: UseInitializeEditorParams) => {
  const dispatch = useAppDispatch();

  const {
    data: quiz,
    isLoading,
    isError,
    error,
  } = useQuery({
    ...getQuizByIdQuery(quizId ?? ''),
    enabled: !!quizId,
  });

  useEffect(() => {
    if (quiz) {
      dispatch(
        initializeEditor({
          quizId: quiz.id,
          title: quiz.title,
          blocks: quiz.blocks,
          published: quiz.published,
        })
      );
    }
  }, [quiz, dispatch]);

  useEffect(() => {
    if (!quizId) {
      dispatch(resetEditor());
    }

    return () => {
      dispatch(resetEditor());
    };
  }, [quizId, dispatch]);

  return {
    isLoading: !!quizId && isLoading,
    isError,
    error,
    isNewQuiz: !quizId,
  };
};
