import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { sx } from '@/shared/lib';

const styles = sx({
  root: {
    borderBottom: 1,
    borderColor: 'divider',
  },
  content: {
    px: {
      xs: 2,
      md: 3,
    },
    py: 2,
    gap: 2,
    alignItems: 'center',
  },
  title: {
    fontWeight: 600,
    color: 'text.primary',
  },
  input: {
    minWidth: {
      xs: '100%',
      md: 320,
    },
    flex: 1,
  },
  actions: {
    gap: 1,
    flexWrap: 'wrap',
  },
});

export const EditorHeader = () => {
  return (
    <Box sx={styles.root}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        sx={styles.content}
      >
        <Typography
          variant='subtitle1'
          sx={styles.title}
        >
          Quiz Editor
        </Typography>
        <TextField
          size='small'
          placeholder='Quiz title'
          sx={styles.input}
        />
        <Stack
          direction='row'
          sx={styles.actions}
        >
          <Button variant='outlined'>Save</Button>
          <Button variant='contained'>Publish</Button>
        </Stack>
      </Stack>
    </Box>
  );
};
