import type { QuizListItem } from '@/entities/quiz';

export const mockQuizzes: QuizListItem[] = [
  {
    id: 'quiz-101',
    title: 'Frontend Basics',
    updatedAt: '2026-01-22T10:15:00Z',
    published: true,
  },
  {
    id: 'quiz-102',
    title: 'React Hooks Deep Dive',
    updatedAt: '2026-01-20T17:40:00Z',
    published: false,
  },
  {
    id: 'quiz-103',
    title: 'TypeScript Essentials',
    updatedAt: '2026-01-18T08:05:00Z',
    published: true,
  },
  {
    id: 'quiz-104',
    title: 'UX Writing Sprint',
    updatedAt: '2026-01-14T13:30:00Z',
    published: false,
  },
];
