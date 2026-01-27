'use client';

import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { QuizBlock } from '@/entities/quiz-block/model/types';
import { hasOptions } from '@/entities/quiz-block/lib';
import { selectBlock, updateBlock } from '@/shared/store';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';

type BlockDraftContextValue = {
  draft: QuizBlock | null;
  selectedBlock: QuizBlock | null;
  setHeadingText: (text: string) => void;
  setFooterText: (text: string) => void;
  setQuestionLabel: (question: string) => void;
  addQuestionOption: () => void;
  setQuestionOptionLabel: (optionId: string, label: string) => void;
  setQuestionPlaceholder: (placeholder: string) => void;
  setButtonLabel: (label: string) => void;
  setButtonVariant: (variant: 'contained' | 'outlined' | 'text') => void;
  saveDraft: () => void;
  cancelDraft: () => void;
};

const BlockDraftContext = createContext<BlockDraftContextValue | null>(null);

type BlockDraftProviderProps = {
  children: ReactNode;
};

type DraftStateProviderProps = {
  children: ReactNode;
  selectedBlock: QuizBlock | null;
};

const DraftStateProvider = ({ children, selectedBlock }: DraftStateProviderProps) => {
  const dispatch = useAppDispatch();

  const [draft, setDraft] = useState<QuizBlock | null>(selectedBlock ? structuredClone(selectedBlock) : null);

  const updateDraft = (updater: (current: QuizBlock) => QuizBlock) => {
    setDraft((current) => (current ? updater(current) : current));
  };

  const setHeadingText = (text: string) => {
    updateDraft((current) => (current.type === 'heading' ? { ...current, text } : current));
  };

  const setFooterText = (text: string) => {
    updateDraft((current) => (current.type === 'footer' ? { ...current, text } : current));
  };

  const setQuestionLabel = (question: string) => {
    updateDraft((current) => (current.type === 'question' ? { ...current, question } : current));
  };

  const addQuestionOption = () => {
    updateDraft((current) => {
      if (current.type !== 'question' || !hasOptions(current.input)) {
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
      if (current.type !== 'question' || !hasOptions(current.input)) {
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
      current.type === 'question' ? { ...current, input: { ...current.input, placeholder } } : current
    );
  };

  const setButtonLabel = (label: string) => {
    updateDraft((current) => (current.type === 'button' ? { ...current, label } : current));
  };

  const setButtonVariant = (variant: 'contained' | 'outlined' | 'text') => {
    updateDraft((current) => (current.type === 'button' ? { ...current, variant } : current));
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

  const value: BlockDraftContextValue = {
    draft,
    selectedBlock,
    setHeadingText,
    setFooterText,
    setQuestionLabel,
    addQuestionOption,
    setQuestionOptionLabel,
    setQuestionPlaceholder,
    setButtonLabel,
    setButtonVariant,
    saveDraft,
    cancelDraft,
  };

  return <BlockDraftContext.Provider value={value}>{children}</BlockDraftContext.Provider>;
};

export const BlockDraftProvider = ({ children }: BlockDraftProviderProps) => {
  const blocks = useAppSelector((state) => state.editor.blocks);
  const selectedBlockId = useAppSelector((state) => state.editor.selectedBlockId);

  const selectedBlock = selectedBlockId ? (blocks.find((block) => block.id === selectedBlockId) ?? null) : null;

  return (
    <DraftStateProvider
      key={selectedBlockId ?? 'none'}
      selectedBlock={selectedBlock}
    >
      {children}
    </DraftStateProvider>
  );
};

export const useBlockDraftContext = () => {
  const context = useContext(BlockDraftContext);
  if (!context) {
    throw new Error('useBlockDraftContext must be used within BlockDraftProvider');
  }
  return context;
};
