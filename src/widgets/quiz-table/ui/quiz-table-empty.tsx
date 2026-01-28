import { TableCell, TableRow, Typography } from '@mui/material';
import { sx } from '@/shared/lib/mui/sx';

const styles = sx({
  cell: {
    textAlign: 'center',
    py: 6,
  },
});

export const QuizTableEmpty = () => {
  return (
    <TableRow>
      <TableCell
        colSpan={4}
        sx={styles.cell}
      >
        <Typography
          variant='body1'
          color='text.secondary'
        >
          No quizzes found
        </Typography>
      </TableCell>
    </TableRow>
  );
};
