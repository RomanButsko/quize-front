'use client';

import { Box, Typography } from '@mui/material';
import { useSidebarDraggable } from '@/features/quiz-editor/lib/dnd/use-sidebar-draggable';
import { sx } from '@/shared/lib';

type SidebarDraggableItemProps = {
  factoryId: string;
  label: string;
};

const styles = sx({
  item: {
    px: 1.5,
    py: 1,
    borderRadius: 1,
    border: 1,
    borderColor: 'divider',
    cursor: 'grab',
    userSelect: 'none',
    transition: 'border-color 0.2s ease',
    '&:hover': {
      borderColor: 'primary.main',
    },
  },
  itemDragging: {
    opacity: 0.6,
  },
});

export const SidebarDraggableItem = ({ factoryId, label }: SidebarDraggableItemProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useSidebarDraggable(factoryId);

  return (
    <Box
      ref={setNodeRef}
      sx={[styles.item, isDragging && styles.itemDragging]}
      {...attributes}
      {...listeners}
    >
      <Typography variant='body2'>{label}</Typography>
    </Box>
  );
};
