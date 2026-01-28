'use client';

import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { QuizCard } from '@/widgets/quiz-card';
import { getQuizByIdQuery } from '@/entities/quiz';
import { NotPublishedQuiz } from '@/entities/not-published-quiz';
import { QuizRenderer } from '@/features/quiz-render';
import { sx } from '@/shared/lib';
import { FullPageLoader, FullPageError } from '@/shared/ui';

const styles = sx({
  page: {
    px: { xs: 2, sm: 3 },
    py: { xs: 3, sm: 4 },
  },
});

type QuizPageContentProps = {
  quizId: string;
};

export const QuizPageContent = ({ quizId }: QuizPageContentProps) => {
  const { data: quiz, isLoading, error } = useQuery(getQuizByIdQuery(quizId));

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (error || !quiz) {
    return (
      <FullPageError
        error={error}
        message='Failed to load quiz'
      />
    );
  }

  return (
    <Box sx={styles.page}>
      {!quiz.published && <NotPublishedQuiz quizId={quizId} />}
      <QuizCard title={quiz.title}>
        <QuizRenderer quiz={quiz} />
      </QuizCard>
    </Box>
  );
};
