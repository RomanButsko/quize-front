'use client';

import { setQuizTitle } from '@/shared/store';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';

export const useEditorActionsState = () => {
  const dispatch = useAppDispatch();

  const title = useAppSelector((state) => state.editor.title);
  const blocks = useAppSelector((state) => state.editor.blocks);

  const updateTitle = (title: string) => {
    dispatch(setQuizTitle(title));
  };

  const hasTitle = title.trim().length > 0;
  const hasBlocks = blocks.length > 0;
  const isButtonPresent = blocks.some((block) => block.type === 'button');

  return {
    title,
    isSaveDisabled: !hasTitle || !hasBlocks || !isButtonPresent,
    isPublishDisabled: !hasTitle || !hasBlocks || !isButtonPresent,
    updateTitle,
  };
};
