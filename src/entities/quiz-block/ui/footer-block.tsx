import { Box, Typography } from '@mui/material';
import { sx } from '@/shared/lib';
import type { FooterBlock as FooterBlockType } from '../model/types';

type FooterBlockProps = {
  block: FooterBlockType;
};

const styles = sx({
  root: {
    display: 'flex',
  },
  text: {
    color: 'text.secondary',
  },
});

export const FooterBlock = ({ block }: FooterBlockProps) => {
  return (
    <Box sx={[styles.root, { justifyContent: block.align ?? 'flex-start' }]}>
      <Typography
        variant='body2'
        sx={styles.text}
        textAlign={block.align}
      >
        {block.text}
      </Typography>
    </Box>
  );
};
