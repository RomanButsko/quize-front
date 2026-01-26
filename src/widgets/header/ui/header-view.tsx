import Link from 'next/link';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { sx } from '@/shared/lib';
import { useMobile } from '@/shared/providers';

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
  center: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  navButton: {
    fontWeight: 600,
    color: 'text.secondary',
  },
  navButtonActive: {
    color: 'primary.main',
  },
  primaryButton: {
    fontWeight: 600,
  },
});

type HeaderViewProps = {
  isDashboardActive: boolean;
  dashboardPath: string;
  createQuizPath: string;
};

export const HeaderView = ({ isDashboardActive, dashboardPath, createQuizPath }: HeaderViewProps) => {
  const { isMobile } = useMobile();

  return (
    <AppBar
      position='static'
      elevation={0}
      sx={styles.appBar}
    >
      <Toolbar
        disableGutters
        sx={styles.toolbar}
      >
        <Box sx={styles.left}>
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

        <Box sx={styles.center}>
          <Button
            component={Link}
            href={dashboardPath}
            sx={[styles.navButton, isDashboardActive && styles.navButtonActive]}
          >
            Quiz Dashboard
          </Button>
        </Box>

        {isMobile ? (
          <IconButton
            component={Link}
            href={createQuizPath}
          >
            <CreateIcon color='primary' />
          </IconButton>
        ) : (
          <Button
            component={Link}
            href={createQuizPath}
            variant='contained'
            sx={styles.primaryButton}
          >
            Create New Quiz
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
