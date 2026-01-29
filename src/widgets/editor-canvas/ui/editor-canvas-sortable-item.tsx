import { MouseEvent, memo } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Box, IconButton, Stack } from '@mui/material';
import { useSortableBlock } from '@/features/quiz-editor';
import { renderQuizBlock } from '@/entities/quiz-block/lib';
import type { QuizBlock } from '@/entities/quiz-block/model/types';
import { sx } from '@/shared/lib';

const styles = sx({
  block: {
    minHeight: '54px',
    position: 'relative',
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
  controls: {
    position: 'absolute',
    top: 8,
    right: 8,
    alignItems: 'center',
  },
  dragHandle: {
    cursor: 'grab',
  },
});

type EditorCanvasSortableItemProps = {
  id: string;
  selected: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  block: QuizBlock;
  draft: QuizBlock | null;
  disabled?: boolean;
};

export const EditorCanvasSortableItem = memo(function EditorCanvasSortableItem({
  id,
  selected,
  onSelect,
  onDelete,
  block,
  draft,
  disabled,
}: EditorCanvasSortableItemProps) {
  const { attributes, listeners, setNodeRef, style, isDragging } = useSortableBlock(id, { disabled });
  const renderedBlock = draft ?? block;

  const handleDeleteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDelete(id);
  };

  const handleDeletePointerDown = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  const handleDragPointerDown = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      sx={[styles.block, selected && styles.blockSelected, isDragging && styles.blockDragging]}
      onClick={() => onSelect(id)}
    >
      <Stack
        direction='row'
        spacing={0.5}
        sx={styles.controls}
      >
        <IconButton
          size='small'
          sx={styles.dragHandle}
          onPointerDown={handleDragPointerDown}
          {...attributes}
          {...listeners}
        >
          <DragIndicatorIcon fontSize='small' />
        </IconButton>
        <IconButton
          size='small'
          onClick={handleDeleteClick}
          onPointerDown={handleDeletePointerDown}
        >
          <DeleteOutlineIcon fontSize='small' />
        </IconButton>
      </Stack>
      {renderQuizBlock(renderedBlock)}
    </Box>
  );
});
