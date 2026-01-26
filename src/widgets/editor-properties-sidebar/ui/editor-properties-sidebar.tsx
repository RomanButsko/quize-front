import { Paper, Stack, Typography } from '@mui/material';
import { sx } from '@/shared/lib';

const styles = sx({
  panel: {
    p: 2,
    height: '100%',
    border: 1,
    borderColor: 'divider',
    borderRadius: 2,
  },
  title: {
    fontWeight: 600,
  },
  placeholder: {
    color: 'text.secondary',
  },
});

export const EditorPropertiesSidebar = () => {
  return (
    <Paper
      elevation={0}
      sx={styles.panel}
    >
      <Stack spacing={2}>
        <Typography
          variant='subtitle1'
          sx={styles.title}
        >
          Properties
        </Typography>
        <Typography
          variant='body2'
          sx={styles.placeholder}
        >
          Select a block to edit its properties
        </Typography>
      </Stack>
    </Paper>
  );
};
