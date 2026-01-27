import { Stack, Typography } from '@mui/material';
import { sx } from '@/shared/lib';

const styles = sx({
  placeholder: {
    color: 'text.secondary',
  },
});

export const EmptyEditorCanvas = () => (
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
);
