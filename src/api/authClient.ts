import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
} from "axios";

const API_BASE: string = import.meta.env.VITE_API_BASE as string;

const authClient: AxiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// AxiosRequestConfig에 _retry 커스텀 프로퍼티를 추가하기 위한 인터페이스 확장
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

// 토큰 재발급 진행 여부와 대기중인 콜백들을 저장하는 변수
let isRefreshing = false;
let refreshSubscribers: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

// 동시성 제어 상수
const MAX_QUEUED_REQUESTS = 50; // 대기 큐 최대 크기
const REFRESH_TIMEOUT_MS = 10000; // refresh 요청 타임아웃 (10초)

// refresh 완료 후, 대기 중인 모든 요청에 새 토큰을 적용
function onRefreshed(newToken: string): void {
  refreshSubscribers.forEach(({ resolve }) => resolve(newToken));
  refreshSubscribers = [];
}

// refresh 실패 시, 대기 중인 모든 요청에 에러를 전파
function onRefreshFailed(error: unknown): void {
  refreshSubscribers.forEach(({ reject }) => reject(error));
  refreshSubscribers = [];
}

// refresh token 요청 대기 등록
function subscribeTokenRefresh(
  resolve: (token: string) => void,
  reject: (error: unknown) => void
): void {
  if (refreshSubscribers.length >= MAX_QUEUED_REQUESTS) {
    reject(new Error("Too many queued requests during token refresh"));
    return;
  }
  refreshSubscribers.push({ resolve, reject });
}

// 실제 refresh token API 호출 (타임아웃 포함)
function refreshToken(): Promise<AxiosResponse> {
  return axios.get(`${API_BASE}/oauth/gitlab/refresh`, {
    withCredentials: true,
    timeout: REFRESH_TIMEOUT_MS,
  });
}

// 요청 인터셉터: localStorage에 저장된 access token을 헤더에 추가
authClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  config.withCredentials = true;
  if (token) {
    // headers가 이미 존재하면 추가, 없으면 새 객체 생성
    config.headers["authorization"] = `${token}`;
  }
  return config;
});

// 응답 인터셉터: 응답 헤더에 새 토큰이 있으면 저장하고, 401 에러 발생 시 refresh 로직 수행
authClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.headers["authorization"]) {
      localStorage.setItem("access_token", response.headers["authorization"]);
    }
    return response;
  },
  async (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      const originalRequest = error.config as CustomAxiosRequestConfig;
      if (!originalRequest) {
        return Promise.reject(error);
      }

      // 이미 재시도한 요청이라면 더 이상 refresh 시도하지 않음
      if (originalRequest._retry) {
        return Promise.reject(error);
      }
      originalRequest._retry = true;

      // 다른 요청이 이미 refresh 요청을 진행 중인 경우
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((newToken: string) => {
            if (originalRequest.headers) {
              originalRequest.headers["authorization"] = `${newToken}`;
            } else {
              originalRequest.headers = { authorization: `${newToken}` };
            }
            resolve(authClient(originalRequest));
          }, reject);
        });
      }

      isRefreshing = true;
      try {
        const res = await refreshToken();
        // API 스펙에 맞게 새 토큰 위치 수정 (예: res.data.access_token)
        const newToken: string = res.headers["authorization"];
        localStorage.setItem("access_token", newToken);
        // 기본 헤더 업데이트
        authClient.defaults.headers.common["authorization"] = `${newToken}`;
        onRefreshed(newToken);
        // 실패했던 원래 요청 재시도
        return authClient(originalRequest);
      } catch (err) {
        // refresh 실패 시, 대기 중인 모든 요청에 에러 전파
        onRefreshFailed(err);
        // 토큰 삭제 및 로그아웃 처리
        localStorage.removeItem("access_token");
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default authClient;
