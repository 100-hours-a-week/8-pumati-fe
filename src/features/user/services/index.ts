import { apiClient, authApiClient } from '@/utils/api-client';
import {
  Attendance,
  AttendanceState,
  Team,
  UserProfileEditData,
} from '../schemas';

export const checkAttendance = async (token: string) => {
  return authApiClient<Attendance>('/api/attendances', token, {
    method: 'POST',
  }).then((res) => res.data);
};

export const getAttendanceState = async (token: string) => {
  return authApiClient<AttendanceState>('/api/attendances', token).then(
    (res) => res.data,
  );
};

export const getDashboard = async (teamId: number) => {
  return apiClient<Team>(`/api/teams/${teamId}`).then((res) => res.data);
};

export const editUserProfile = async (
  token: string,
  userData: UserProfileEditData,
) => {
  return authApiClient('/api/members/me', token, {
    method: 'PUT',
    body: userData,
  });
};

export const withdraw = async (token: string) => {
  return authApiClient('/api/members/me', token, {
    method: 'DELETE',
    credentials: 'include',
  });
};
