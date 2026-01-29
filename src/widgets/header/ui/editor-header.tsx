'use client';

import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { sx } from '@/shared/lib';
import { InfoTooltip } from '@/shared/ui';
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
    alignItems: 'center',
  },
});

export const EditorHeader = () => {
  const { title, hasTitle, isButtonPresent, isSaveDisabled, isPublishDisabled, published, updateTitle } =
    useEditorActionsState();
  const { isSaving, isPublishing, isUnpublishing, handleSave, handlePublish, handleUnpublish } = useEditorMutations();

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
          {isSaveDisabled && (
            <InfoTooltip
              title='To save, the following conditions must be met:'
              items={[
                ...(!hasTitle ? ['Title is required'] : []),
                ...(!isButtonPresent ? ['At least one button is required in the quiz'] : []),
              ]}
            />
          )}
          <Button
            variant='outlined'
            disabled={isSaveDisabled || isSaving}
            onClick={handleSave}
            loading={isSaving}
          >
            Save
          </Button>
          <Button
            variant='contained'
            disabled={isPublishDisabled || isPublishing || isUnpublishing}
            onClick={published ? handleUnpublish : handlePublish}
            loading={isPublishing || isUnpublishing}
          >
            {published ? 'Unpublish' : 'Publish'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
