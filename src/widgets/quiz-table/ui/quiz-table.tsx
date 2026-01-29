'use client';

import Link from 'next/link';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useQuery } from '@tanstack/react-query';
import { getQuizListQuery } from '@/entities/quiz';
import { paths } from '@/shared/config';
import { formatDateDayMonthYearTime, sx } from '@/shared/lib';
import { QuizTableEmpty } from './quiz-table-empty';

const styles = sx({
  container: {
    borderRadius: 3,
    border: 1,
    borderColor: 'divider',
  },
  headCell: {
    color: 'text.secondary',
    fontWeight: 700,
  },
  row: {
    '&:last-child td, &:last-child th': {
      borderBottom: 0,
    },
  },
  title: {
    fontWeight: 600,
    color: 'text.primary',
  },
  actions: {
    display: 'flex',
    gap: 2,
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
  },
});

export const QuizTable = () => {
  const { data: quizzes, isLoading } = useQuery(getQuizListQuery());

  if (isLoading) {
    return (
      <Box sx={styles.loader}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={styles.container}
    >
      <Table>
        <TableHead>
          <TableRow>
            {['Quiz Title', 'Last Updated', 'Status', 'Actions'].map((column) => (
              <TableCell
                key={column}
                sx={styles.headCell}
              >
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!quizzes || quizzes.length === 0 ? (
            <QuizTableEmpty />
          ) : (
            <>
              {quizzes.map(({ id, title, updatedAt, published }) => (
                <TableRow
                  key={id}
                  sx={styles.row}
                >
                  <TableCell>
                    <Typography
                      variant='body1'
                      sx={styles.title}
                    >
                      {title}
                    </Typography>
                  </TableCell>
                  <TableCell>{formatDateDayMonthYearTime(updatedAt)}</TableCell>
                  <TableCell>
                    <Chip
                      label={published ? 'Published' : 'Draft'}
                      color={published ? 'success' : 'default'}
                      size='small'
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={styles.actions}>
                      <Button
                        component={Link}
                        href={paths.quizEditById(id)}
                        size='small'
                        variant='text'
                        color='secondary'
                        startIcon={<EditIcon />}
                      >
                        <Typography variant='body2'>Edit</Typography>
                      </Button>
                      <Button
                        size='small'
                        variant='text'
                        component={Link}
                        href={paths.quizViewById(id)}
                        color='secondary'
                        startIcon={<VisibilityIcon />}
                      >
                        <Typography variant='body2'>View</Typography>
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
