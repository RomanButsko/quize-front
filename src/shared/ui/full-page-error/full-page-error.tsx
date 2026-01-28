'use client';

import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { sx } from '@/shared/lib';

const styles = sx({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100dvh',
  },
});

type FullPageErrorProps = {
  error?: Error | unknown;
  message?: string;
  sx?: SxProps<Theme>;
};

export const FullPageError = ({ error, message, sx: sxProp }: FullPageErrorProps) => {
  const errorMessage = message ?? (error instanceof Error ? error.message : 'Something went wrong');

  return (
    <Box sx={[styles.root, ...(Array.isArray(sxProp) ? sxProp : [sxProp])]}>
      <Typography color='error'>{errorMessage}</Typography>
    </Box>
  );
};
