'use client';

import { Button, Stack, TextField, Typography } from '@mui/material';
import { hasOptions } from '@/entities/quiz-block/lib';
import type { QuestionBlock } from '@/entities/quiz-block/model/types';
import { sx } from '@/shared/lib';
import { FieldChangeEvent } from '../model/types';

const styles = sx({
  sectionTitle: {
    fontWeight: 600,
  },
});

type QuestionFieldsProps = {
  block: QuestionBlock;
  onLabelChange: (event: FieldChangeEvent) => void;
  onOptionChange: (optionId: string, event: FieldChangeEvent) => void;
  onAddOption: () => void;
  onPlaceholderChange: (event: FieldChangeEvent) => void;
};

export const QuestionFields = ({
  block,
  onLabelChange,
  onOptionChange,
  onAddOption,
  onPlaceholderChange,
}: QuestionFieldsProps) => {
  const options = hasOptions(block.input) ? block.input.options : null;

  return (
    <Stack spacing={1.5}>
      <Typography
        variant='subtitle2'
        sx={styles.sectionTitle}
      >
        Question
      </Typography>
      <TextField
        label='Label'
        size='small'
        value={block.question}
        onChange={onLabelChange}
      />
      {options ? (
        <Stack spacing={2.5}>
          <Typography
            variant='subtitle2'
            sx={styles.sectionTitle}
          >
            Options
          </Typography>
          {options.map((option, index) => (
            <TextField
              key={option.id}
              label={`Option ${index + 1}`}
              size='small'
              value={option.label}
              onChange={(event) => onOptionChange(option.id, event)}
            />
          ))}
          <Button
            size='small'
            variant='outlined'
            onClick={onAddOption}
          >
            Add option
          </Button>
        </Stack>
      ) : (
        block.input.type === 'text' && (
          <TextField
            label='Placeholder'
            size='small'
            value={block.input.placeholder ?? ''}
            onChange={onPlaceholderChange}
          />
        )
      )}
    </Stack>
  );
};
