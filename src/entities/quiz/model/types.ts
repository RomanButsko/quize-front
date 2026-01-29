import { QuizBlock } from '@/entities/quiz-block/model/types';

export type QuizListItem = {
  id: string;
  title: string;
  updatedAt: string;
  published: boolean;
};

/* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
export interface QuizItemDto extends Quiz {}
/* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
export interface QuizListItemDto extends QuizListItem {}

export type Quiz = {
  id: string;
  title: string;
  published: boolean;
  updatedAt: string;
  blocks: QuizBlock[];
};

export type CreateQuizPayload = {
  title: string;
  blocks?: QuizBlock[];
};

export type UpdateQuizPayload = Pick<Quiz, 'id' | 'title' | 'blocks'>;

export type PublishQuizPayload = Pick<Quiz, 'id'>;
