export const BLOCK_TYPES = {
  HEADING: 'heading',
  BUTTON: 'button',
  FOOTER: 'footer',
  QUESTION: 'question',
} as const;

export type BlockType = (typeof BLOCK_TYPES)[keyof typeof BLOCK_TYPES];

export const QUESTION_INPUT_TYPES = {
  RADIO: 'radio',
  CHECKBOX: 'checkbox',
  TEXT: 'text',
} as const;

export type QuestionInputType = (typeof QUESTION_INPUT_TYPES)[keyof typeof QUESTION_INPUT_TYPES];

export type QuizBlock = HeadingBlock | QuestionBlock | ButtonBlock | FooterBlock;

export type HeadingBlock = {
  id: string;
  type: typeof BLOCK_TYPES.HEADING;
  text: string;
  level: 'h1' | 'h2' | 'h3';
  align?: 'left' | 'center' | 'right';
};

export type ButtonBlock = {
  id: string;
  type: typeof BLOCK_TYPES.BUTTON;
  label: string;
  variant: 'text' | 'outlined' | 'contained';
  align?: 'left' | 'center' | 'right';
  action: 'cancel' | 'submit';
};

export type FooterBlock = {
  id: string;
  type: typeof BLOCK_TYPES.FOOTER;
  text: string;
  align?: 'left' | 'center' | 'right';
};

export type QuestionBlock = {
  id: string;
  type: typeof BLOCK_TYPES.QUESTION;
  question: string;
  required: boolean;
  input: QuestionInput;
};

export type QuestionInput = RadioInput | CheckboxInput | TextInput;

export type RadioInput = {
  type: typeof QUESTION_INPUT_TYPES.RADIO;
  options: QuestionOption[];
};

export type CheckboxInput = {
  type: typeof QUESTION_INPUT_TYPES.CHECKBOX;
  options: QuestionOption[];
};

export type TextInput = {
  type: typeof QUESTION_INPUT_TYPES.TEXT;
  placeholder?: string;
  maxLength?: number;
};

export type QuestionOption = {
  id: string;
  label: string;
};
