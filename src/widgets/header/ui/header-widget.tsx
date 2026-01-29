'use client';

import { useRouter } from 'next/navigation';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { sx } from '@/shared/lib';
import { useMobile } from '@/shared/providers';
import { paths } from '@/shared/config';

const styles = sx({
  appBar: {
    borderBottom: 1,
    borderColor: 'divider',
    backgroundColor: 'background.paper',
  },
  toolbar: {
    minHeight: 64,
    px: {
      xs: 2,
      md: 3,
    },
    gap: 2,
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    minWidth: 0,
    cursor: 'pointer',
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    backgroundColor: 'primary.main',
    color: 'primary.contrastText',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    flexShrink: 0,
  },
  brand: {
    fontWeight: 700,
    color: 'text.primary',
  },
});

export const Header = () => {
  const router = useRouter();
  const { isMobile } = useMobile();

  return (
    <>
      <AppBar
        position='fixed'
        elevation={0}
        sx={styles.appBar}
      >
        <Toolbar
          disableGutters
          sx={styles.toolbar}
        >
          <Box
            sx={styles.left}
            onClick={() => router.push(paths.dashboard)}
          >
            <Box sx={styles.logo}>
              <Typography variant='subtitle2'>Q</Typography>
            </Box>
            {!isMobile && (
              <Typography
                variant='h6'
                noWrap
                sx={styles.brand}
              >
                QuizBuilder
              </Typography>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {/* Spacer to offset content below fixed header */}
      <Toolbar sx={styles.toolbar} />
    </>
  );
};
