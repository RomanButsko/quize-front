import { BLOCK_TYPES, QUESTION_INPUT_TYPES, type QuizBlock } from '@/entities/quiz-block/model/types';

const isNonEmpty = (value: string) => value.trim().length > 0;
const hasEmptyOption = (labels: Array<{ label: string }>) => labels.some((option) => !isNonEmpty(option.label));

export const isBlockValid = (block: QuizBlock) => {
  if (block.type === BLOCK_TYPES.BUTTON) {
    return isNonEmpty(block.label);
  }
  if (block.type === BLOCK_TYPES.FOOTER || block.type === BLOCK_TYPES.HEADING) {
    return isNonEmpty(block.text);
  }
  if (block.type === BLOCK_TYPES.QUESTION) {
    if (!isNonEmpty(block.question)) {
      return false;
    }
    if (block.input.type === QUESTION_INPUT_TYPES.TEXT) {
      return true;
    }
    return !hasEmptyOption(block.input.options);
  }
  return true;
};
