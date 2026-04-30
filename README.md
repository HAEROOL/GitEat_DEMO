![Image](https://github.com/user-attachments/assets/1543de70-eb8d-4231-8b61-5a260d4d3da3)

# 💻 AI 코드리뷰 서비스 GIT-EAT — Frontend Demo

> **이 레포지토리는 GIT-EAT 서비스의 프런트엔드만을 추출하여 데모/포트폴리오 용도로 리팩터링한 버전입니다.**
> 백엔드 서비스 없이 단독 실행되며, 모든 API 응답은 [MSW(Mock Service Worker)](https://mswjs.io/) 기반의 목업 데이터로 처리됩니다.

🔗 **라이브 데모**: <https://git-eat-refactor.vercel.app>
📦 **원본 풀스택 레포지토리**: <https://github.com/HAEROOL/GitEat>

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

## 3. 데모 동작 원리

```
Browser ──▶ React App ──▶ MSW Service Worker ──▶ Mock Handlers ──▶ Dummy Data
                              (요청 가로채기)
```

- `src/main.tsx`가 모든 모드에서 MSW 워커를 등록 (`onUnhandledRequest: "bypass"`)
- `src/api/mocks/handlers/*.ts`가 도메인별 HTTP 요청을 가로채 `src/api/mocks/dummies/*.ts`의 픽스처로 응답
- AuthLayout은 토큰 검사를 우회하고 mock 사용자로 진입을 허용
- 일부 엔드포인트는 스켈레톤/로딩 UX 시연을 위해 약간의 인위적 지연을 포함

## 4. 로컬 실행

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

## 5. FrontEnd 개발 환경

- TypeScript (strict, `noUnusedLocals`)
- React 18 + Vite 6
- React Router v7
- React Query **v3** (`react-query`, `@tanstack/react-query` 아님)
- Zustand (cross-cutting client state)
- TailwindCSS v3 + MUI v6 + Emotion
- MSW v2 (목업 백엔드)
- ESLint flat config + Prettier
## 6. 프로젝트 구조

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

## 7. 원본 프로젝트로 이동

본 데모는 프런트엔드 단독 추출본입니다. 백엔드/인프라 포함 **원본 프로젝트**(전체 시스템 아키텍처, API 서버, CI/CD, 배포 환경)는 아래 링크를 참고하세요.

- 🔗 **원본 풀스택 레포지토리**: [HAEROOL/GitEat](https://github.com/HAEROOL/GitEat) — 백엔드 서버, 인프라, CI/CD를 포함한 전체 시스템
- 🌐 **본 데모 라이브 환경**: <https://git-eat-refactor.vercel.app>
## 8. 역할 분담 (원본 프로젝트 FE)

**이해루**

- GitLab OAuth
- Project 등록 / 웹훅 등록
- MergeRequest 코드 변경내역
- ErrorBoundary 및 비동기 상태 관리
- 프로젝트 대시보드

**최이화**

- MergeRequest 상세보기
- MergeRequest 댓글 및 대댓글 기능
- 서비스 가이드
- 프로젝트 성능 측정
