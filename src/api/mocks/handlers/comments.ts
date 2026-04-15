import { http, HttpResponse } from "msw";
import {
  AUTHOR,
  SENIOR_FE,
  FE_REVIEWER,
  BE_REVIEWER,
  QA_REVIEWER,
} from "../dummies/personas";

const API_BASE = import.meta.env.VITE_API_BASE || "";

const SCENARIO_REPO_ID = 501;
const SCENARIO_PR_ID = 201;
const SCENARIO_BASE_SHA = "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0";
const SCENARIO_HEAD_SHA = "f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9";

const scenarioPosition = (
  path: string,
  range: {
    newLine: number;
    oldLine: number;
    newStartLine: number;
    newEndLine: number;
    oldStartLine: number;
    oldEndLine: number;
  }
) => ({
  baseSha: SCENARIO_BASE_SHA,
  startSha: SCENARIO_BASE_SHA,
  headSha: SCENARIO_HEAD_SHA,
  oldPath: path,
  newPath: path,
  positionType: null,
  lineRange: null,
  ...range,
});

interface Comment {
  commentId: number;
  prId: number;
  repoId: number;
  userId: number;
  userName: string;
  avatarUrl: string | null;
  disId: string;
  content: string;
  commentType: 0 | 1 | 2;
  createAt: string | null;
  position: object | null;
  fileId: string | null;
  reCommentList: Reply[];
}

interface Reply {
  reCommentId: number;
  userId: number;
  userName: string;
  avatarUrl: string | null;
  disId: string;
  content: string;
  reCommentType: 0 | 1 | 2;
  imageName: string | null;
  createAt: string | null;
}

interface CommentBody {
  content: string;
  commentType: 0 | 1 | 2;
}

interface ReplyBody {
  content: string;
  reCommentType: 0 | 1 | 2;
}

const comments: Comment[] = [
  // ── 일반 PR 댓글 (position: null) ──
  {
    commentId: 1001,
    prId: SCENARIO_PR_ID,
    repoId: SCENARIO_REPO_ID,
    userId: AUTHOR.userId,
    fileId: null,
    userName: AUTHOR.displayName,
    avatarUrl: AUTHOR.avatarUrl,
    disId: "disc-general-request",
    content:
      "상품 목록 무한 스크롤 PR 올립니다. 픽스처 diff가 좀 큰데 파일별로 접어서 봐주세요. 피드백 환영합니다 🙏",
    commentType: 0,
    createAt: "2026-04-10T10:20:00.000+09:00",
    position: null,
    reCommentList: [],
  },
  {
    commentId: 1002,
    prId: SCENARIO_PR_ID,
    repoId: SCENARIO_REPO_ID,
    userId: SENIOR_FE.userId,
    fileId: null,
    userName: SENIOR_FE.displayName,
    avatarUrl: SENIOR_FE.avatarUrl,
    disId: "disc-general-summary",
    content:
      "방향 자체는 좋은데, API 레이어에서 `axios` 직접 import와 queryKey 문자열 두 가지는 이번 PR 머지 전에 꼭 정리해주세요. 나머지는 개별 라인에 남겼습니다.",
    commentType: 2,
    createAt: "2026-04-10T15:20:00.000+09:00",
    position: null,
    reCommentList: [
      {
        reCommentId: 4001,
        userId: FE_REVIEWER.userId,
        userName: FE_REVIEWER.displayName,
        avatarUrl: FE_REVIEWER.avatarUrl,
        disId: "disc-general-summary",
        content:
          "동의합니다. `productsQueryKey` 팩토리를 두는 게 나중에 invalidate 할 때도 안전해요.",
        reCommentType: 0,
        imageName: null,
        createAt: "2026-04-10T15:34:11.000+09:00",
      },
    ],
  },
  {
    commentId: 1003,
    prId: SCENARIO_PR_ID,
    repoId: SCENARIO_REPO_ID,
    userId: QA_REVIEWER.userId,
    fileId: null,
    userName: QA_REVIEWER.displayName,
    avatarUrl: QA_REVIEWER.avatarUrl,
    disId: "disc-general-qa-question",
    content:
      "QA 관점 질문 하나요. 무한 스크롤로 바뀌면서 기존의 `?page=3` 같은 딥링크가 깨질 것 같은데, redirect 처리가 있나요? 아니면 이번 PR 범위 밖인가요?",
    commentType: 0,
    createAt: "2026-04-12T14:05:30.000+09:00",
    position: null,
    reCommentList: [],
  },
  {
    commentId: 1004,
    prId: SCENARIO_PR_ID,
    repoId: SCENARIO_REPO_ID,
    userId: AUTHOR.userId,
    fileId: null,
    userName: AUTHOR.displayName,
    avatarUrl: AUTHOR.avatarUrl,
    disId: "disc-general-author-answer",
    content:
      "@yoon-somi 좋은 질문이에요. 이번 PR 범위 밖으로 생각하고 있었는데, 별도 이슈로 티켓 하나 끊어두겠습니다. 분석/SEO 팀 공유도 같이 할게요.",
    commentType: 0,
    createAt: "2026-04-12T14:22:08.000+09:00",
    position: null,
    reCommentList: [],
  },

  // ── 파일 인라인 댓글 (position 있음) ──
  {
    commentId: 2001,
    prId: SCENARIO_PR_ID,
    repoId: SCENARIO_REPO_ID,
    userId: SENIOR_FE.userId,
    fileId: "file-products-api",
    userName: SENIOR_FE.displayName,
    avatarUrl: SENIOR_FE.avatarUrl,
    disId: "disc-products-axios-import",
    content:
      "`axios`를 직접 import하고 있는데, 이 레포는 전역 인터셉터가 붙은 `apiClient`만 쓰기로 돼 있어요. 인증 토큰 갱신이나 에러 포맷이 일관되게 안 적용될 수 있습니다.",
    commentType: 1,
    createAt: "2026-04-10T14:22:10.000+09:00",
    position: scenarioPosition("src/api/products.ts", {
      newLine: 1,
      oldLine: 1,
      newStartLine: 1,
      newEndLine: 1,
      oldStartLine: 1,
      oldEndLine: 1,
    }),
    reCommentList: [],
  },
  {
    commentId: 2002,
    prId: SCENARIO_PR_ID,
    repoId: SCENARIO_REPO_ID,
    userId: FE_REVIEWER.userId,
    fileId: "file-products-api",
    userName: FE_REVIEWER.displayName,
    avatarUrl: FE_REVIEWER.avatarUrl,
    disId: "disc-products-querykey-format",
    content:
      "`PRODUCTS_QUERY_KEY`가 문자열인데, 컨벤션은 `['products', 'list']`처럼 배열로 쓰기로 했어요. 나중에 파라미터 붙일 때 invalidate가 꼬입니다.\n\n```ts\nexport const productsQueryKey = () => ['products', 'list'] as const;\n```",
    commentType: 1,
    createAt: "2026-04-10T15:01:40.000+09:00",
    position: scenarioPosition("src/api/products.ts", {
      newLine: 16,
      oldLine: 0,
      newStartLine: 16,
      newEndLine: 16,
      oldStartLine: 0,
      oldEndLine: 0,
    }),
    reCommentList: [
      {
        reCommentId: 4002,
        userId: AUTHOR.userId,
        userName: AUTHOR.displayName,
        avatarUrl: AUTHOR.avatarUrl,
        disId: "disc-products-querykey-format",
        content:
          "아, 팩토리 함수로 빼는 거 잊고 있었네요. 다음 커밋에 반영하겠습니다.",
        reCommentType: 0,
        imageName: null,
        createAt: "2026-04-10T15:30:00.000+09:00",
      },
    ],
  },
  {
    commentId: 2003,
    prId: SCENARIO_PR_ID,
    repoId: SCENARIO_REPO_ID,
    userId: SENIOR_FE.userId,
    fileId: "file-use-product-list",
    userName: SENIOR_FE.displayName,
    avatarUrl: SENIOR_FE.avatarUrl,
    disId: "disc-hook-staletime",
    content:
      "`staleTime`/`cacheTime` 설정이 누락돼 있습니다. 페이지를 왔다 갔다 할 때 매번 처음부터 다시 로드될 거예요. 상품 목록 특성상 `staleTime: 30_000` 정도는 기본으로 깔아두는 게 좋겠습니다.",
    commentType: 2,
    createAt: "2026-04-10T14:28:32.000+09:00",
    position: scenarioPosition("src/hooks/useProductList.ts", {
      newLine: 5,
      oldLine: 0,
      newStartLine: 5,
      newEndLine: 11,
      oldStartLine: 0,
      oldEndLine: 0,
    }),
    reCommentList: [],
  },
  {
    commentId: 2004,
    prId: SCENARIO_PR_ID,
    repoId: SCENARIO_REPO_ID,
    userId: BE_REVIEWER.userId,
    fileId: "file-use-product-list",
    userName: BE_REVIEWER.displayName,
    avatarUrl: BE_REVIEWER.avatarUrl,
    disId: "disc-hook-null-check",
    content:
      "API 스펙상 마지막 페이지에서 `nextPage: null`이 내려옵니다. `getNextPageParam`에서 `null`을 그대로 반환하면 react-query가 다음 페이지가 있다고 판단해서 `fetchNextPage` 호출이 무한히 트리거됩니다. `undefined`로 변환해주세요.",
    commentType: 2,
    createAt: "2026-04-11T09:12:18.000+09:00",
    position: scenarioPosition("src/hooks/useProductList.ts", {
      newLine: 9,
      oldLine: 0,
      newStartLine: 9,
      newEndLine: 9,
      oldStartLine: 0,
      oldEndLine: 0,
    }),
    reCommentList: [
      {
        reCommentId: 4003,
        userId: AUTHOR.userId,
        userName: AUTHOR.displayName,
        avatarUrl: AUTHOR.avatarUrl,
        disId: "disc-hook-null-check",
        content:
          "좋은 지적 감사합니다. 로컬에서는 재현이 안 됐는데 API 스펙 기준이 맞네요. 수정하겠습니다.",
        reCommentType: 0,
        imageName: null,
        createAt: "2026-04-11T09:40:05.000+09:00",
      },
    ],
  },
  {
    commentId: 2005,
    prId: SCENARIO_PR_ID,
    repoId: SCENARIO_REPO_ID,
    userId: FE_REVIEWER.userId,
    fileId: "file-product-list-tsx",
    userName: FE_REVIEWER.displayName,
    avatarUrl: FE_REVIEWER.avatarUrl,
    disId: "disc-list-scroll-throttle",
    content:
      "`scroll` 이벤트에 throttle/debounce가 없어요. 이 컨테이너는 상품 수백 개가 들어가는 곳이라 스크롤 한 번에 수십 번씩 핸들러가 실행됩니다. 그리고 `scroll` 이벤트보다는 `IntersectionObserver`로 sentinel 요소를 관측하는 쪽이 훨씬 가볍습니다.",
    commentType: 1,
    createAt: "2026-04-11T10:55:47.000+09:00",
    position: scenarioPosition("src/components/products/ProductList.tsx", {
      newLine: 17,
      oldLine: 0,
      newStartLine: 9,
      newEndLine: 20,
      oldStartLine: 0,
      oldEndLine: 0,
    }),
    reCommentList: [
      {
        reCommentId: 4004,
        userId: AUTHOR.userId,
        userName: AUTHOR.displayName,
        avatarUrl: AUTHOR.avatarUrl,
        disId: "disc-list-scroll-throttle",
        content:
          "맞아요, IntersectionObserver 기반으로 다시 올리겠습니다. 다음 커밋에 반영할게요.",
        reCommentType: 0,
        imageName: null,
        createAt: "2026-04-11T11:10:22.000+09:00",
      },
      {
        reCommentId: 4005,
        userId: FE_REVIEWER.userId,
        userName: FE_REVIEWER.displayName,
        avatarUrl: FE_REVIEWER.avatarUrl,
        disId: "disc-list-scroll-throttle",
        content: "감사합니다 👍",
        reCommentType: 0,
        imageName: null,
        createAt: "2026-04-11T11:12:01.000+09:00",
      },
    ],
  },
  {
    commentId: 2006,
    prId: SCENARIO_PR_ID,
    repoId: SCENARIO_REPO_ID,
    userId: QA_REVIEWER.userId,
    fileId: "file-product-list-tsx",
    userName: QA_REVIEWER.displayName,
    avatarUrl: QA_REVIEWER.avatarUrl,
    disId: "disc-list-key-index",
    content:
      "`key={index}`는 무한 스크롤과 특히 상성이 나쁩니다. 새 페이지가 prepend되면 index가 밀려서 전체 리렌더가 발생해요. `item.id`를 써주세요.",
    commentType: 2,
    createAt: "2026-04-12T13:40:09.000+09:00",
    position: scenarioPosition("src/components/products/ProductList.tsx", {
      newLine: 28,
      oldLine: 0,
      newStartLine: 28,
      newEndLine: 28,
      oldStartLine: 0,
      oldEndLine: 0,
    }),
    reCommentList: [],
  },
  {
    commentId: 2007,
    prId: SCENARIO_PR_ID,
    repoId: SCENARIO_REPO_ID,
    userId: BE_REVIEWER.userId,
    fileId: "file-product-fixtures",
    userName: BE_REVIEWER.displayName,
    avatarUrl: BE_REVIEWER.avatarUrl,
    disId: "disc-fixtures-regen",
    content:
      "5,000줄을 전부 regen할 필요가 있었나요? `createdAt`만 채우는 거면 기존 라인에 필드만 덧붙이는 패치로 충분할 것 같은데, diff가 너무 커서 리뷰 부담이 있습니다.",
    commentType: 0,
    createAt: "2026-04-13T10:05:00.000+09:00",
    position: scenarioPosition("src/mocks/productFixtures.ts", {
      newLine: 1,
      oldLine: 1,
      newStartLine: 1,
      newEndLine: 1,
      oldStartLine: 1,
      oldEndLine: 1,
    }),
    reCommentList: [],
  },
];

const commentsHandlers = [
  http.get(`${API_BASE}/pr/:repoId/:prId/comment`, () => {
    return HttpResponse.json(comments, { status: 200 });
  }),

  http.delete(`${API_BASE}/pr/:repoId/:prId/comment/:commentId`, (req) => {
    const repoId = Number(req.params.repoId);
    const prId = Number(req.params.prId);
    const commentId = Number(req.params.commentId);
    const commentIndex = comments.findIndex(
      (comment) =>
        comment.repoId === repoId &&
        comment.prId === prId &&
        comment.commentId === commentId
    );
    if (commentIndex !== -1) {
      comments.splice(commentIndex, 1);
      return HttpResponse.json(
        { message: "댓글을 삭제했습니다." },
        { status: 200 }
      );
    } else {
      return HttpResponse.json(
        { message: "댓글을 찾을 수 없습니다." },
        { status: 404 }
      );
    }
  }),

  http.delete(`${API_BASE}/pr/:repoId/:prId/reply/:replyId`, (req) => {
    const repoId = Number(req.params.repoId);
    const prId = Number(req.params.prId);
    const replyId = Number(req.params.replyId);
    const comment = comments.find(
      (comment) =>
        comment.repoId === repoId &&
        comment.prId === prId &&
        comment.reCommentList?.some(
          (reComment) => reComment.reCommentId === replyId
        )
    );

    if (!comment) {
      return HttpResponse.json(
        { message: "답글을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    comment.reCommentList = comment.reCommentList.filter(
      (reComment) => reComment.reCommentId !== replyId
    );
    return HttpResponse.json(
      { message: "답글을 삭제했습니다." },
      { status: 200 }
    );
  }),

  http.post(
    `${API_BASE}/pr/:repoId/:prId/comment`,
    async ({ params, request }) => {
      try {
        const { repoId, prId } = params;
        const body = (await request.json()) as CommentBody;
        const { content, commentType } = body;

        if (!content.trim()) {
          return HttpResponse.json(
            { message: "내용을 입력해주세요." },
            { status: 400 }
          );
        }

        const newComment: Comment = {
          commentId: comments.length + 1,
          prId: Number(prId),
          repoId: Number(repoId),
          userId: AUTHOR.userId,
          userName: AUTHOR.displayName,
          avatarUrl: AUTHOR.avatarUrl,
          disId: `${comments.length + 1}`,
          content,
          commentType,
          createAt: null,
          position: null,
          fileId: null,
          reCommentList: [],
        };

        comments.push(newComment);
        return HttpResponse.json(newComment, { status: 201 });
      } catch (error) {
        return HttpResponse.json(
          { message: `잘못된 요청입니다. ${String(error)}` },
          { status: 400 }
        );
      }
    }
  ),

  http.post(
    `${API_BASE}/pr/:repoId/:prId/reply/:discussionId`,
    async ({ params, request }) => {
      try {
        const { repoId, prId, discussionId } = params;
        const body = (await request.json()) as ReplyBody;
        const { content, reCommentType } = body;

        if (!content.trim()) {
          return HttpResponse.json(
            { message: "내용을 입력해주세요." },
            { status: 400 }
          );
        }

        const comment = comments.find(
          (req) =>
            req.repoId === Number(repoId) &&
            req.prId === Number(prId) &&
            req.disId === discussionId
        );

        if (!comment) {
          return HttpResponse.json(
            { message: "해당하는 댓글을 찾을 수 없습니다." },
            { status: 404 }
          );
        }

        const newReply: Reply = {
          reCommentId: comment.reCommentList.length + 1,
          userId: AUTHOR.userId,
          userName: AUTHOR.displayName,
          avatarUrl: AUTHOR.avatarUrl,
          disId: String(discussionId),
          content,
          reCommentType,
          imageName: null,
          createAt: new Date().toISOString(),
        };

        comment.reCommentList.push(newReply);
        return HttpResponse.json(newReply, { status: 201 });
      } catch (error) {
        return HttpResponse.json(
          { message: `잘못된 요청입니다. ${String(error)}` },
          { status: 400 }
        );
      }
    }
  ),

  http.put(
    `${API_BASE}/pr/:repoId/:prId/comment/:commentId`,
    async ({ params, request }) => {
      try {
        const { repoId, prId, commentId } = params;
        const body = (await request.json()) as CommentBody;
        const { content, commentType } = body;

        const commentIndex = comments.findIndex(
          (comment) =>
            comment.repoId === Number(repoId) &&
            comment.prId === Number(prId) &&
            comment.commentId === Number(commentId)
        );

        if (commentIndex === -1) {
          return HttpResponse.json(
            { message: "댓글을 찾을 수 없습니다." },
            { status: 404 }
          );
        }

        const updatedComment = {
          ...comments[commentIndex],
          content,
          commentType,
        };
        comments[commentIndex] = updatedComment;

        return HttpResponse.json(updatedComment, { status: 200 });
      } catch (error) {
        return HttpResponse.json(
          { message: `잘못된 요청입니다. ${String(error)}` },
          { status: 400 }
        );
      }
    }
  ),

  http.put(
    `${API_BASE}/pr/:repoId/:prId/reply/:replyId`,
    async ({ params, request }) => {
      try {
        const { repoId, prId, replyId } = params;
        const body = (await request.json()) as ReplyBody;
        const { content, reCommentType } = body;

        const comment = comments.find(
          (comment) =>
            comment.repoId === Number(repoId) &&
            comment.prId === Number(prId) &&
            comment.reCommentList?.some(
              (reply) => reply.reCommentId === Number(replyId)
            )
        );

        if (!comment) {
          return HttpResponse.json(
            { message: "해당하는 답글을 찾을 수 없습니다." },
            { status: 404 }
          );
        }

        const replyIndex = comment.reCommentList?.findIndex(
          (reply) => reply.reCommentId === Number(replyId)
        );

        if (replyIndex === undefined || replyIndex === -1) {
          return HttpResponse.json(
            { message: "답글을 찾을 수 없습니다." },
            { status: 404 }
          );
        }

        const updatedReply = {
          ...comment.reCommentList[replyIndex],
          content,
          reCommentType,
        };

        comment.reCommentList[replyIndex] = updatedReply;

        return HttpResponse.json(updatedReply, { status: 200 });
      } catch (error) {
        return HttpResponse.json(
          { message: `잘못된 요청입니다. ${String(error)}` },
          { status: 400 }
        );
      }
    }
  ),
  http.post(`${API_BASE}/pr/:repoId/uploads`, async () => {
    return HttpResponse.json(
      {
        fileName: "mock-image.png",
        fileUrl: "https://mock.url/mock-image.png",
      },
      { status: 201 }
    );
  }),
];

export default commentsHandlers;
