'use client';

import { DropdownOption } from '@/components';
import { AUTH_QUERY_KEY } from '@/constants';
import { getTeamList } from '@/features/auth/services';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export function useTeamList() {
  const { data: teamList, error } = useSuspenseQuery({
    queryKey: AUTH_QUERY_KEY.TEAM_LIST,
    queryFn: getTeamList,
  });

  const termOptions = useMemo(
    () =>
      teamList!.map(({ term }) => ({
        label: `${term}기`,
        value: term,
      })),
    [teamList],
  );
  const teamNumberOptions = useMemo(
    () =>
      teamList!.reduce<Record<number, DropdownOption[]>>(
        (prev, { term, teamNumbers }) => {
          prev[term] = teamNumbers.map((number) => ({
            label: `${number}팀`,
            value: number,
          }));
          return prev;
        },
        {},
      ),
    [teamList],
  );

  return { termOptions, teamNumberOptions, error };
}
