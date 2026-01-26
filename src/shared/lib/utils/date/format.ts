import { format } from 'date-fns';

export const formatDateDayMonthYear = (value: string) => format(new Date(value), 'dd.MM.yyyy');
