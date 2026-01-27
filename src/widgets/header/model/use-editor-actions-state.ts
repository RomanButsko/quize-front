'use client';

import { setQuizTitle } from '@/shared/store';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';

export const useEditorActionsState = () => {
  const dispatch = useAppDispatch();

  const title = useAppSelector((state) => state.editor.title);
  const blocksCount = useAppSelector((state) => state.editor.blocks.length);

  const updateTitle = (title: string) => {
    dispatch(setQuizTitle(title));
  };

  const hasTitle = title.trim().length > 0;
  const hasBlocks = blocksCount > 0;

  return {
    title,
    isSaveDisabled: !hasTitle || !hasBlocks,
    isPublishDisabled: !hasTitle || !hasBlocks,
    updateTitle,
  };
};
