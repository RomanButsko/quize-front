import { Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { sx } from '@/shared/lib';
import { paths } from '@/shared/config';

const styles = sx({
  centered: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  },
  message: {
    textAlign: 'center',
  },
  linkText: {
    color: 'primary.main',
    textTransform: 'uppercase',
  },
});

type NotPublishedQuizProps = {
  quizId: string;
};

export const NotPublishedQuiz = ({ quizId }: NotPublishedQuizProps) => {
  return (
    <Stack sx={styles.centered}>
      <Typography
        variant='h6'
        sx={styles.message}
      >
        Not published yet
      </Typography>
      <Link
        href={paths.quizEditById(quizId)}
        style={{ textDecoration: 'none' }}
      >
        <Typography
          variant='body1'
          sx={styles.linkText}
        >
          Go to Edit Page
        </Typography>
      </Link>
    </Stack>
  );
};
