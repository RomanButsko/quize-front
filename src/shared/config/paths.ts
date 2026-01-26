export const paths = {
  dashboard: '/',
  quizEdit: '/quiz/edit',
  quizEditById: (id: string) => `/quiz/edit/${id}`,
  quizViewById: (id: string) => `/quiz/${id}`,
} as const;
