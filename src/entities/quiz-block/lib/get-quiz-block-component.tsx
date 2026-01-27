import type { ReactElement, ComponentType, ComponentProps } from 'react';
import type {
  QuizBlock,
  HeadingBlock as HeadingBlockType,
  QuestionBlock as QuestionBlockType,
  ButtonBlock as ButtonBlockType,
  FooterBlock as FooterBlockType,
} from '../model/types';
import { HeadingBlock } from '../ui/heading-block';
import { QuestionBlock } from '../ui/question-block';
import { ButtonBlock } from '../ui/button-block';
import { FooterBlock } from '../ui/footer-block';

type BlockComponentMap = {
  heading: typeof HeadingBlock;
  question: typeof QuestionBlock;
  button: typeof ButtonBlock;
  footer: typeof FooterBlock;
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

type BlockRenderProps<T extends QuizBlock['type']> = Omit<ComponentProps<BlockComponentMap[T]>, 'block'>;

export function renderQuizBlock(block: HeadingBlockType, props?: BlockRenderProps<'heading'>): ReactElement;
export function renderQuizBlock(block: QuestionBlockType, props?: BlockRenderProps<'question'>): ReactElement;
export function renderQuizBlock(block: ButtonBlockType, props?: BlockRenderProps<'button'>): ReactElement;
export function renderQuizBlock(block: FooterBlockType, props?: BlockRenderProps<'footer'>): ReactElement;
export function renderQuizBlock(block: QuizBlock, props?: Record<string, unknown>): ReactElement;
export function renderQuizBlock(block: QuizBlock, props: Record<string, unknown> = {}): ReactElement {
  const Component = getQuizBlockComponentByType(block.type) as ComponentType<{ block: QuizBlock }>;
  return (
    <Component
      block={block}
      {...props}
    />
  );
}
