import type { QuizBlock } from '@/entities/quiz-block/model/types';

export type EditorState = {
  quizId: string | null;
  title: string;
  blocks: QuizBlock[];
  selectedBlockId: string | null;
  published: boolean;
};

export type InitializeEditorPayload = {
  quizId: string;
  title: string;
  blocks: QuizBlock[];
  published: boolean;
};

export type QuizInfoPayload = {
  id: string | null;
  title: string;
};

export type UpdateBlockPayload = QuizBlock;
