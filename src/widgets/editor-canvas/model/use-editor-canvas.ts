import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { removeBlock, selectBlock } from '@/shared/store';

export const useEditorCanvas = () => {
  const dispatch = useAppDispatch();
  const blocks = useAppSelector((state) => state.editor.blocks);
  const selectedBlockId = useAppSelector((state) => state.editor.selectedBlockId);

  const isEmpty = blocks.length === 0;

  const handleSelect = (id: string) => {
    dispatch(selectBlock(id));
  };

  const handleDelete = (id: string) => {
    dispatch(removeBlock(id));
  };

  return {
    blocks,
    selectedBlockId,
    isEmpty,
    handleSelect,
    handleDelete,
  };
};
