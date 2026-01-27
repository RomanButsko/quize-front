'use client';

import { useMemo, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { type DragEndEvent, type DragStartEvent, type DragOverEvent } from '@dnd-kit/core';
import { blockFactories } from '@/features/quiz-editor/model/block-factories';
import { CANVAS_DROPPABLE_ID, PLACEHOLDER_BLOCK_ID } from '@/features/quiz-editor/lib/dnd/constants';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { setBlocks } from '@/shared/store';

type DndSource = 'sidebar' | 'canvas';

export const useEditorDnd = () => {
  const dispatch = useAppDispatch();
  const blocks = useAppSelector((state) => state.editor.blocks);
  const [activeSource, setActiveSource] = useState<DndSource | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [activeFactoryId, setActiveFactoryId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const isCanvasOver = useMemo(() => {
    if (!overId) {
      return false;
    }
    return (
      overId === CANVAS_DROPPABLE_ID || overId === PLACEHOLDER_BLOCK_ID || blocks.some((block) => block.id === overId)
    );
  }, [overId, blocks]);

  const placeholderIndex = useMemo(() => {
    if (!isCanvasOver) {
      return null;
    }
    if (overId === CANVAS_DROPPABLE_ID || overId === PLACEHOLDER_BLOCK_ID) {
      return blocks.length;
    }
    const index = blocks.findIndex((block) => block.id === overId);
    return index === -1 ? blocks.length : index;
  }, [overId, isCanvasOver, blocks]);

  const blockIds = useMemo(() => blocks.map((block) => block.id), [blocks]);

  const handleDragStart = ({ active }: DragStartEvent) => {
    const source = active.data.current?.source ?? null;
    setActiveSource(source);
    setActiveId(String(active.id));
    if (source === 'sidebar') {
      const factoryId = active.data.current?.factoryId ?? null;
      setActiveFactoryId(factoryId);
    }
  };

  const handleDragOver = ({ over }: DragOverEvent) => {
    setOverId(over ? String(over.id) : null);
  };

  const handleDragCancel = () => {
    setActiveSource(null);
    setActiveFactoryId(null);
    setActiveId(null);
    setOverId(null);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) {
      handleDragCancel();
      return;
    }

    const activeSource = active.data.current?.source as DndSource | undefined;

    if (activeSource === 'sidebar') {
      const dropTargetId = String(over.id);
      const isCanvasDrop =
        dropTargetId === CANVAS_DROPPABLE_ID ||
        dropTargetId === PLACEHOLDER_BLOCK_ID ||
        blocks.some((block) => block.id === dropTargetId);
      if (!isCanvasDrop) {
        return;
      }
      const factoryId = active.data.current?.factoryId as string | undefined;
      const factory = blockFactories.find((item) => item.id === factoryId);
      if (!factory) {
        handleDragCancel();
        return;
      }
      const nextBlock = factory.create();
      const insertIndex = placeholderIndex ?? blocks.length;
      const nextBlocks = [...blocks];
      nextBlocks.splice(insertIndex, 0, nextBlock);
      dispatch(setBlocks(nextBlocks));
      handleDragCancel();
      return;
    }

    if (activeSource === 'canvas') {
      const activeId = String(active.id);
      const overId = String(over.id);
      if (activeId === overId || overId === CANVAS_DROPPABLE_ID || overId === PLACEHOLDER_BLOCK_ID) {
        handleDragCancel();
        return;
      }
      const oldIndex = blocks.findIndex((block) => block.id === activeId);
      const newIndex = blocks.findIndex((block) => block.id === overId);
      if (oldIndex === -1 || newIndex === -1) {
        handleDragCancel();
        return;
      }
      dispatch(setBlocks(arrayMove(blocks, oldIndex, newIndex)));
      handleDragCancel();
    }
  };

  return {
    blockIds,
    activeSource,
    activeFactoryId,
    activeId,
    overId,
    isCanvasOver,
    placeholderIndex,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,
  };
};
