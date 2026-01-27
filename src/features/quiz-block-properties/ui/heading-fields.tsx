'use client';

import { Stack, TextField, Typography } from '@mui/material';
import type { HeadingBlock } from '@/entities/quiz-block/model/types';
import { sx } from '@/shared/lib';
import { FieldChangeEvent } from '../model/types';

const styles = sx({
  sectionTitle: {
    fontWeight: 600,
  },
});

type HeadingFieldsProps = {
  block: HeadingBlock;
  onChange: (event: FieldChangeEvent) => void;
};

export const HeadingFields = ({ block, onChange }: HeadingFieldsProps) => {
  return (
    <Stack spacing={1.5}>
      <Typography
        variant='subtitle2'
        sx={styles.sectionTitle}
      >
        Heading
      </Typography>
      <TextField
        label='Text'
        size='small'
        value={block.text}
        onChange={onChange}
      />
    </Stack>
  );
};
