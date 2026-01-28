import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQuizByIdQuery } from '@/entities/quiz';
import { getQueryClient } from '@/shared/api';
import { QuizPageContent } from './quiz-page-content';

type QuizPageProps = {
  params: Promise<{ id: string }>;
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
