import {
  QuizBlock,
  BLOCK_TYPES,
  QUESTION_INPUT_TYPES,
  type BlockType,
  type QuestionInputType,
} from '@/entities/quiz-block/model/types';

const BLOCK_TYPE_TITLES: Record<BlockType, string> = {
  [BLOCK_TYPES.HEADING]: 'Heading',
  [BLOCK_TYPES.BUTTON]: 'Button',
  [BLOCK_TYPES.FOOTER]: 'Footer',
  [BLOCK_TYPES.QUESTION]: 'Question',
};

const QUESTION_INPUT_TITLES: Record<QuestionInputType, string> = {
  [QUESTION_INPUT_TYPES.RADIO]: 'Question (Single choice)',
  [QUESTION_INPUT_TYPES.CHECKBOX]: 'Question (Multiple choice)',
  [QUESTION_INPUT_TYPES.TEXT]: 'Question (Text input)',
};

export const getBlockTitle = (block: QuizBlock): string => {
  if (block.type === BLOCK_TYPES.QUESTION) {
    return QUESTION_INPUT_TITLES[block.input.type];
  }

  return BLOCK_TYPE_TITLES[block.type];
};
