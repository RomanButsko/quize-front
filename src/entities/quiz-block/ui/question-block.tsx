import {
  Box,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Checkbox,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { sx } from '@/shared/lib';
import type { QuestionBlock as QuestionBlockType, QuestionOption } from '../model/types';
import { hasOptions } from '../lib';

type QuestionBlockProps = {
  block: QuestionBlockType;
};

const placeholderOptions: QuestionOption[] = [
  { id: crypto.randomUUID(), label: 'Option A' },
  { id: crypto.randomUUID(), label: 'Option B' },
];

const styles = sx({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1.5,
    maxWidth: { xs: '70%', md: '80%' },
  },
  title: {
    fontWeight: 600,
    wordBreak: 'break-word',
    whiteSpace: 'normal',
  },
  helper: {
    color: 'text.secondary',
  },
  option: {
    '& .MuiFormControlLabel-label': {
      wordBreak: 'break-word',
      whiteSpace: 'normal',
    },
  },
});

export const QuestionBlock = ({ block }: QuestionBlockProps) => {
  const options = hasOptions(block.input) && block.input.options.length > 0 ? block.input.options : placeholderOptions;

  return (
    <Box sx={styles.root}>
      <Stack spacing={0.5}>
        <Typography
          variant='subtitle1'
          sx={styles.title}
        >
          {block.question}
        </Typography>
        {block.required && (
          <Typography
            variant='caption'
            sx={styles.helper}
          >
            Required
          </Typography>
        )}
      </Stack>
      {block.input.type === 'radio' && (
        <RadioGroup>
          {options.map((option) => (
            <FormControlLabel
              key={option.id}
              value={option.id}
              control={<Radio />}
              label={option.label}
              sx={styles.option}
            />
          ))}
        </RadioGroup>
      )}
      {block.input.type === 'checkbox' && (
        <FormGroup>
          {options.map((option) => (
            <FormControlLabel
              key={option.id}
              control={<Checkbox />}
              label={option.label}
              sx={styles.option}
            />
          ))}
        </FormGroup>
      )}
      {block.input.type === 'text' && (
        <TextField
          placeholder={block.input.placeholder ?? 'Type your answer'}
          size='small'
          disabled
        />
      )}
    </Box>
  );
};
