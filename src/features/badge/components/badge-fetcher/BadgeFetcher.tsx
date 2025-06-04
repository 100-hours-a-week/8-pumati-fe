'use client';

import { accessTokenAtom } from '@/store';
import { useAtomValue } from 'jotai';
import { useMyBadges } from '../../hooks';
import { BadgesContainer } from '../badges-container';

export function BadgeFetcher() {
  const accessToken = useAtomValue(accessTokenAtom);

  const { data, isLoading } = useMyBadges(accessToken);
  const badges = data?.pages.flatMap((page) => page.data) ?? [];

  return <BadgesContainer badges={badges} />;
}
