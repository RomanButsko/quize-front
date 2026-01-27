import type { QuizBlock } from '@/entities/quiz-block/model/types';

export type EditorState = {
  quizId: string | null;
  title: string;
  blocks: QuizBlock[];
  selectedBlockId: string | null;
};

export type QuizInfoPayload = {
  id: string | null;
  title: string;
};

export type UpdateBlockPayload = QuizBlock;
