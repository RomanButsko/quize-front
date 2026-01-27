import type { QuizBlock } from '@/entities/quiz-block/model/types';

export type BlockFactoryGroup = 'content' | 'questions';

export type BlockFactory = {
  id: string;
  type: QuizBlock['type'];
  label: string;
  group: BlockFactoryGroup;
  create: () => QuizBlock;
};

export const blockFactories: BlockFactory[] = [
  {
    id: 'heading',
    type: 'heading',
    label: 'Heading',
    group: 'content',
    create: () => ({
      id: crypto.randomUUID(),
      type: 'heading',
      text: 'Section title',
      level: 'h2',
      align: 'left',
    }),
  },
  {
    id: 'button',
    type: 'button',
    label: 'Button',
    group: 'content',
    create: () => ({
      id: crypto.randomUUID(),
      type: 'button',
      label: 'Continue',
      variant: 'contained',
      align: 'left',
    }),
  },
  {
    id: 'footer',
    type: 'footer',
    label: 'Footer',
    group: 'content',
    create: () => ({
      id: crypto.randomUUID(),
      type: 'footer',
      text: 'Footer text',
      align: 'left',
    }),
  },
  {
    id: 'question-single',
    type: 'question',
    label: 'Question (Single choice)',
    group: 'questions',
    create: () => ({
      id: crypto.randomUUID(),
      type: 'question',
      question: 'Untitled question',
      required: false,
      input: {
        type: 'radio',
        options: [
          { id: crypto.randomUUID(), label: 'Option 1' },
          { id: crypto.randomUUID(), label: 'Option 2' },
        ],
      },
    }),
  },
  {
    id: 'question-multiple',
    type: 'question',
    label: 'Question (Multiple choice)',
    group: 'questions',
    create: () => ({
      id: crypto.randomUUID(),
      type: 'question',
      question: 'Untitled question',
      required: false,
      input: {
        type: 'checkbox',
        options: [
          { id: crypto.randomUUID(), label: 'Option 1' },
          { id: crypto.randomUUID(), label: 'Option 2' },
        ],
      },
    }),
  },
  {
    id: 'question-text',
    type: 'question',
    label: 'Question (Text input)',
    group: 'questions',
    create: () => ({
      id: crypto.randomUUID(),
      type: 'question',
      question: 'Untitled question',
      required: false,
      input: {
        type: 'text',
        placeholder: 'Type your answer',
      },
    }),
  },
];
