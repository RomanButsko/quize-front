'use client';

import { Stack, TextField, Typography } from '@mui/material';
import type { FooterBlock } from '@/entities/quiz-block/model/types';
import { sx } from '@/shared/lib';
import { FieldChangeEvent } from '../model/types';

const styles = sx({
  sectionTitle: {
    fontWeight: 600,
  },
});

type FooterFieldsProps = {
  block: FooterBlock;
  onChange: (event: FieldChangeEvent) => void;
};

export const FooterFields = ({ block, onChange }: FooterFieldsProps) => {
  return (
    <Stack spacing={1.5}>
      <Typography
        variant='subtitle2'
        sx={styles.sectionTitle}
      >
        Footer
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
