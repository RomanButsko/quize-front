import { Box, Button } from '@mui/material';
import { sx } from '@/shared/lib';
import type { ButtonBlock as ButtonBlockType } from '../model/types';

type ButtonBlockProps = {
  block: ButtonBlockType;
};

const styles = sx({
  root: {
    display: 'flex',
    maxWidth: { xs: '70%', md: '80%' },
  },
  button: {
    wordBreak: 'break-word',
    whiteSpace: 'normal',
  },
});

export const ButtonBlock = ({ block }: ButtonBlockProps) => (
  <Box sx={[styles.root, { justifyContent: block.align ?? 'flex-start' }]}>
    <Button
      variant={block.variant}
      sx={styles.button}
    >
      {block.label}
    </Button>
  </Box>
);
