import { Card, CardContent, Stack, Typography } from '@mui/material';
import { sx } from '@/shared/lib';

const styles = sx({
  card: {
    width: '100%',
    maxWidth: 720,
    mx: 'auto',
  },
  content: {
    p: { xs: 2.5, sm: 3 },
  },
  title: {
    fontWeight: 600,
  },
});

type QuizCardProps = {
  title: string;
  children: React.ReactNode;
};

export const QuizCard = ({ title, children }: QuizCardProps) => {
  return (
    <Card sx={styles.card}>
      <CardContent sx={styles.content}>
        <Stack spacing={2.5}>
          <Typography
            variant='h6'
            sx={styles.title}
          >
            {title}
          </Typography>
          {children}
        </Stack>
      </CardContent>
    </Card>
  );
};
