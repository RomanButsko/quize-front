import { Box, Typography } from '@mui/material';
import { sx } from '@/shared/lib';
import type { FooterBlock as FooterBlockType } from '../model/types';

type FooterBlockProps = {
  block: FooterBlockType;
};

const styles = sx({
  root: {
    display: 'flex',
    maxWidth: { xs: '70%', md: '80%' },
  },
  text: {
    color: 'text.secondary',
    wordBreak: 'break-word',
    whiteSpace: 'normal',
  },
});

export const FooterBlock = ({ block }: FooterBlockProps) => (
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
