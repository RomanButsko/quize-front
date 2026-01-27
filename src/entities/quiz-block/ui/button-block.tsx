'use client';

import { Box, Button, type ButtonProps } from '@mui/material';
import { useRouter } from 'next/navigation';
import { sx } from '@/shared/lib';
import { paths } from '@/shared/config';
import type { ButtonBlock as ButtonBlockType } from '../model/types';

type ButtonBlockProps = {
  block: ButtonBlockType;
  buttonProps?: ButtonProps;
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

export const ButtonBlock = ({ block, buttonProps }: ButtonBlockProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (block.action === 'submit') {
      router.push(paths.dashboard);
    } else if (block.action === 'cancel') {
      router.back();
    }
  };

  return (
    <Box sx={[styles.root, { justifyContent: block.align ?? 'flex-start' }]}>
      <Button
        variant={block.variant}
        sx={styles.button}
        onClick={handleClick}
        {...buttonProps}
      >
        {block.label}
      </Button>
    </Box>
  );
};
