import { DEFAULT_DEV_LUCK } from '@/constants';
import { atom } from 'jotai';

export const devLuckAtom = atom<string>(DEFAULT_DEV_LUCK);
