'use client';

import { MouseEvent } from 'react';
import { Button, Divider, Paper, Stack } from '@mui/material';
import {
  BlockPropertiesHeader,
  ButtonFields,
  FooterFields,
  HeadingFields,
  QuestionFields,
  isBlockValid,
  getBlockTitle,
  type FieldChangeEvent,
  useBlockDraftActions,
  useBlockDraftState,
} from '@/features/quiz-block-properties';
import { BLOCK_TYPES, type ButtonBlock } from '@/entities/quiz-block/model/types';
import { sx } from '@/shared/lib';

const styles = sx({
  panel: {
    p: 2,
    height: '100%',
    border: 1,
    borderColor: 'divider',
    borderRadius: 2,
  },
  actions: {
    pt: 1,
  },
});

export const EditorPropertiesSidebar = () => {
  const { draft } = useBlockDraftState();
  const {
    setHeadingText,
    setFooterText,
    setQuestionLabel,
    addQuestionOption,
    setQuestionOptionLabel,
    setQuestionPlaceholder,
    setButtonLabel,
    setButtonVariant,
    setButtonAction,
    saveDraft,
    cancelDraft,
  } = useBlockDraftActions();

  const handleHeadingChange = (event: FieldChangeEvent) => {
    setHeadingText(event.target.value);
  };

  const handleFooterChange = (event: FieldChangeEvent) => {
    setFooterText(event.target.value);
  };

  const handleQuestionLabelChange = (event: FieldChangeEvent) => {
    setQuestionLabel(event.target.value);
  };

  const handleQuestionOptionChange = (optionId: string, event: FieldChangeEvent) => {
    setQuestionOptionLabel(optionId, event.target.value);
  };

  const handleQuestionPlaceholderChange = (event: FieldChangeEvent) => {
    setQuestionPlaceholder(event.target.value);
  };

  const handleButtonLabelChange = (event: FieldChangeEvent) => {
    setButtonLabel(event.target.value);
  };

  const handleButtonVariantChange = (_event: MouseEvent<HTMLElement>, value: ButtonBlock['variant'] | null) => {
    if (value) {
      setButtonVariant(value);
    }
  };

  const handleButtonActionChange = (_event: MouseEvent<HTMLElement>, value: ButtonBlock['action'] | null) => {
    if (value) {
      setButtonAction(value);
    }
  };

  if (!draft) {
    return (
      <Paper
        elevation={0}
        sx={styles.panel}
      >
        <BlockPropertiesHeader
          title='Properties'
          subtitle='Select a block to edit its properties'
        />
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={styles.panel}
    >
      <Stack spacing={2}>
        <BlockPropertiesHeader
          title={getBlockTitle(draft)}
          subtitle='Edit block properties'
          onClose={cancelDraft}
        />
        <Divider />
        {draft.type === BLOCK_TYPES.HEADING && (
          <HeadingFields
            block={draft}
            onChange={handleHeadingChange}
          />
        )}
        {draft.type === BLOCK_TYPES.QUESTION && (
          <QuestionFields
            block={draft}
            onLabelChange={handleQuestionLabelChange}
            onOptionChange={handleQuestionOptionChange}
            onAddOption={addQuestionOption}
            onPlaceholderChange={handleQuestionPlaceholderChange}
          />
        )}
        {draft.type === BLOCK_TYPES.BUTTON && (
          <ButtonFields
            block={draft}
            onLabelChange={handleButtonLabelChange}
            onVariantChange={handleButtonVariantChange}
            onActionChange={handleButtonActionChange}
          />
        )}
        {draft.type === BLOCK_TYPES.FOOTER && (
          <FooterFields
            block={draft}
            onChange={handleFooterChange}
          />
        )}
        <Divider />
        <Stack
          direction='row'
          spacing={1}
          sx={styles.actions}
        >
          <Button
            variant='contained'
            onClick={saveDraft}
            disabled={!isBlockValid(draft)}
          >
            Save
          </Button>
          <Button
            variant='outlined'
            onClick={cancelDraft}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};
