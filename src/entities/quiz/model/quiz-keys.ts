export const quizKeys = {
  all: ['quizzes'] as const,
  detail: (id: string) => [...quizKeys.all, id] as const,
} as const;
