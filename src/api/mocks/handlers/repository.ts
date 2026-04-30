import { http, HttpResponse } from "msw";
import { generateDiffFile } from "@git-diff-view/file";
import {
  Pullrequests,
  RepositoryList,
  RepositoryDetail,
  PullRequestDetail,
  PullRequestFiles,
  PullRequestFileRawMap,
  Commits,
} from "../dummies/repository";
import { AiReviewData } from "../dummies/aiReview";

// Mock cache: simulates backend returning pre-computed unified diff hunks.
// In production, the backend computes these once and serves them directly,
// so the frontend no longer pays the Myers-diff (execEditLength) cost on open.
const hunksCache = new Map<string, string[]>();

const normalize = (code: string | null) =>
  code ? code.replace(/\r\n/g, "\n").trimEnd() + "\n" : "";

const computeHunks = (
  fileId: string,
  oldCode: string | null,
  newCode: string | null
): string[] => {
  const cached = hunksCache.get(fileId);
  if (cached) return cached;

  const instance = generateDiffFile(
    `a/${fileId}`,
    normalize(oldCode),
    `b/${fileId}`,
    normalize(newCode),
    "txt",
    "txt"
  );
  const hunks = instance._diffList || [];
  hunksCache.set(fileId, hunks);
  return hunks;
};

// Warm the mock cache so first open doesn't pay the Myers-diff cost in dev.
// Runs during idle time after MSW starts, so cold start isn't blocked either.
export const warmHunksCache = () => {
  const entries = Object.entries(PullRequestFileRawMap);
  let i = 0;

  const run = () => {
    if (i >= entries.length) return;
    const [fileId, rawFile] = entries[i++];
    computeHunks(fileId, rawFile.oldCode, rawFile.newCode);
    schedule(run);
  };

  const schedule = (fn: () => void) => {
    const ric = (
      window as unknown as {
        requestIdleCallback?: (cb: () => void) => void;
      }
    ).requestIdleCallback;
    if (ric) ric(fn);
    else setTimeout(fn, 0);
  };

  schedule(run);
};

const API_BASE = import.meta.env.VITE_API_BASE || "";

const repositoryHandler = [
  http.get(`${API_BASE}/repo`, async () => {
    // 데모: 스켈레톤이 잠깐이라도 보이도록 약간의 지연을 둔다.
    await new Promise((resolve) => setTimeout(resolve, 600));
    return HttpResponse.json(RepositoryList);
  }),
  http.get(`${API_BASE}/pr/:repoId`, () => {
    return HttpResponse.json(Pullrequests);
  }),
  http.post(`${API_BASE}/repo`, async () => {
    // 3초(3000ms) 지연
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return HttpResponse.json(RepositoryDetail);
  }),

  http.delete(`${API_BASE}/repo/:repoId`, async () => {
    // 3초(3000ms) 지연
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return HttpResponse.json(RepositoryDetail);
  }),

  http.get(`${API_BASE}/pr/:repoId/:prId`, () => {
    return HttpResponse.json(PullRequestDetail);
  }),

  http.get(`${API_BASE}/pr/:repoId/:prId/file`, () => {
    return HttpResponse.json(PullRequestFiles);
  }),

  http.post(`${API_BASE}/pr/:repoId/:prId/file/raw`, async ({ request }) => {
    const body = (await request.json()) as { fileId: string };
    const fileId = body.fileId; // ChangedFile 객체가 직접 전달되므로 body.fileId로 접근

    const rawFile =
      PullRequestFileRawMap[fileId] || PullRequestFileRawMap["default"];

    const hunks = computeHunks(fileId, rawFile.oldCode, rawFile.newCode);

    return HttpResponse.json({ ...rawFile, hunks });
  }),

  http.get(`${API_BASE}/ai/review/:repoId/:prId`, () => {
    return HttpResponse.json(AiReviewData);
  }),

  http.get(`${API_BASE}/pr/:repoId/:prId/commit`, () => {
    return HttpResponse.json(Commits);
  }),
];

export default repositoryHandler;
