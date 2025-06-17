import { BADGE_ERROR_MESSAGE } from '@/constants';
import { authApiClient, authInfiniteApiClient } from '@/utils/api-client';
import { ApiError } from '@/utils/error';
import { Badge, EditBadge, PaginationMeta } from '../schemas';

export const sendTeamBadge = async (token: string, receiverTeamId: number) => {
  return authApiClient(`/api/teams/${receiverTeamId}/badge`, token, {
    method: 'PATCH',
  });
};

export const getMyBadges = async (
  token: string,
  cursorId: number | null,
  cursorCount: number | null,
  pageSize: number = 20,
) => {
  return authInfiniteApiClient<Badge, PaginationMeta>(
    `/api/teams/received-badges?page-size=${pageSize}${cursorId ? `&cursor-id=${cursorId}` : ''}${cursorCount ? `&cursor-count=${cursorCount}` : ''}`,
    token,
  );
};

export const editBadge = async (
  token: string,
  teamId: number,
  editBadgeData: EditBadge,
) => {
  try {
    const response = await authApiClient(
      `/api/teams/${teamId}/badge-image`,
      token,
      {
        method: 'POST',
        body: editBadgeData,
      },
    );

    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.statusCode === 400) {
        throw new ApiError(error.statusCode, BADGE_ERROR_MESSAGE.IN_PROGRESS);
      }
    }

    throw error;
  }
};
