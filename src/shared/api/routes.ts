export const API_ROUTES = {
  quizzes: {
    all: () => '/quizzes',
    byId: (id: string) => `/quizzes/${id}`,
    create: () => '/quizzes',
    update: (id: string) => `/quizzes/${id}`,
    publish: (id: string) => `/quizzes/${id}/publish`,
    unpublish: (id: string) => `/quizzes/${id}/unpublish`,
  },
} as const;
