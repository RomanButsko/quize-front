import { QuizBlock } from '@/entities/quiz-block/model/types';

export type QuizListItem = {
  id: string;
  title: string;
  updatedAt: string;
  published: boolean;
};

export type Quiz = {
  id: string;
  title: string;
  published: boolean;
  updatedAt: string;
  blocks: QuizBlock[];
};
