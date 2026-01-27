import { QuizBlock } from '@/entities/quiz-block/model/types';

export const getBlockTitle = (block: QuizBlock) => {
  if (block.type === 'heading') {
    return 'Heading';
  }
  if (block.type === 'button') {
    return 'Button';
  }
  if (block.type === 'footer') {
    return 'Footer';
  }
  if (block.input.type === 'radio') {
    return 'Question (Single choice)';
  }
  if (block.input.type === 'checkbox') {
    return 'Question (Multiple choice)';
  }
  return 'Question (Text input)';
};
