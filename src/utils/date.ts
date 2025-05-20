import { formatDate, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export const dateYYYYMMDD = (date: string) => formatDate(date, 'yyyy.MM.dd');

export const dateDistance = (date: string) =>
  formatDistanceToNow(new Date(date), {
    locale: ko,
  });
