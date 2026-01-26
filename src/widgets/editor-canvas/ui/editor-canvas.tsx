import { Paper, Stack, Typography } from '@mui/material';
import { sx } from '@/shared/lib';

const styles = sx({
  panel: {
    p: 3,
    height: '100%',
    border: '1px dashed',
    borderColor: 'divider',
    borderRadius: 2,
  },
  placeholder: {
    color: 'text.secondary',
  },
});

export const EditorCanvas = () => {
  return (
    <Paper
      elevation={0}
      sx={styles.panel}
    >
      <Stack
        alignItems='center'
        justifyContent='center'
        height='100%'
        textAlign='center'
        spacing={1}
      >
        <Typography
          variant='subtitle1'
          sx={styles.placeholder}
        >
          Drag blocks here to build your quiz
        </Typography>
        <Typography
          variant='body2'
          sx={styles.placeholder}
        >
          Start by choosing a block from the left panel
        </Typography>
      </Stack>
    </Paper>
  );
};
