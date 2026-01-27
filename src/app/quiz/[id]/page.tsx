import { Box } from '@mui/material';
import { QuizCard } from '@/widgets/quiz-card';
import type { Quiz } from '@/entities/quiz/model/types';
import { testData } from '@/entities/quiz/model/types';
import { NotPublishedQuiz } from '@/entities/not-published-quiz';
import { QuizRenderer } from '@/features/quiz-render';
import { sx } from '@/shared/lib';

const styles = sx({
  page: {
    px: { xs: 2, sm: 3 },
    py: { xs: 3, sm: 4 },
  },
  centered: {
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
  },
});

const getQuizById = async (id: string): Promise<Quiz> => {
  return {
    ...testData,
    id,
  };
};

type QuizPageProps = {
  params: Promise<{ id: string }>;
};

const QuizPage = async ({ params }: QuizPageProps) => {
  const { id } = await params;
  const quiz = await getQuizById(id);

  return (
    <Box sx={styles.page}>
      {!quiz.published && <NotPublishedQuiz quizId={id} />}
      <QuizCard title={quiz.title}>
        <QuizRenderer quiz={quiz} />
      </QuizCard>
    </Box>
  );
};

export default QuizPage;
