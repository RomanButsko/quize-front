'use client';

import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useAppSelector } from '@/shared/store/hooks';
import { sx } from '@/shared/lib';
import { useEditorActionsState } from '../model/use-editor-actions-state';

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
  const { title, isSaveDisabled, isPublishDisabled, updateTitle } = useEditorActionsState();

  const quizeData = useAppSelector((state) => state.editor);

  const handlePublish = (action: 'save' | 'publish') => {
    if (action === 'save') {
      console.log('save', { blocks: quizeData.blocks, title: quizeData.title, type: 'draft' });
    } else {
      console.log('publish', { blocks: quizeData.blocks, title: quizeData.title, type: 'published' });
    }
  };

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
          value={title}
          onChange={(event) => updateTitle(event.target.value)}
        />
        <Stack
          direction='row'
          sx={styles.actions}
        >
          <Button
            variant='outlined'
            disabled={isSaveDisabled}
            onClick={() => handlePublish('save')}
          >
            Save
          </Button>
          <Button
            variant='contained'
            disabled={isPublishDisabled}
            onClick={() => handlePublish('publish')}
          >
            Publish
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
