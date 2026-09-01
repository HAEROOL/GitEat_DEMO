![Image](https://github.com/user-attachments/assets/1543de70-eb8d-4231-8b61-5a260d4d3da3)

# 💻 AI 코드리뷰 서비스 GIT-EAT — Frontend Demo

> **이 레포지토리는 GIT-EAT 서비스의 프런트엔드만을 추출하여 데모/포트폴리오 용도로 리팩터링한 버전입니다.**
> 백엔드 서비스 없이 단독 실행되며, 모든 API 응답은 [MSW(Mock Service Worker)](https://mswjs.io/) 기반의 목업 데이터로 처리됩니다.

🔗 **라이브 데모**: <https://git-eat-refactor.vercel.app>
📦 **원본 풀스택 레포지토리**: <https://github.com/HAEROOL/GitEat>

---

## ⚡ TL;DR — 30초 요약

|  |  |
| --- | --- |
| **한 줄 소개** | SSAFY GitLab 기반 AI 코드리뷰 서비스의 프런트엔드 (React + TypeScript) |
| **역할** | **팀장 & FE** — 6인 팀(FE 2 / BE 3 / Infra 1)에서 OAuth·프로젝트 연동·Diff 뷰어·대시보드 담당 |
| **기간** | 원본 5주(2025.01.06–02.21) · 데모 리팩터링 2025.04~ |
| **대표 성과** | 대용량 Diff 뷰어 **INP 912ms → 44ms (95.2%↓)**, 전체 렌더 **10.7s → 2.8s (74.2%↓)** — [상세 보고서](./PERFORMANCE_IMPROVEMENT_REPORT.md) |
| **핵심 역량** | 렌더링 성능 최적화(가상화·메모이제이션), Axios 인터셉터 기반 **토큰 재발급 동시성 제어**, MSW로 **백엔드 없는 단독 배포** 아키텍처 설계 |

> 💡 이 데모는 백엔드 없이도 실제 서비스의 UI/UX와 인터랙션을 그대로 시연하기 위해, 원본 프런트엔드를 MSW 목업 레이어 위에서 단독 동작하도록 리팩터링한 결과물입니다. **엔지니어링의 초점은 아래 [4. 트러블슈팅 & 성능 최적화](#4-트러블슈팅--성능-최적화)에 정리되어 있습니다.**

## 🚨 데모 안내 사항

- **모든 데이터는 mock 데이터**입니다. 화면에 표시되는 레포지토리, MR, 댓글, 통계, AI 리뷰는 실제 데이터가 아닙니다.
- **로그인 인증 절차가 없습니다.** 랜딩 페이지의 `SSAFY Git으로 시작하기` 버튼을 누르면 인증 없이 곧장 `/repos`로 진입합니다.
- **OAuth / 외부 GitLab 연동이 비활성화**되어 있습니다. 실제 GitLab 토큰이나 webhook은 사용되지 않습니다.
- **데이터 변경(추가/삭제 등)은 메모리 상에서만 동작**하며 새로고침 시 초기 mock 상태로 복원됩니다.
- 모든 페이지 상단의 노란 배너는 위 안내를 사용자에게도 알리기 위한 표식입니다.

## 1. 프로젝트 개요

📅 **개발 기간** | 2025. 01. 06 - 2025. 02. 21
🛠 **데모 리팩터링** | 2025. 04 ~

**기획 의도**

코드리뷰에 소모되는 시간을 단축시키기 위한 AI 코드리뷰 서비스. 본 데모 레포는 SSAFY 자율 프로젝트로 종료된 GIT-EAT의 프런트엔드를 **백엔드 의존성 없이도 동작**하도록 리팩터링하여, 라이브 환경에서 UI/UX와 인터랙션을 그대로 시연할 수 있도록 한 것이 목적입니다.

**팀에서의 역할**

6인 팀(FE 2명 · BE 3명 · Infra 1명)의 **팀장이자 프런트엔드 개발자**로 참여했습니다. 프런트엔드 관점에서는 인증(GitLab OAuth), 프로젝트/웹훅 연동, MergeRequest 코드 변경내역(Diff 뷰어), 프로젝트 대시보드, 그리고 `ErrorBoundary`·`Suspense` 기반의 비동기 상태 관리 등 **서비스의 핵심 데이터 흐름과 성능이 걸린 화면**을 담당했습니다. 자세한 개인 기여는 [8. 역할 분담](#8-역할-분담-원본-프로젝트-fe)을 참고하세요.

😎 **원본 프로젝트 팀원**

| 이름   | 역할              |
| ------ | ----------------- |
| 이해루 | 팀장, FE          |
| 최이화 | FE, 디자인        |
| 신지혜 | BE, 디자인        |
| 송용인 | Infra(CI/CD), BE  |
| 이다영 | BE                |
| 조창훈 | BE, DB            |

## 2. 기능 소개

> 모든 화면은 mock 데이터를 사용해 실제 서비스와 동일한 흐름으로 시연됩니다.

**GitLab OAuth (시뮬레이션)**
![Image](https://github.com/user-attachments/assets/ff723936-ac64-47e6-adb5-593de2ffe9b1)

- 원본: SSAFY GIT(GitLab) OAuth 로그인
- 데모: 외부 OAuth 호출 없이 즉시 메인 페이지로 진입

**프로젝트 연동**
![Image](https://github.com/user-attachments/assets/28d2ec28-4105-4def-8746-8444fc21fe46)
![Image](https://github.com/user-attachments/assets/945e5fc4-bbb9-4ee7-803e-7cfa30a6c260)

- 프로젝트 ID 등록 후 관련 데이터 연동 (MR 이벤트 웹훅, 커밋/MR 동기화)

**MergeRequest 상세보기 및 코드리뷰**
![Image](https://github.com/user-attachments/assets/4652c220-36dd-41b2-953f-32ab44b0dba0)

- MR 상세, 코드 변경점, 댓글/대댓글, AI 코드리뷰 표시
- 원본은 GitLab API와 연동되어 댓글이 GitLab에 동기화되었으나, 데모는 클라이언트 메모리에서만 동작

**프로젝트 대시보드**
![Image](https://github.com/user-attachments/assets/e0d6bcd4-0552-418e-93d9-77c7467cade4)

- 개인별 커밋 내역, MR 횟수 등 통계 데이터 시각화

**성능측정**
![Image](https://github.com/user-attachments/assets/d348219b-d371-4098-b05e-8405397ced18)
![Image](https://github.com/user-attachments/assets/256875cb-cc09-483c-9882-a2010425b578)

- FE 프로젝트 Lighthouse 기반 성능 측정 데이터 표시

## 3. 아키텍처

### 3.1 원본 풀스택 시스템 (참고)

원본 GIT-EAT는 **React 프런트엔드 + API 서버 + GitLab 연동(OAuth·Webhook) + AI 리뷰 파이프라인 + CI/CD**로 구성된 풀스택 서비스입니다. 프런트엔드는 `VITE_API_BASE`를 통해 백엔드와 통신하며, MergeRequest 이벤트는 GitLab Webhook으로 동기화됩니다. 전체 시스템 아키텍처·인프라·CI/CD는 [원본 레포지토리](https://github.com/HAEROOL/GitEat)를 참고하세요.

### 3.2 데모 동작 원리 (본 레포)

본 데모는 백엔드를 MSW 목업 레이어로 대체하여 **프런트엔드 단독으로 실제 네트워크 흐름을 재현**합니다.

```
Browser ──▶ React App ──▶ MSW Service Worker ──▶ Mock Handlers ──▶ Dummy Data
                              (요청 가로채기)
```

- `src/main.tsx`가 모든 모드에서 MSW 워커를 등록 (`onUnhandledRequest: "bypass"`)
- `src/api/mocks/handlers/*.ts`가 도메인별 HTTP 요청을 가로채 `src/api/mocks/dummies/*.ts`의 픽스처로 응답
- `AuthLayout`은 토큰 검사를 우회하고 mock 사용자로 진입을 허용
- 일부 엔드포인트는 스켈레톤/로딩 UX 시연을 위해 약간의 인위적 지연을 포함

### 3.3 데이터 계층 — 2개의 axios 클라이언트

인증 여부에 따라 axios 인스턴스를 **의도적으로 분리**했습니다.

- **`src/api/client.ts`** — 인터셉터 없는 순수 클라이언트. 비인증 호출용.
- **`src/api/authClient.ts`** — 인증 클라이언트. `access_token`을 헤더에 부착하고 `withCredentials`를 설정하며, **401 응답 시 토큰 재발급 + 원 요청 재시도**를 담당합니다. 여러 요청이 동시에 401을 받아도 refresh는 1회만 실행되도록 큐로 제어합니다. (→ [4.2 참고](#42-토큰-재발급-동시성-제어--axios-인터셉터))

서버 상태는 **react-query**가, cross-cutting 클라이언트 상태는 **Zustand**가 담당하여 관심사를 분리했습니다.

## 4. 트러블슈팅 & 성능 최적화

> 이 프로젝트에서 가장 공을 들인 두 가지 엔지니어링 과제입니다. 전체 상세는 [`PERFORMANCE_IMPROVEMENT_REPORT.md`](./PERFORMANCE_IMPROVEMENT_REPORT.md)와 [`docs/troubleshooting/`](./docs/troubleshooting/)에 기록되어 있습니다.

### 4.1 대용량 Diff 뷰어 렌더링 최적화

**문제** — 5,000줄 규모의 코드 diff를 한 번에 DOM에 렌더링하던 구조에서, 파일을 펼치면 UI가 1~3초간 멈추고(freezing), 댓글 입력 시 매 키 입력마다 약 120ms의 지연이 발생했습니다. 원인은 ① **~5,000개 DOM 노드 일괄 렌더링**, ② **리렌더마다 반복되는 diff 재계산**, ③ 그로 인한 **메인 스레드 블로킹**이었습니다. (측정: Chrome DevTools Performance / Lighthouse)

**해결** — 세 가지 기법을 조합했습니다.

1. **가상 윈도우(Virtual Scrolling)** — `react-virtuoso`로 화면에 보이는 라인(~50개)만 렌더링. 단, 가상화로 인해 브라우저 `Cmd+F` 검색이 무력화되는 부작용을 **숨겨진 텍스트 레이어**(`color: transparent`)로 보완했습니다.
2. **`useMemo` 메모이제이션** — 비싼 `generateDiffFile()` 연산을 `rawFile`/`file` 변경 시에만 재계산하도록 캐싱. 댓글 입력 등 무관한 리렌더에서 diff 재계산을 **0ms**로 제거.
3. **CSS Grid 아코디언** — `grid-template-rows: 0fr ↔ 1fr` 애니메이션으로 `max-height` 꼼수 없이 GPU 가속 전환.

**결과**

| 지표 | 개선 전 | 개선 후 | 개선율 |
| --- | --- | --- | --- |
| **INP** (Interaction to Next Paint) | 912ms 🔴 | 44ms 🟢 | **95.2% ↓** |
| Rendering | 4,839ms | 47ms | **99.0% ↓** |
| Scripting | 2,215ms | 204ms | **90.8% ↓** |
| **전체 처리 시간** | 10.67s | 2.76s | **74.2% ↓** |
| DOM 노드 수 | ~5,000개 | ~50개 | **99% ↓** |

**트레이드오프 판단** — 검색 기능 보존을 위한 숨겨진 텍스트 레이어는 5,000줄 기준 약 1~2MB의 추가 메모리를 쓰지만, 이는 전체 DOM 렌더링(~50MB) 대비 2~4% 수준으로 **렌더링 성능과 검색 UX를 모두 지키는 합리적 선택**이라고 판단했습니다.

> 📎 심화 분석: [`docs/troubleshooting/diff-viewer-comment-bottleneck.md`](./docs/troubleshooting/diff-viewer-comment-bottleneck.md) — 코멘트가 달린 Diff의 추가 병목을 프로파일링하고, **성급한 `React.memo`/캐시 도입이 오히려 손해였음을 실측으로 확인해 전량 롤백한 과정**과 교훈("측정 → 지점 특정 → 최소 침습 수정")까지 기록했습니다.

### 4.2 토큰 재발급 동시성 제어 — Axios 인터셉터

**문제** — access token 만료 시, 대시보드처럼 여러 API를 동시에 호출하는 화면에서는 요청들이 **한꺼번에 401**을 받습니다. 각 요청이 개별적으로 refresh를 트리거하면 refresh 요청이 중복 실행되고, 서버 토큰이 꼬이거나 요청이 유실됩니다.

**해결** — `authClient.ts`에 **단일 refresh + 큐 기반 일괄 재시도** 패턴을 구현했습니다.

- 첫 401만 refresh를 실행하고, 나머지는 `refreshSubscribers` 큐에서 대기 → 새 토큰 발급 후 일괄 재시도 (`_retry` 플래그로 1회만 재시도).
- 운영 중 발견한 문제들을 방어적으로 보완:
  - **refresh 실패 시 대기 요청 hang** → `onRefreshFailed()`로 대기 중인 모든 요청에 에러 전파.
  - **큐 무한 증가** → `MAX_QUEUED_REQUESTS = 50` 상한, 초과 시 즉시 reject.
  - **네트워크 장애 시 무한 대기** → `REFRESH_TIMEOUT_MS = 10000`(10초) 타임아웃.

**남은 한계도 정직하게 기록**했습니다 — 다중 탭 간 `localStorage` refresh 경합은 서버 측 중복 refresh 처리에 의존한다는 점을 [보고서](./PERFORMANCE_IMPROVEMENT_REPORT.md#-axios-interceptor-토큰-재발급-동시성-분석)에 명시했습니다.

## 5. 기술 스택 & 의사결정

| 영역 | 선택 | 선택 이유 |
| --- | --- | --- |
| 언어 | **TypeScript** (strict, `noUnusedLocals`) | DTO·API 응답 타입 안정성. 미사용 변수는 빌드 실패로 강제. |
| 프레임워크 | **React 18 + Vite 6** | 빠른 HMR, 경량 번들. `Suspense`/`ErrorBoundary`로 비동기 상태 일원화. |
| 라우팅 | **React Router v7** | PR 화면을 shell + 3중첩 라우트(conversation/commits/file-changes)로 구성. |
| 서버 상태 | **React Query v3** | 서버 캐시·동기화를 react-query에 위임. (원본과의 일관성 위해 v3 유지, `@tanstack/react-query` 아님) |
| 클라이언트 상태 | **Zustand** | 서버 상태(react-query)와 분리된 cross-cutting 상태만 최소 보일러플레이트로 관리. |
| Diff 렌더 | **@git-diff-view/react + react-virtuoso** | 대용량 diff 가상화 (→ [4.1](#41-대용량-diff-뷰어-렌더링-최적화)). |
| 목업 | **MSW v2** | 서비스 워커로 네트워크 레이어를 가로채 **백엔드 없이 단독 배포** 가능하게 함. |
| 스타일 | **Tailwind v3 + MUI v6 + Emotion** | 레이아웃/유틸리티는 Tailwind, 복잡한 위젯(TreeView·Skeleton)만 MUI. **세 번째 스타일 시스템은 도입하지 않음.** |
| 품질 | **ESLint(flat) + Prettier** | Prettier 위반도 lint 에러로 취급해 포맷 일관성 강제. |

## 6. 로컬 실행

```bash
# Node 18+ 권장. 패키지 매니저는 npm.
npm install
npm run dev
```

| 명령어             | 설명                                                         |
| ------------------ | ------------------------------------------------------------ |
| `npm run dev`      | Vite 개발 서버를 `127.0.0.1`에 띄우고 MSW 워커를 등록합니다. |
| `npm run build`    | `tsc -b`로 타입 체크 후 `vite build`로 정적 산출물을 만듭니다. |
| `npm run preview`  | 빌드된 `dist/`를 서빙하여 프로덕션 동작을 검증합니다.        |
| `npm run lint`     | ESLint flat config + Prettier 위반을 검사합니다.             |

> ⚠️ `.npmrc`에 `legacy-peer-deps=true`가 설정되어 있습니다 (`react-diff-viewer@3.1.1`이 React 15/16만 peer로 인정하는 이슈 우회). 끄지 마세요.

## 7. 프로젝트 구조

```
.
 ┣ public
 ┃ ┗ mockServiceWorker.js          # MSW 서비스 워커 스크립트
 ┣ src
 ┃ ┣ api
 ┃ ┃ ┣ client.ts                   # 비인증 axios 클라이언트
 ┃ ┃ ┣ authClient.ts               # 인증/리프레시 처리 axios 클라이언트
 ┃ ┃ ┣ mocks
 ┃ ┃ ┃ ┣ browser.ts                # 워커 등록
 ┃ ┃ ┃ ┣ handler.ts                # 핸들러 집계
 ┃ ┃ ┃ ┣ handlers/                 # 도메인별 MSW 핸들러
 ┃ ┃ ┃ ┗ dummies/                  # 픽스처 데이터
 ┃ ┃ ┣ queries/                    # 파일당 react-query 훅 1개 컨벤션
 ┃ ┃ ┗ types/                      # 공용 DTO 타입
 ┃ ┣ assets/images
 ┃ ┣ components
 ┃ ┃ ┣ common                      # Header, ErrorBoundary, DemoBanner 등
 ┃ ┃ ┣ pullRequest                 # MR 상세, diff viewer, 댓글
 ┃ ┃ ┣ dashboard / pullRequestList / repositoryList / ...
 ┃ ┣ hooks                         # 폴더 단위 재사용 훅
 ┃ ┣ pages                         # 라우트 단위 얇은 래퍼
 ┃ ┣ store                         # Zustand
 ┃ ┗ utils                         # 순수 헬퍼
```

## 8. 역할 분담 (원본 프로젝트 FE)

**이해루 (팀장, FE)**

- GitLab OAuth
- Project 등록 / 웹훅 등록
- MergeRequest 코드 변경내역 (Diff 뷰어 성능 최적화 → [4.1](#41-대용량-diff-뷰어-렌더링-최적화))
- ErrorBoundary 및 비동기 상태 관리
- 프로젝트 대시보드

**최이화 (FE, 디자인)**

- MergeRequest 상세보기
- MergeRequest 댓글 및 대댓글 기능
- 서비스 가이드
- 프로젝트 성능 측정

## 9. 원본 프로젝트로 이동

본 데모는 프런트엔드 단독 추출본입니다. 백엔드/인프라 포함 **원본 프로젝트**(전체 시스템 아키텍처, API 서버, CI/CD, 배포 환경)는 아래 링크를 참고하세요.

- 🔗 **원본 풀스택 레포지토리**: [HAEROOL/GitEat](https://github.com/HAEROOL/GitEat) — 백엔드 서버, 인프라, CI/CD를 포함한 전체 시스템
- 🌐 **본 데모 라이브 환경**: <https://git-eat-refactor.vercel.app>
