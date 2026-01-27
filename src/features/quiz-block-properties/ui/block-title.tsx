import { Typography } from '@mui/material';
import type { QuizBlock } from '@/entities/quiz-block/model/types';
import { getBlockTitle } from '../lib/get-block-title';

export const BlockTitle = (block: QuizBlock) => <Typography variant='subtitle1'>{getBlockTitle(block)}</Typography>;
