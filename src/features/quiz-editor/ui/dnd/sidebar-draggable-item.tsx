'use client';

import { Box, Typography } from '@mui/material';
import { useSidebarDraggable } from '@/features/quiz-editor/lib/dnd/use-sidebar-draggable';
import { sx } from '@/shared/lib';
import { useMobile } from '@/shared/providers';
import { addBlock } from '@/shared/store';
import { useAppDispatch } from '@/shared/store/hooks';
import { blockFactories } from '../../model/block-factories';

type SidebarDraggableItemProps = {
  factoryId: string;
  label: string;
  required?: boolean;
};

const styles = sx({
  item: {
    px: 1.5,
    py: 1,
    borderRadius: 1,
    border: 1,
    borderColor: 'divider',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'border-color 0.2s ease',
    '&:hover': {
      borderColor: 'primary.main',
    },
  },
  itemDesktop: {
    cursor: 'grab',
  },
  itemDragging: {
    opacity: 0.6,
  },
});

export const SidebarDraggableItem = ({ factoryId, label, required }: SidebarDraggableItemProps) => {
  const { isMobile } = useMobile();

  const dispatch = useAppDispatch();

  const { attributes, listeners, setNodeRef, isDragging } = useSidebarDraggable(factoryId);

  const handleAddBlock = () => {
    const factory = blockFactories.find((f) => f.id === factoryId);
    if (factory) {
      dispatch(addBlock(factory.create()));
    }
  };

  return (
    <Box
      ref={setNodeRef}
      sx={[styles.item, !isMobile && styles.itemDesktop, isDragging && styles.itemDragging]}
      onClick={isMobile ? handleAddBlock : undefined}
      onDoubleClick={!isMobile ? handleAddBlock : undefined}
      {...(!isMobile && attributes)}
      {...(!isMobile && listeners)}
    >
      <Typography variant='body2'>
        {label}{' '}
        {required && (
          <Typography
            variant='caption'
            color='error'
          >
            (required)
          </Typography>
        )}
      </Typography>
    </Box>
  );
};
