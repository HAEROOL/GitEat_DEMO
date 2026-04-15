import { setupWorker } from "msw/browser";
import handler from "./handler";
import { warmHunksCache } from "./handlers/repository";

// 브라우저 환경에서 MSW 설정
export const worker = setupWorker(...handler);

// Pre-compute diff hunks in the background so the first file open is not
// blocked by Myers diff on the main thread. Mirrors the production path where
// the backend has already computed these before serving.
warmHunksCache();
