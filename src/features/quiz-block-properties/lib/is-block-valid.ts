import type { QuizBlock } from '@/entities/quiz-block/model/types';

const isNonEmpty = (value: string) => value.trim().length > 0;
const hasEmptyOption = (labels: Array<{ label: string }>) => labels.some((option) => !isNonEmpty(option.label));

export const isBlockValid = (block: QuizBlock) => {
  if (block.type === 'button') {
    return isNonEmpty(block.label);
  }
  if (block.type === 'footer' || block.type === 'heading') {
    return isNonEmpty(block.text);
  }
  if (block.type === 'question') {
    if (!isNonEmpty(block.question)) {
      return false;
    }
    if (block.input.type === 'text') {
      return true;
    }
    return !hasEmptyOption(block.input.options);
  }
  return true;
};
