'use client';

import { Box, Button, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { sx } from '@/shared/lib';
import { useEditorActionsState } from '../model/use-editor-actions-state';
import { useEditorMutations } from '../model/use-editor-mutations';

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
  const { title, isSaveDisabled, isPublishDisabled, isButtonPresent, updateTitle } = useEditorActionsState();
  const { isSaving, isPublishing, handleSave, handlePublish } = useEditorMutations();

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
          <Tooltip title={!isButtonPresent ? 'Button is required for quiz' : ''}>
            <span>
              <Button
                variant='outlined'
                disabled={isSaveDisabled || isSaving}
                onClick={handleSave}
                loading={isSaving}
              >
                Save
              </Button>
            </span>
          </Tooltip>
          <Button
            variant='contained'
            disabled={isPublishDisabled || isPublishing}
            onClick={handlePublish}
            loading={isPublishing}
          >
            Publish
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
