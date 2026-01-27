'use client';

import { useMemo } from 'react';
import { PLACEHOLDER_BLOCK_ID } from '@/features/quiz-editor/lib/dnd/constants';
import type { QuizBlock } from '@/entities/quiz-block/model/types';
import { useEditorDndState } from './editor-dnd-context';

export type CanvasRenderItem =
  | { id: string; block: QuizBlock; isPlaceholder: false }
  | { id: string; block: null; isPlaceholder: true };

export const useCanvasRenderList = (blocks: QuizBlock[]) => {
  const { activeSource, placeholderIndex } = useEditorDndState();

  const items = useMemo<CanvasRenderItem[]>(() => {
    const base = blocks.map<CanvasRenderItem>((block) => ({
      id: block.id,
      block,
      isPlaceholder: false,
    }));

    if (activeSource !== 'sidebar' || placeholderIndex === null) {
      return base;
    }

    const insertIndex = Math.min(base.length, Math.max(0, placeholderIndex));

    return [
      ...base.slice(0, insertIndex),
      { id: PLACEHOLDER_BLOCK_ID, block: null, isPlaceholder: true },
      ...base.slice(insertIndex),
    ];
  }, [blocks, activeSource, placeholderIndex]);

  return items;
};
