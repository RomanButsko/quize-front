import { Box, Paper, Stack, Typography } from '@mui/material';
import { sx } from '@/shared/lib';

const blocks = ['Heading', 'Question', 'Button', 'Footer'];

const styles = sx({
  root: {
    height: '100%',
  },
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
  item: {
    px: 1.5,
    py: 1,
    borderRadius: 1,
    border: 1,
    borderColor: 'divider',
    cursor: 'grab',
    userSelect: 'none',
  },
});

export const EditorLeftSidebar = () => {
  return (
    <Box sx={styles.root}>
      <Paper
        elevation={0}
        sx={styles.panel}
      >
        <Stack spacing={2}>
          <Typography
            variant='subtitle1'
            sx={styles.title}
          >
            Building blocks
          </Typography>
          <Stack spacing={1}>
            {blocks.map((block) => (
              <Box
                key={block}
                sx={styles.item}
              >
                <Typography variant='body2'>{block}</Typography>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};
