'use client';

import { Box, Button as MuiButton, Tooltip, type ButtonProps } from '@mui/material';
import { useRouter } from 'next/navigation';
import { sx } from '@/shared/lib';
import { paths } from '@/shared/config';
import type { ButtonBlock as ButtonBlockType } from '../model/types';

type ButtonBlockProps = {
  block: ButtonBlockType;
  buttonProps?: ButtonProps;
  tooltipTitle?: string;
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

export const ButtonBlock = ({ block, buttonProps, tooltipTitle }: ButtonBlockProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (block.action === 'submit') {
      router.push(paths.dashboard);
    } else if (block.action === 'cancel') {
      router.back();
    }
  };

  const Button = (
    <MuiButton
      variant={block.variant}
      sx={styles.button}
      onClick={handleClick}
      {...buttonProps}
    >
      {block.label}
    </MuiButton>
  );

  return (
    <Box sx={[styles.root, { justifyContent: block.align ?? 'flex-start' }]}>
      {tooltipTitle ? (
        <Tooltip
          title={tooltipTitle}
          placement='right-start'
        >
          <span>{Button}</span>
        </Tooltip>
      ) : (
        Button
      )}
    </Box>
  );
};
