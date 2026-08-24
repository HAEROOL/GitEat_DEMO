import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Chrome은 유휴 서비스 워커를 30초쯤 뒤에 종료한다. 탭이 백그라운드로 가면
// MSW의 keepAlive setInterval도 스로틀링되어 워커가 죽고, 다시 살아난 워커는
// activeClientIds가 비어 있어 모든 요청을 그대로 통과시킨다. 통과된 요청은
// vercel.json의 SPA rewrite 때문에 200 + index.html로 돌아와 화면이 깨진다.
// 탭이 다시 보일 때마다 클라이언트를 재등록해 mocking을 복구한다.
function keepMockingAlive() {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      navigator.serviceWorker?.controller?.postMessage("MOCK_ACTIVATE");
    }
  });
}

function renderApp() {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

// MSW 워커 등록이 실패하더라도 앱은 마운트되도록 non-blocking으로 처리.
// 워커가 mount 전에 활성화되면 첫 요청부터 mock 적용, 늦어지면 첫 요청만 실패.
import("./api/mocks/browser")
  .then(({ worker }) =>
    worker
      .start({ onUnhandledRequest: "bypass" })
      .then(keepMockingAlive)
      .catch((err) => {
        console.error("[mock] worker.start failed:", err);
      })
  )
  .catch((err) => {
    console.error("[mock] worker module load failed:", err);
  })
  .finally(renderApp);
