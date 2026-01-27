'use client';

import { IconButton, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { sx } from '@/shared/lib';

const styles = sx({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 600,
  },
  subtitle: {
    color: 'text.secondary',
  },
});

type BlockPropertiesHeaderProps = {
  title: string;
  subtitle?: string;
  onClose?: () => void;
};

export const BlockPropertiesHeader = ({ title, subtitle, onClose }: BlockPropertiesHeaderProps) => {
  return (
    <Stack
      spacing={1}
      sx={styles.container}
    >
      <Stack spacing={0.5}>
        <Typography
          variant='subtitle1'
          sx={styles.title}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant='body2'
            sx={styles.subtitle}
          >
            {subtitle}
          </Typography>
        )}
      </Stack>
      {onClose && (
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      )}
    </Stack>
  );
};
