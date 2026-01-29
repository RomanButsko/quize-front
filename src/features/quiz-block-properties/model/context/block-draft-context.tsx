'use client';

import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { BLOCK_TYPES, type QuizBlock } from '@/entities/quiz-block/model/types';
import { hasOptions } from '@/entities/quiz-block/lib';
import { selectBlock, updateBlock } from '@/shared/store';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';

type BlockDraftStateContextValue = {
  draft: QuizBlock | null;
};

type BlockDraftActionsContextValue = {
  setHeadingText: (text: string) => void;
  setFooterText: (text: string) => void;
  setQuestionLabel: (question: string) => void;
  addQuestionOption: () => void;
  setQuestionOptionLabel: (optionId: string, label: string) => void;
  setQuestionPlaceholder: (placeholder: string) => void;
  setButtonLabel: (label: string) => void;
  setButtonVariant: (variant: 'contained' | 'outlined' | 'text') => void;
  setButtonAction: (action: 'cancel' | 'submit') => void;
  saveDraft: () => void;
  cancelDraft: () => void;
};

const BlockDraftStateContext = createContext<BlockDraftStateContextValue | null>(null);
const BlockDraftActionsContext = createContext<BlockDraftActionsContextValue | null>(null);

type BlockDraftProviderProps = {
  children: ReactNode;
};

export const BlockDraftProvider = ({ children }: BlockDraftProviderProps) => {
  const dispatch = useAppDispatch();
  const blocks = useAppSelector((state) => state.editor.blocks);
  const selectedBlockId = useAppSelector((state) => state.editor.selectedBlockId);

  const [draft, setDraft] = useState<QuizBlock | null>(null);
  const [trackedBlockId, setTrackedBlockId] = useState<string | null>(null);

  if (selectedBlockId !== trackedBlockId) {
    setTrackedBlockId(selectedBlockId);
    if (selectedBlockId) {
      const block = blocks.find((b) => b.id === selectedBlockId);
      setDraft(block ? structuredClone(block) : null);
    } else {
      setDraft(null);
    }
  }

  const updateDraft = (updater: (current: QuizBlock) => QuizBlock) => {
    setDraft((current) => (current ? updater(current) : current));
  };

  const setHeadingText = (text: string) => {
    updateDraft((current) => (current.type === BLOCK_TYPES.HEADING ? { ...current, text } : current));
  };

  const setFooterText = (text: string) => {
    updateDraft((current) => (current.type === BLOCK_TYPES.FOOTER ? { ...current, text } : current));
  };

  const setQuestionLabel = (question: string) => {
    updateDraft((current) => (current.type === BLOCK_TYPES.QUESTION ? { ...current, question } : current));
  };

  const addQuestionOption = () => {
    updateDraft((current) => {
      if (current.type !== BLOCK_TYPES.QUESTION || !hasOptions(current.input)) {
        return current;
      }
      const newOption = { id: crypto.randomUUID(), label: '' };
      return {
        ...current,
        input: {
          ...current.input,
          options: [...current.input.options, newOption],
        },
      };
    });
  };

  const setQuestionOptionLabel = (optionId: string, label: string) => {
    updateDraft((current) => {
      if (current.type !== BLOCK_TYPES.QUESTION || !hasOptions(current.input)) {
        return current;
      }
      return {
        ...current,
        input: {
          ...current.input,
          options: current.input.options.map((option) => (option.id === optionId ? { ...option, label } : option)),
        },
      };
    });
  };

  const setQuestionPlaceholder = (placeholder: string) => {
    updateDraft((current) =>
      current.type === BLOCK_TYPES.QUESTION ? { ...current, input: { ...current.input, placeholder } } : current
    );
  };

  const setButtonLabel = (label: string) => {
    updateDraft((current) => (current.type === BLOCK_TYPES.BUTTON ? { ...current, label } : current));
  };

  const setButtonVariant = (variant: 'contained' | 'outlined' | 'text') => {
    updateDraft((current) => (current.type === BLOCK_TYPES.BUTTON ? { ...current, variant } : current));
  };

  const setButtonAction = (action: 'cancel' | 'submit') => {
    updateDraft((current) => (current.type === BLOCK_TYPES.BUTTON ? { ...current, action } : current));
  };

  const saveDraft = () => {
    if (!draft) {
      return;
    }
    dispatch(updateBlock(draft));
    dispatch(selectBlock(null));
    setDraft(null);
  };

  const cancelDraft = () => {
    dispatch(selectBlock(null));
    setDraft(null);
  };

  const stateValue: BlockDraftStateContextValue = {
    draft,
  };

  const actionsValue: BlockDraftActionsContextValue = {
    setHeadingText,
    setFooterText,
    setQuestionLabel,
    addQuestionOption,
    setQuestionOptionLabel,
    setQuestionPlaceholder,
    setButtonLabel,
    setButtonVariant,
    setButtonAction,
    saveDraft,
    cancelDraft,
  };

  return (
    <BlockDraftStateContext.Provider value={stateValue}>
      <BlockDraftActionsContext.Provider value={actionsValue}>{children}</BlockDraftActionsContext.Provider>
    </BlockDraftStateContext.Provider>
  );
};

export const useBlockDraftState = () => {
  const context = useContext(BlockDraftStateContext);
  if (!context) {
    throw new Error('useBlockDraftState must be used within BlockDraftProvider');
  }
  return context;
};

export const useBlockDraftActions = () => {
  const context = useContext(BlockDraftActionsContext);
  if (!context) {
    throw new Error('useBlockDraftActions must be used within BlockDraftProvider');
  }
  return context;
};
