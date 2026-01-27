'use client';

import { Box, Paper } from '@mui/material';
import { useCanvasDroppable, useCanvasRenderList } from '@/features/quiz-editor';
import { renderQuizBlock } from '@/entities/quiz-block/lib';
import { sx } from '@/shared/lib';
import { useEditorCanvas } from '../model/use-editor-canvas';
import { EditorCanvasSortableItem } from './editor-canvas-sortable-item';
import { EmptyEditorCanvas } from './empty-editor-canvas';

const styles = sx({
  panel: {
    p: 3,
    height: '100%',
    border: '1px dashed',
    borderColor: 'divider',
    borderRadius: 2,
  },
  blocks: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  placeholder: {
    border: '1px dashed',
    borderColor: 'primary.main',
    borderRadius: 2,
    minHeight: 72,
  },
});

export const EditorCanvas = () => {
  const { blocks, selectedBlockId, isEmpty, handleSelect } = useEditorCanvas();

  const { setNodeRef } = useCanvasDroppable();

  const renderItems = useCanvasRenderList(blocks);

  return (
    <Paper
      elevation={0}
      sx={styles.panel}
      ref={setNodeRef}
    >
      {isEmpty ? (
        <EmptyEditorCanvas />
      ) : (
        <Box sx={styles.blocks}>
          {renderItems.map((item) =>
            item.isPlaceholder ? (
              <Box
                key={item.id}
                sx={styles.placeholder}
              />
            ) : (
              <EditorCanvasSortableItem
                key={item.id}
                id={item.id}
                selected={item.id === selectedBlockId}
                onSelect={handleSelect}
              >
                {renderQuizBlock(item.block)}
              </EditorCanvasSortableItem>
            )
          )}
        </Box>
      )}
    </Paper>
  );
};
