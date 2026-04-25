import { http, HttpResponse } from "msw";

const API_BASE = import.meta.env.VITE_API_BASE || "";

export const authHandlers = [
  http.post(`${API_BASE}/oauth/gitlab/login`, async () => {
    return HttpResponse.json(
      {},
      {
        headers: {
          authorization: "Bearer mock-token-123",
        },
      }
    );
  }),
  http.get(`${API_BASE}/oauth/gitlab/refresh`, async () => {
    return HttpResponse.json(
      {},
      {
        headers: {
          authorization: "Bearer mock-token-123",
        },
      }
    );
  }),
];

export default authHandlers;
