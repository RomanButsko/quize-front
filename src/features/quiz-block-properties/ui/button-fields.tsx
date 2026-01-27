'use client';

import { Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import type { ButtonBlock } from '@/entities/quiz-block/model/types';
import { sx } from '@/shared/lib';
import { FieldChangeEvent } from '../model/types';

const styles = sx({
  sectionTitle: {
    fontWeight: 600,
  },
  helper: {
    color: 'text.secondary',
  },
});

type ButtonFieldsProps = {
  block: ButtonBlock;
  onLabelChange: (event: FieldChangeEvent) => void;
  onVariantChange: (event: React.MouseEvent<HTMLElement>, value: ButtonBlock['variant'] | null) => void;
};

export const ButtonFields = ({ block, onLabelChange, onVariantChange }: ButtonFieldsProps) => {
  return (
    <Stack spacing={1.5}>
      <Typography
        variant='subtitle2'
        sx={styles.sectionTitle}
      >
        Button
      </Typography>
      <TextField
        label='Label'
        size='small'
        value={block.label}
        onChange={onLabelChange}
      />
      <Stack spacing={0.75}>
        <Typography
          variant='caption'
          sx={styles.helper}
        >
          Variant
        </Typography>
        <ToggleButtonGroup
          size='small'
          exclusive
          value={block.variant}
          onChange={onVariantChange}
        >
          <ToggleButton value='contained'>Contained</ToggleButton>
          <ToggleButton value='outlined'>Outlined</ToggleButton>
          <ToggleButton value='text'>Text</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Stack>
  );
};
