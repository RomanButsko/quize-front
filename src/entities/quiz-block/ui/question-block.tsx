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
  TextFieldProps,
  FormGroupProps,
  RadioGroupProps,
} from '@mui/material';
import { usePathname } from 'next/navigation';
import { sx } from '@/shared/lib';
import type { QuestionBlock as QuestionBlockType, QuestionOption } from '../model/types';
import { hasOptions } from '../lib';

type QuestionBlockProps = {
  block: QuestionBlockType;
  radioGroupProps?: RadioGroupProps;
  formGroupProps?: FormGroupProps;
  textFieldProps?: TextFieldProps;
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

export const QuestionBlock = ({ block, radioGroupProps, formGroupProps, textFieldProps }: QuestionBlockProps) => {
  const pathname = usePathname();

  const options = hasOptions(block.input) && block.input.options.length > 0 ? block.input.options : placeholderOptions;

  const isViewing = !pathname.includes('edit');

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
        <RadioGroup {...radioGroupProps}>
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
        <FormGroup {...formGroupProps}>
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
          disabled={!isViewing}
          {...textFieldProps}
        />
      )}
    </Box>
  );
};
