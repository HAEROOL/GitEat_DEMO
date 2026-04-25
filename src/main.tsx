import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

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
    worker.start({ onUnhandledRequest: "bypass" }).catch((err) => {
      console.error("[mock] worker.start failed:", err);
    })
  )
  .catch((err) => {
    console.error("[mock] worker module load failed:", err);
  })
  .finally(renderApp);
