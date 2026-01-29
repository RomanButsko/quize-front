'use client';

import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { EditorHeader } from '@/widgets/header';
import { EditorLeftSidebar } from '@/widgets/editor-left-sidebar';
import { EditorCanvas } from '@/widgets/editor-canvas';
import { EditorPropertiesSidebar } from '@/widgets/editor-properties-sidebar';
import { EditorDndContext } from '@/features/quiz-editor';
import { BlockDraftProvider } from '@/features/quiz-block-properties';
import { sx } from '@/shared/lib';
import { FullPageError, FullPageLoader, HEADER_HEIGHT } from '@/shared/ui';
import { useInitializeEditor } from '../model/use-initialize-editor';

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
      md: 220,
      lg: 260,
    },
    minHeight: {
      xs: 240,
      md: 'auto',
    },
  },
  sidebarSticky: {
    position: {
      md: 'sticky',
    },
    top: {
      md: HEADER_HEIGHT + 24,
    },
    maxHeight: {
      md: `calc(100dvh - ${HEADER_HEIGHT}px)`,
    },
    overflowY: {
      md: 'auto',
    },
  },
  canvas: {
    minHeight: {
      xs: 360,
      md: 'auto',
    },
    maxHeight: {
      xs: 440,
      md: '100%',
    },
  },
  right: {
    width: {
      md: 220,
      lg: 300,
    },
    minHeight: {
      xs: 200,
      md: 'auto',
    },
  },
});

type EditorLayoutProps = {
  quizId?: string;
};

export const EditorLayout = ({ quizId }: EditorLayoutProps) => {
  const { isLoading, isError, error } = useInitializeEditor({ quizId });

  if (isLoading) {
    return <FullPageLoader sx={styles.root} />;
  }

  if (isError) {
    return (
      <FullPageError
        error={error}
        message='Failed to load quiz'
        sx={styles.root}
      />
    );
  }

  return (
    <Box sx={styles.root}>
      <EditorHeader />
      <Grid
        container
        spacing={2}
        sx={styles.content}
      >
        <BlockDraftProvider>
          <EditorDndContext>
            <Grid
              size={{ xs: 12, md: 'auto' }}
              sx={styles.left}
            >
              <Box sx={styles.sidebarSticky}>
                <EditorLeftSidebar />
              </Box>
            </Grid>
            <Grid
              size={{ xs: 12, md: 'grow' }}
              sx={styles.canvas}
            >
              <EditorCanvas />
            </Grid>
          </EditorDndContext>
          <Grid
            size={{ xs: 12, md: 'auto' }}
            sx={styles.right}
          >
            <Box sx={styles.sidebarSticky}>
              <EditorPropertiesSidebar />
            </Box>
          </Grid>
        </BlockDraftProvider>
      </Grid>
    </Box>
  );
};
