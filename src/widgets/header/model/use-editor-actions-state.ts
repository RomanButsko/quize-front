'use client';

import { setQuizInfo, setQuizTitle } from '@/shared/store';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';

export const useEditorActionsState = () => {
  const dispatch = useAppDispatch();

  const quizId = useAppSelector((state) => state.editor.quizId);
  const title = useAppSelector((state) => state.editor.title);
  const blocks = useAppSelector((state) => state.editor.blocks);
  const published = useAppSelector((state) => state.editor.published);

  const updateTitle = (newTitle: string) => {
    dispatch(setQuizTitle(newTitle));
  };

  const updateQuizInfo = (id: string, newTitle: string) => {
    dispatch(setQuizInfo({ id, title: newTitle }));
  };

  const hasTitle = title.trim().length > 0;
  const hasBlocks = blocks.length > 0;
  const isButtonPresent = blocks.some((block) => block.type === 'button');

  const isSaveDisabled = !hasTitle || !hasBlocks || !isButtonPresent;
  const isPublishDisabled = !quizId || isSaveDisabled;

  return {
    quizId,
    title,
    blocks,
    published,
    hasTitle,
    isButtonPresent,
    isSaveDisabled,
    isPublishDisabled,
    updateTitle,
    updateQuizInfo,
  };
};
