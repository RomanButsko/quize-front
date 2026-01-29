'use client';

import { useState } from 'react';
import { Box, Stack } from '@mui/material';
import type { Quiz } from '@/entities/quiz/model/types';
import { renderQuizBlock } from '@/entities/quiz-block/lib';
import { sx } from '@/shared/lib';
import { SuccessModal } from './success-modal';

const styles = sx({
  root: {
    gap: 2.5,
  },
});

type QuizRendererProps = {
  quiz: Quiz;
};

export const QuizRenderer = ({ quiz }: QuizRendererProps) => {
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const handleSubmit = () => {
    setIsSuccessOpen(true);
  };

  const handleClose = () => {
    setIsSuccessOpen(false);
  };

  return (
    <>
      <Stack sx={styles.root}>
        {quiz.blocks.map((block) => {
          if (block.type === 'button' && block.action === 'submit') {
            return (
              <Box key={block.id}>
                {renderQuizBlock(block, {
                  buttonProps: {
                    onClick: handleSubmit,
                    disabled: !quiz.published,
                  },
                  tooltipTitle: !quiz.published
                    ? 'Quiz is not published, please publish it first to submit'
                    : undefined,
                })}
              </Box>
            );
          }

          return <Box key={block.id}>{renderQuizBlock(block)}</Box>;
        })}
      </Stack>
      <SuccessModal
        open={isSuccessOpen}
        onClose={handleClose}
      />
    </>
  );
};
