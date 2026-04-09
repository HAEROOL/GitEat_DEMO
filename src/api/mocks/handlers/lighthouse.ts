import { http, HttpResponse } from "msw";

const API_BASE = import.meta.env.VITE_API_BASE || "";

const lighthouse = {
  lhId: 2,
  repositoryId: 761731,
  branch: "develop",
  performance: 40.0,
  accessibility: 90.0,
  bestPractices: 96.0,
  seo: 83.0,
  fcp: 3.351,
  lcp: 6.833,
  tbt: 1321.5,
  cls: 0.0,
  si: 3.352,
  create_at: "2025-02-12 10:47:30",
};

const lighthouseHandlers = [
  http.get(`${API_BASE}/rest/report/:repoId`, () => {
    return HttpResponse.json(lighthouse, { status: 200 });
  }),
  http.post(`${API_BASE}/report/lighthouse-pipeline`, async () => {
    return HttpResponse.json(lighthouse, { status: 200 });
  }),
  http.delete(`${API_BASE}/rest/report/:repoId`, () => {
    return HttpResponse.json({ message: "삭제 완료" }, { status: 200 });
  }),
];

export default lighthouseHandlers;
