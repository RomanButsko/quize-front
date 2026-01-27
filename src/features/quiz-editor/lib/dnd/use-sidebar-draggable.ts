'use client';

import { useDraggable } from '@dnd-kit/core';

export const useSidebarDraggable = (factoryId: string) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `sidebar-${factoryId}`,
    data: {
      source: 'sidebar',
      factoryId,
    },
  });

  return {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
  };
};
