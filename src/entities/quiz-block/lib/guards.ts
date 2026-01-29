import { QUESTION_INPUT_TYPES, CheckboxInput, QuestionInput, RadioInput } from '../model/types';

export const hasOptions = (input: QuestionInput): input is RadioInput | CheckboxInput => {
  return input.type === QUESTION_INPUT_TYPES.RADIO || input.type === QUESTION_INPUT_TYPES.CHECKBOX;
};
