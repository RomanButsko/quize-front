import { Box, Stack, Typography } from '@mui/material';
import { QuizTable } from '@/widgets/quiz-table';
import { sx } from '@/shared/lib';

const styles = sx({
  root: {
    p: {
      xs: 2,
      md: 3,
    },
  },
  header: {
    gap: 0.5,
  },
  title: {
    fontWeight: 700,
  },
  subtitle: {
    color: 'text.secondary',
  },
});

export default function Home() {
  return (
    <Box sx={styles.root}>
      <Stack spacing={3}>
        <Stack sx={styles.header}>
          <Typography
            variant='h4'
            sx={styles.title}
          >
            Quiz Dashboard
          </Typography>
          <Typography
            variant='body1'
            sx={styles.subtitle}
          >
            Manage and publish your quizzes
          </Typography>
        </Stack>
        <QuizTable />
      </Stack>
    </Box>
  );
}
