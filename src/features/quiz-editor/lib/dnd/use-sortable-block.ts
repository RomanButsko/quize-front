'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type SortableBlockOptions = {
  disabled?: boolean;
};

export const useSortableBlock = (id: string, options?: SortableBlockOptions) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    disabled: options?.disabled,
    data: {
      source: 'canvas',
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return {
    attributes,
    listeners,
    setNodeRef,
    style,
    isDragging,
  };
};
