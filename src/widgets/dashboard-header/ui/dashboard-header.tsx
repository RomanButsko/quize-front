'use client';

import Link from 'next/link';
import { Button, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { sx } from '@/shared/lib';
import { paths } from '@/shared/config';

const styles = sx({
  root: {
    flexDirection: {
      xs: 'column',
      sm: 'row',
    },
    justifyContent: 'space-between',
    alignItems: {
      xs: 'flex-start',
      sm: 'center',
    },
    gap: 2,
  },
  textContent: {
    gap: 0.5,
  },
  title: {
    fontWeight: 700,
  },
  subtitle: {
    color: 'text.secondary',
  },
  createButton: {
    fontWeight: 600,
  },
});

export const DashboardHeader = () => {
  return (
    <Stack sx={styles.root}>
      <Stack sx={styles.textContent}>
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
      <Button
        component={Link}
        href={paths.quizEdit}
        variant='contained'
        startIcon={<AddIcon />}
        sx={styles.createButton}
      >
        Create New Quiz
      </Button>
    </Stack>
  );
};
