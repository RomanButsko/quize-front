'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useId } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Box, Paper, Typography } from '@mui/material';
import { useEditorDnd } from '@/features/quiz-editor/lib/dnd/use-editor-dnd';
import { blockFactories } from '@/features/quiz-editor/model/block-factories';
import { useAppSelector } from '@/shared/store/hooks';
import { renderQuizBlock } from '@/entities/quiz-block/lib';
import { sx } from '@/shared/lib';

type EditorDndContextProps = {
  children: ReactNode;
};

type EditorDndState = ReturnType<typeof useEditorDnd>;

const EditorDndStateContext = createContext<EditorDndState | null>(null);

export const useEditorDndState = () => {
  const value = useContext(EditorDndStateContext);
  if (!value) {
    throw new Error('useEditorDndState must be used within EditorDndContext');
  }
  return value;
};

const styles = sx({
  overlay: {
    p: 1,
    border: 1,
    borderColor: 'divider',
    borderRadius: 1.5,
    opacity: 0.8,
  },
});

export const EditorDndContext = ({ children }: EditorDndContextProps) => {
  const id = useId();

  const dndState = useEditorDnd();
  const {
    blockIds,
    activeSource,
    activeFactoryId,
    activeId,
    handleDragEnd,
    handleDragStart,
    handleDragOver,
    handleDragCancel,
  } = dndState;

  const blocks = useAppSelector((state) => state.editor.blocks);

  const activeBlock = blocks.find((block) => block.id === activeId);
  const activeFactory = blockFactories.find((factory) => factory.id === activeFactoryId);

  return (
    <DndContext
      id={id}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragCancel={handleDragCancel}
    >
      <EditorDndStateContext.Provider value={dndState}>
        <SortableContext
          items={blockIds}
          strategy={verticalListSortingStrategy}
        >
          {children}
        </SortableContext>
        <DragOverlay>
          {activeSource === 'sidebar' && activeFactory ? (
            <Paper
              elevation={3}
              sx={styles.overlay}
            >
              <Typography variant='body2'>{activeFactory.label}</Typography>
            </Paper>
          ) : null}
          {activeSource === 'canvas' && activeBlock ? (
            <Box sx={styles.overlay}>{renderQuizBlock(activeBlock)}</Box>
          ) : null}
        </DragOverlay>
      </EditorDndStateContext.Provider>
    </DndContext>
  );
};
