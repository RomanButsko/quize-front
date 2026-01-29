import type { Metadata } from 'next';
import { Box, Stack } from '@mui/material';
import { DashboardHeader } from '@/widgets/dashboard-header';
import { QuizTable } from '@/widgets/quiz-table';
import { sx } from '@/shared/lib';

export const metadata: Metadata = {
  title: 'Dashboard',
};

const styles = sx({
  root: {
    p: {
      xs: 2,
      md: 3,
    },
  },
});

export default function Home() {
  return (
    <Box sx={styles.root}>
      <Stack spacing={3}>
        <DashboardHeader />
        <QuizTable />
      </Stack>
    </Box>
  );
}
