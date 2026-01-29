import { BLOCK_TYPES, QUESTION_INPUT_TYPES, type QuizBlock } from '@/entities/quiz-block/model/types';

export type BlockFactoryGroup = 'content' | 'questions';

export type BlockFactory = {
  id: string;
  type: QuizBlock['type'];
  label: string;
  required?: boolean;
  group: BlockFactoryGroup;
  create: () => QuizBlock;
};

export const blockFactories: BlockFactory[] = [
  {
    id: 'heading',
    type: BLOCK_TYPES.HEADING,
    label: 'Heading',
    group: 'content',
    create: () => ({
      id: crypto.randomUUID(),
      type: BLOCK_TYPES.HEADING,
      text: 'Section title',
      level: 'h2',
      align: 'left',
    }),
  },
  {
    id: 'button',
    type: BLOCK_TYPES.BUTTON,
    label: 'Button',
    required: true,
    group: 'content',
    create: () => ({
      id: crypto.randomUUID(),
      type: BLOCK_TYPES.BUTTON,
      label: 'Continue',
      variant: 'contained',
      align: 'left',
      action: 'submit',
    }),
  },
  {
    id: 'footer',
    type: BLOCK_TYPES.FOOTER,
    label: 'Footer',
    group: 'content',
    create: () => ({
      id: crypto.randomUUID(),
      type: BLOCK_TYPES.FOOTER,
      text: 'Footer text',
      align: 'left',
    }),
  },
  {
    id: 'question-single',
    type: BLOCK_TYPES.QUESTION,
    label: 'Single Choice',
    group: 'questions',
    create: () => ({
      id: crypto.randomUUID(),
      type: 'question',
      question: 'Untitled question',
      required: false,
      input: {
        type: QUESTION_INPUT_TYPES.RADIO,
        options: [
          { id: crypto.randomUUID(), label: 'Option 1' },
          { id: crypto.randomUUID(), label: 'Option 2' },
        ],
      },
    }),
  },
  {
    id: 'question-multiple',
    type: BLOCK_TYPES.QUESTION,
    label: 'Multiple Choice',
    group: 'questions',
    create: () => ({
      id: crypto.randomUUID(),
      type: BLOCK_TYPES.QUESTION,
      question: 'Untitled question',
      required: false,
      input: {
        type: QUESTION_INPUT_TYPES.CHECKBOX,
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
    label: 'Text Input',
    group: 'questions',
    create: () => ({
      id: crypto.randomUUID(),
      type: BLOCK_TYPES.QUESTION,
      question: 'Untitled question',
      required: false,
      input: {
        type: QUESTION_INPUT_TYPES.TEXT,
        placeholder: 'Type your answer',
      },
    }),
  },
];
