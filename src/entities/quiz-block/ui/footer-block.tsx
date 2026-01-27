import { Box, Typography, type TypographyProps } from '@mui/material';
import { sx } from '@/shared/lib';
import type { FooterBlock as FooterBlockType } from '../model/types';

type FooterBlockProps = {
  block: FooterBlockType;
  typographyProps?: TypographyProps;
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

export const FooterBlock = ({ block, typographyProps }: FooterBlockProps) => (
  <Box sx={[styles.root, { justifyContent: block.align ?? 'flex-start' }]}>
    <Typography
      variant='body2'
      sx={styles.text}
      textAlign={block.align}
      {...typographyProps}
    >
      {block.text}
    </Typography>
  </Box>
);
