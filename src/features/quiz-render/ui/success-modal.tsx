'use client';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { sx } from '@/shared/lib';
import { paths } from '@/shared/config';

const styles = sx({
  content: {
    minWidth: { xs: 260, sm: 360 },
  },
  actions: {
    justifyContent: 'center',
    pb: 2,
  },
});

type SuccessModalProps = {
  open: boolean;
  onClose: () => void;
};

export const SuccessModal = ({ open, onClose }: SuccessModalProps) => {
  const router = useRouter();

  const handleBackHome = () => {
    onClose();
    router.push(paths.dashboard);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth='xs'
    >
      <DialogTitle>Quiz complete</DialogTitle>
      <DialogContent sx={styles.content}>
        <Typography variant='body2'>Congratulations! You have completed the quiz.</Typography>
      </DialogContent>
      <DialogActions sx={styles.actions}>
        <Button
          variant='contained'
          onClick={handleBackHome}
        >
          Back to Home
        </Button>
      </DialogActions>
    </Dialog>
  );
};
