import axios, { AxiosResponse } from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;
const client = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// vercel.json의 SPA rewrite 때문에 mocking을 타지 않은 API 요청은 404가 아니라
// 200 + index.html로 돌아온다. 그대로 통과시키면 res.data가 HTML 문자열이 되어
// 호출부의 data.map(...) 같은 코드가 "map is not a function"으로 죽는다.
// 여기서 에러로 바꿔 react-query의 재시도/에러 상태로 흘려보낸다.
export function rejectHtmlResponse(res: AxiosResponse): AxiosResponse {
  const contentType = res.headers["content-type"];
  if (typeof contentType === "string" && contentType.includes("text/html")) {
    throw new Error(`API가 JSON 대신 HTML을 반환했습니다: ${res.config.url}`);
  }
  return res;
}

client.interceptors.response.use(rejectHtmlResponse);

export default client;
