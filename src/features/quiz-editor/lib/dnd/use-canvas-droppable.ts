'use client';

import { useDroppable } from '@dnd-kit/core';
import { CANVAS_DROPPABLE_ID } from './constants';

export const useCanvasDroppable = () => {
  const { setNodeRef, isOver } = useDroppable({
    id: CANVAS_DROPPABLE_ID,
  });

  return {
    setNodeRef,
    isOver,
  };
};
