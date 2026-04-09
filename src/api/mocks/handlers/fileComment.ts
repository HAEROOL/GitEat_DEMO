import { http, HttpResponse } from "msw";
const API_BASE = import.meta.env.VITE_API_BASE || "";

const fileCommentHandlers = [
  // 3초 후에 성공하는 핸들러 (dynamic params 적용)
  http.post(`${API_BASE}/pr/:repoId/:prId/file/comment`, async () => {
    // 3초(3000ms) 지연
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return HttpResponse.json({ status: 200 });
  }),
];

export default fileCommentHandlers;
