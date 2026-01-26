'use client';

import Link from 'next/link';
import {
  Box,
  Button,
  Chip,
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
import type { QuizListItem } from '@/entities/quiz';
import { paths } from '@/shared/config';
import { formatDateDayMonthYear, sx } from '@/shared/lib';

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
    gap: 1,
  },
});

type QuizTableProps = {
  quizzes: QuizListItem[];
};

export const QuizTable = ({ quizzes }: QuizTableProps) => {
  return (
    <TableContainer
      component={Paper}
      sx={styles.container}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={styles.headCell}>Quiz Title</TableCell>
            <TableCell sx={styles.headCell}>Last Updated</TableCell>
            <TableCell sx={styles.headCell}>Status</TableCell>
            <TableCell sx={styles.headCell}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
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
              <TableCell>{formatDateDayMonthYear(updatedAt)}</TableCell>
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
                    startIcon={<EditIcon />}
                  >
                    <Typography variant='body2'>Edit</Typography>
                  </Button>
                  <Button
                    size='small'
                    variant='text'
                    component={Link}
                    href={paths.quizViewById(id)}
                    disabled={!published}
                    startIcon={<VisibilityIcon />}
                  >
                    <Typography variant='body2'>View</Typography>
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
