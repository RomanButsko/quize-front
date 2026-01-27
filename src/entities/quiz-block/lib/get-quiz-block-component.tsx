import type { ReactElement, ComponentType } from 'react';
import type { QuizBlock } from '../model/types';
import { HeadingBlock } from '../ui/heading-block';
import { QuestionBlock } from '../ui/question-block';
import { ButtonBlock } from '../ui/button-block';
import { FooterBlock } from '../ui/footer-block';

type BlockByType<T extends QuizBlock['type']> = Extract<QuizBlock, { type: T }>;

type BlockComponentMap = {
  heading: ComponentType<{ block: BlockByType<'heading'> }>;
  question: ComponentType<{ block: BlockByType<'question'> }>;
  button: ComponentType<{ block: BlockByType<'button'> }>;
  footer: ComponentType<{ block: BlockByType<'footer'> }>;
};

const blockComponents = {
  heading: HeadingBlock,
  question: QuestionBlock,
  button: ButtonBlock,
  footer: FooterBlock,
} as const satisfies BlockComponentMap;

export const getQuizBlockComponentByType = <T extends QuizBlock['type']>(type: T): BlockComponentMap[T] => {
  const component = blockComponents[type];
  if (!component) {
    throw new Error(`Unsupported block type: ${type}`);
  }
  return component;
};

export const renderQuizBlock = <T extends QuizBlock>(block: T): ReactElement => {
  const Component = getQuizBlockComponentByType(block.type) as ComponentType<{ block: T }>;
  return <Component block={block} />;
};
