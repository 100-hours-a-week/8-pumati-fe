import { authApiClient, infiniteApiClient } from '@/utils/api-client';
import { CommentItem, CreateComment } from '../schemas';

export const createComment = async (
  projectId: number,
  commentData: CreateComment,
  token: string,
) => {
  return authApiClient(`/api/projects/${projectId}/comments`, token, {
    method: 'POST',
    body: commentData,
  }).then((res) => res.data);
};

export const getComments = async (
  projectId: number,
  cursorTime: string | null,
  cursorId: number = 0,
  pageSize: number = 10,
) => {
  return infiniteApiClient<CommentItem>(
    `/api/projects/${projectId}/comments?cursor-id=${cursorId}${cursorTime ? `&cursor-time=${cursorTime}` : ''}&page-size=${pageSize}`,
  );
};

export const editComment = async (
  commentId: number,
  content: CreateComment,
  token: string,
) => {
  return authApiClient(`/api/comments/${commentId}`, token, {
    method: 'PUT',
    body: content,
  });
};

export const deleteComment = async (commentId: number, token: string) => {
  return authApiClient(`/api/comments/${commentId}`, token, {
    method: 'DELETE',
  }).then((res) => res.data);
};
