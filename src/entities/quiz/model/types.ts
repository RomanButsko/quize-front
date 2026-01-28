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

export const testData: Quiz = {
  blocks: [
    {
      id: 'd1633e66-96a3-41f2-9d99-8004faa68f0e',
      type: 'question',
      question: 'What is your name?',
      required: false,
      input: {
        type: 'text',
        placeholder: 'Type your answer',
      },
    },
    {
      id: 'ffcb28a9-76aa-4eeb-bf19-f1f0642c54fe',
      type: 'heading',
      text: 'Questions',
      level: 'h2',
      align: 'left',
    },
    {
      id: '1bbd14ab-9834-4758-8ad6-673602657c1a',
      type: 'question',
      question: 'What is the capital of France?',
      required: false,
      input: {
        type: 'radio',
        options: [
          {
            id: '4f76a86f-c53a-4729-81d0-5b118ae0a2db',
            label: 'Paris',
          },
          {
            id: '5c88125e-399f-4ec7-960f-6ec1ad2b2c3d',
            label: 'London',
          },
        ],
      },
    },
    {
      id: '123',
      type: 'button',
      action: 'submit',
      label: 'Submit',
      variant: 'contained',
    },
    {
      id: '123',
      type: 'button',
      action: 'cancel',
      label: 'Cancel',
      variant: 'text',
    },
  ],
  id: '123',
  title: 'Квиз',
  published: true,
  updatedAt: '2026-01-27T10:00:00.000Z',
};
