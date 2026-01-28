import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQuizByIdQuery } from '@/entities/quiz';
import { getQueryClient } from '@/shared/api';
import { QuizPageContent } from './quiz-page-content';

type QuizPageProps = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({ params }: QuizPageProps): Promise<Metadata> => {
  const { id } = await params;
  const queryClient = getQueryClient();

  try {
    const quiz = await queryClient.fetchQuery(getQuizByIdQuery(id));
    return { title: quiz.title };
  } catch {
    return { title: 'Quiz' };
  }
};

const QuizPage = async ({ params }: QuizPageProps) => {
  const { id } = await params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getQuizByIdQuery(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QuizPageContent quizId={id} />
    </HydrationBoundary>
  );
};

export default QuizPage;
