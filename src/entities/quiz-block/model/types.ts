export type QuizBlock = HeadingBlock | QuestionBlock | ButtonBlock | FooterBlock;

export type HeadingBlock = {
  id: string;
  type: 'heading';
  text: string;
  level: 'h1' | 'h2' | 'h3';
  align?: 'left' | 'center' | 'right';
};

export type ButtonBlock = {
  id: string;
  type: 'button';
  label: string;
  variant: 'text' | 'outlined' | 'contained';
  align?: 'left' | 'center' | 'right';
};

export type FooterBlock = {
  id: string;
  type: 'footer';
  text: string;
  align?: 'left' | 'center' | 'right';
};

export type QuestionBlock = {
  id: string;
  type: 'question';
  question: string;
  required: boolean;
  input: QuestionInput;
};

export type QuestionInput = RadioInput | CheckboxInput | TextInput;

export type RadioInput = {
  type: 'radio';
  options: QuestionOption[];
};

export type CheckboxInput = {
  type: 'checkbox';
  options: QuestionOption[];
};

export type TextInput = {
  type: 'text';
  placeholder?: string;
  maxLength?: number;
};

export type QuestionOption = {
  id: string;
  label: string;
};
