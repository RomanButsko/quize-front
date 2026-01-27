import { Box, Typography, TypographyProps } from '@mui/material';
import { sx } from '@/shared/lib';
import type { HeadingBlock as HeadingBlockType } from '../model/types';

type HeadingBlockProps = {
  block: HeadingBlockType;
};

const headingVariant = {
  h1: 'h4',
  h2: 'h5',
  h3: 'h6',
} as const satisfies Record<NonNullable<HeadingBlockType['level']>, TypographyProps['variant']>;

const styles = sx({
  root: {
    display: 'flex',
    maxWidth: { xs: '70%', md: '80%' },
  },
  text: {
    wordBreak: 'break-word',
    whiteSpace: 'normal',
  },
});

export const HeadingBlock = ({ block }: HeadingBlockProps) => (
  <Box sx={styles.root}>
    <Typography
      variant={headingVariant[block.level]}
      textAlign={block.align}
      sx={styles.text}
    >
      {block.text}
    </Typography>
  </Box>
);
