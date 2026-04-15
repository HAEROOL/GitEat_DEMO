import { http, HttpResponse } from "msw";
import {
  SENIOR_FE,
  FE_REVIEWER,
  BE_REVIEWER,
  QA_REVIEWER,
  AI_REVIEWER,
} from "../dummies/personas";

const API_BASE = import.meta.env.VITE_API_BASE || "";

const reviewers = {
  reviewer: [
    {
      userId: SENIOR_FE.userId,
      userName: SENIOR_FE.username,
      name: SENIOR_FE.displayName,
      avatarUrl: SENIOR_FE.avatarUrl,
      commentType: 0,
    },
    {
      userId: FE_REVIEWER.userId,
      userName: FE_REVIEWER.username,
      name: FE_REVIEWER.displayName,
      avatarUrl: FE_REVIEWER.avatarUrl,
      commentType: 0,
    },
    {
      userId: BE_REVIEWER.userId,
      userName: BE_REVIEWER.username,
      name: BE_REVIEWER.displayName,
      avatarUrl: BE_REVIEWER.avatarUrl,
      commentType: 1,
    },
    {
      userId: QA_REVIEWER.userId,
      userName: QA_REVIEWER.username,
      name: QA_REVIEWER.displayName,
      avatarUrl: QA_REVIEWER.avatarUrl,
      commentType: 0,
    },
    {
      userId: AI_REVIEWER.userId,
      userName: AI_REVIEWER.username,
      name: AI_REVIEWER.displayName,
      avatarUrl: AI_REVIEWER.avatarUrl,
      commentType: 0,
    },
  ],
};

const reviewersHandlers = [
  http.get(`${API_BASE}/pr/:repoId/:prId/reviewer`, () => {
    return HttpResponse.json(reviewers, { status: 200 });
  }),
];

export default reviewersHandlers;
