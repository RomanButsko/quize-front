import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { EditorHeader } from '@/widgets/header';
import { EditorLeftSidebar } from '@/widgets/editor-left-sidebar';
import { EditorCanvas } from '@/widgets/editor-canvas';
import { EditorPropertiesSidebar } from '@/widgets/editor-properties-sidebar';
import { sx } from '@/shared/lib';
import { HEADER_HEIGHT } from '@/shared/ui';

const styles = sx({
  root: {
    minHeight: `calc(100dvh - ${HEADER_HEIGHT}px)`,
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    p: {
      xs: 2,
      md: 3,
    },
  },
  left: {
    width: {
      lg: 260,
    },
    minHeight: {
      xs: 240,
      lg: 'auto',
    },
  },
  canvas: {
    minHeight: {
      xs: 360,
      lg: 'auto',
    },
  },
  right: {
    width: {
      lg: 300,
    },
    minHeight: {
      xs: 200,
      lg: 'auto',
    },
  },
});

export const EditorLayout = () => {
  return (
    <Box sx={styles.root}>
      <EditorHeader />
      <Grid
        container
        spacing={2}
        sx={styles.content}
      >
        <Grid
          size={{ xs: 12, lg: 'auto' }}
          sx={styles.left}
        >
          <EditorLeftSidebar />
        </Grid>
        <Grid
          size={{ xs: 12, lg: 'grow' }}
          sx={styles.canvas}
        >
          <EditorCanvas />
        </Grid>
        <Grid
          size={{ xs: 12, lg: 'auto' }}
          sx={styles.right}
        >
          <EditorPropertiesSidebar />
        </Grid>
      </Grid>
    </Box>
  );
};
