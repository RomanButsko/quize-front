import { Box, Button } from '@mui/material';
import { sx } from '@/shared/lib';
import type { ButtonBlock as ButtonBlockType } from '../model/types';

type ButtonBlockProps = {
  block: ButtonBlockType;
};

const styles = sx({
  root: {
    display: 'flex',
  },
});

export const ButtonBlock = ({ block }: ButtonBlockProps) => {
  return (
    <Box sx={[styles.root, { justifyContent: block.align ?? 'flex-start' }]}>
      <Button variant={block.variant}>{block.label}</Button>
    </Box>
  );
};
