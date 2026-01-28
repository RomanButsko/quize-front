'use client';

import { Box, CircularProgress, type SxProps, type Theme } from '@mui/material';
import { sx } from '@/shared/lib';

const styles = sx({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100dvh',
  },
});

type FullPageLoaderProps = {
  sx?: SxProps<Theme>;
};

export const FullPageLoader = ({ sx: sxProp }: FullPageLoaderProps) => {
  return (
    <Box sx={[styles.root, ...(Array.isArray(sxProp) ? sxProp : [sxProp])]}>
      <CircularProgress />
    </Box>
  );
};
