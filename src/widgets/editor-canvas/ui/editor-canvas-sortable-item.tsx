import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { useSortableBlock } from '@/features/quiz-editor';
import { sx } from '@/shared/lib';

const styles = sx({
  block: {
    border: 1,
    borderColor: 'divider',
    borderRadius: 2,
    p: 2,
    cursor: 'pointer',
  },
  blockSelected: {
    borderColor: 'primary.main',
    boxShadow: 2,
  },
  blockDragging: {
    opacity: 0.5,
  },
});

type EditorCanvasSortableItemProps = {
  id: string;
  selected: boolean;
  onSelect: (id: string) => void;
  children: ReactNode;
  disabled?: boolean;
};

export const EditorCanvasSortableItem = ({
  id,
  selected,
  onSelect,
  children,
  disabled,
}: EditorCanvasSortableItemProps) => {
  const { attributes, listeners, setNodeRef, style, isDragging } = useSortableBlock(id, { disabled });

  return (
    <Box
      ref={setNodeRef}
      style={style}
      sx={[styles.block, selected && styles.blockSelected, isDragging && styles.blockDragging]}
      onClick={() => onSelect(id)}
      {...attributes}
      {...listeners}
    >
      {children}
    </Box>
  );
};
