import { Term } from '@/features/subscribe/components';

export const AUTH_QUERY_KEY = Object.freeze({
  TEAM_LIST: ['team-list'],
  REFRESH: ['refresh'],
});

export const USER_QUERY_KEY = Object.freeze({
  ATTENDANCE_STATE: ['attendance-state'],
  DASHBOARD: (teamId: number) => ['dashboard', teamId],
  BADGES: ['badges'],
});

export const PROJECT_QUERY_KEY = Object.freeze({
  RANKED_PROJECTS: ['projects', 'rank'],
  CHECK_PROJECT_EXISTS: ['projects', 'existence'],
  SUBSCRIPTION_DATA: ['projects', 'subscription'],
  SUBSCRIBED_PROJECTS: (term: Term) => ['projects', 'subscription', term],
  CHECK_SUBSCRIPTION: (projectId: number) => [
    'projects',
    'subscription',
    'check',
    projectId,
  ],
});

export const COMMENT_QUERY_KEY = Object.freeze({
  COMMENTS: (projectId: number) => ['comments', projectId],
});

export const CHATBOT_QUERY_KEY = Object.freeze({
  SESSION_ID: ['chatbot', 'session-id'],
});
