import { formatDate } from 'date-fns';

export const dateYYYYMMDD = (date: string) => formatDate(date, 'yyyy.MM.dd');
