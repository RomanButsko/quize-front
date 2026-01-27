import { CheckboxInput, QuestionInput, RadioInput } from '../model/types';

export const hasOptions = (input: QuestionInput): input is RadioInput | CheckboxInput => {
  return input.type === 'radio' || input.type === 'checkbox';
};
