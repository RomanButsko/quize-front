'use client';

import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import { blockFactories } from '@/features/quiz-editor';
import { SidebarDraggableItem } from '@/features/quiz-editor';
import { sx } from '@/shared/lib';

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
  sectionTitle: {
    fontWeight: 600,
    color: 'text.secondary',
    textTransform: 'uppercase',
  },
});

const contentBlocks = blockFactories.filter((block) => block.group === 'content');
const questionBlocks = blockFactories.filter((block) => block.group === 'questions');

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
          <Stack spacing={1.5}>
            <Typography
              variant='caption'
              sx={styles.sectionTitle}
            >
              Content
            </Typography>
            <Stack spacing={1}>
              {contentBlocks.map((block) => (
                <SidebarDraggableItem
                  key={block.id}
                  factoryId={block.id}
                  label={block.label}
                  required={block.required}
                />
              ))}
            </Stack>
            <Divider />
            <Typography
              variant='caption'
              sx={styles.sectionTitle}
            >
              Questions
            </Typography>
            <Stack spacing={1}>
              {questionBlocks.map((block) => (
                <SidebarDraggableItem
                  key={block.id}
                  factoryId={block.id}
                  label={block.label}
                  required={block.required}
                />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};
