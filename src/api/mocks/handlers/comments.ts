import { http, HttpResponse } from "msw";

const API_BASE = import.meta.env.VITE_API_BASE || "";

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
    commentId: 1879448,
    prId: 32,
    repoId: 888788,
    userId: 21879,
    fileId: null,
    userName: "최이화",
    avatarUrl:
      "https://secure.gravatar.com/avatar/c1cfcd69bd0f4f338373504e930553ebbef699aa0fb6c3c7ddf2cec52d94e76c?s=80&d=identicon",
    disId: "99c367b889f342264456007f4ae86ad3180aa356",
    content: "확인했습니다!",
    commentType: 0,
    createAt: "2025-02-02T16:25:27.216+09:00",
    position: null,
    reCommentList: [],
  },
  {
    commentId: 1879970,
    prId: 32,
    repoId: 888788,
    userId: 22204,
    fileId: null,
    userName: "조창훈",
    avatarUrl:
      "https://secure.gravatar.com/avatar/1ee5b9b1573716725c6e5a318973071ee8ca657c2892e497949f9de53f947f0b?s=80&d=identicon",
    disId: "65210a4205de56d91824672c1fe9fe8f8f59b116",
    content: "고생하셨습니다 :smile:",
    commentType: 0,
    createAt: "2025-02-02T21:10:39.268+09:00",
    position: null,
    reCommentList: [
      {
        reCommentId: 101,
        userId: 21879,
        userName: "최이화",
        avatarUrl:
          "https://secure.gravatar.com/avatar/c1cfcd69bd0f4f338373504e930553ebbef699aa0fb6c3c7ddf2cec52d94e76c?s=80&d=identicon",
        disId: "65210a4205de56d91824672c1fe9fe8f8f59b116",
        content: "감사합니다! 🎉",
        reCommentType: 0,
        imageName: null,
        createAt: "2025-02-02T21:12:00.000+09:00",
      },
      {
        reCommentId: 102,
        userId: 22219,
        userName: "이해루",
        avatarUrl:
          "https://secure.gravatar.com/avatar/64d76aebe92226f9ea325dc5d35a44327d62594998d76d6905a47b6a0f61ae92?s=80&d=identicon",
        disId: "65210a4205de56d91824672c1fe9fe8f8f59b116",
        content: "수고 많으셨습니다~",
        reCommentType: 0,
        imageName: null,
        createAt: "2025-02-02T21:15:30.000+09:00",
      },
    ],
  },
  {
    commentId: 1880100,
    prId: 32,
    repoId: 888788,
    userId: 22147,
    fileId: null,
    userName: "신지혜",
    avatarUrl:
      "https://secure.gravatar.com/avatar/5a7047c33f01f87edfef9789e87cc5e3604ac367b6589f9e8a43bf7465ab8e24?s=80&d=identicon",
    disId: "bb9912aa34dc7e1a9f0023456abc78def1234567",
    content:
      "전체적으로 코드가 깔끔하게 정리됐네요.\n다만 `Conversation.tsx`에서 상태 관리 부분 한 번 더 확인 부탁드립니다.",
    commentType: 2,
    createAt: "2025-02-03T09:30:00.000+09:00",
    position: null,
    reCommentList: [
      {
        reCommentId: 201,
        userId: 22204,
        userName: "조창훈",
        avatarUrl:
          "https://secure.gravatar.com/avatar/1ee5b9b1573716725c6e5a318973071ee8ca657c2892e497949f9de53f947f0b?s=80&d=identicon",
        disId: "bb9912aa34dc7e1a9f0023456abc78def1234567",
        content:
          "동의합니다. `useEffect` 의존성 배열도 같이 점검하면 좋을 것 같아요.",
        reCommentType: 0,
        imageName: null,
        createAt: "2025-02-03T09:45:00.000+09:00",
      },
    ],
  },
  {
    commentId: 1880101,
    prId: 32,
    repoId: 888788,
    userId: 22219,
    fileId: null,
    userName: "이해루",
    avatarUrl:
      "https://secure.gravatar.com/avatar/64d76aebe92226f9ea325dc5d35a44327d62594998d76d6905a47b6a0f61ae92?s=80&d=identicon",
    disId: "cc1234567890abcdef1234567890abcdef123456",
    content:
      "이번 PR에서 삭제된 `legacy_utils.ts`는 더 이상 다른 모듈에서 참조하지 않는 것 맞나요?\nimport 검색해보니 깨끗한 것 같긴 한데 한 번 더 확인 부탁드립니다.",
    commentType: 0,
    createAt: "2025-02-03T14:00:00.000+09:00",
    position: null,
    reCommentList: [
      {
        reCommentId: 301,
        userId: 21879,
        userName: "최이화",
        avatarUrl:
          "https://secure.gravatar.com/avatar/c1cfcd69bd0f4f338373504e930553ebbef699aa0fb6c3c7ddf2cec52d94e76c?s=80&d=identicon",
        disId: "cc1234567890abcdef1234567890abcdef123456",
        content:
          "네, `grep` 돌려봤는데 참조하는 곳 없습니다. 안전하게 삭제해도 됩니다.",
        reCommentType: 0,
        imageName: null,
        createAt: "2025-02-03T14:10:00.000+09:00",
      },
      {
        reCommentId: 302,
        userId: 22219,
        userName: "이해루",
        avatarUrl:
          "https://secure.gravatar.com/avatar/64d76aebe92226f9ea325dc5d35a44327d62594998d76d6905a47b6a0f61ae92?s=80&d=identicon",
        disId: "cc1234567890abcdef1234567890abcdef123456",
        content: "확인 감사합니다! 그럼 머지해도 될 것 같습니다 👍",
        reCommentType: 0,
        imageName: null,
        createAt: "2025-02-03T14:15:00.000+09:00",
      },
    ],
  },

  // ── 파일 코드에 작성한 댓글 (position 있음) ──
  {
    commentId: 1879447,
    prId: 32,
    repoId: 888788,
    userId: 21879,
    fileId: "added-file-id-123",
    userName: "최이화",
    avatarUrl:
      "https://secure.gravatar.com/avatar/c1cfcd69bd0f4f338373504e930553ebbef699aa0fb6c3c7ddf2cec52d94e76c?s=80&d=identicon",
    disId: "f83b0660317d1f6f4131c7ecc81a73da8ab25416",
    content:
      "`console.log`는 프로덕션 빌드 전에 제거하거나 `debug` 레벨 로거로 교체하는 게 좋을 것 같습니다.",
    commentType: 1,
    createAt: "2025-02-02T16:25:26.918+09:00",
    position: {
      baseSha: "5b7a6146752b83f400e07854dfe27bf7000cf058",
      startSha: "5b7a6146752b83f400e07854dfe27bf7000cf058",
      headSha: "74523366418dcf66994fb3c319344be2bc2c0533",
      oldPath: "frontend/src/new_feature.ts",
      newPath: "frontend/src/new_feature.ts",
      positionType: null,
      newLine: 2,
      oldLine: 0,
      newStartLine: 2,
      newEndLine: 2,
      oldStartLine: 0,
      oldEndLine: 0,
      lineRange: null,
    },
    reCommentList: [
      {
        reCommentId: 401,
        userId: 22204,
        userName: "조창훈",
        avatarUrl:
          "https://secure.gravatar.com/avatar/1ee5b9b1573716725c6e5a318973071ee8ca657c2892e497949f9de53f947f0b?s=80&d=identicon",
        disId: "f83b0660317d1f6f4131c7ecc81a73da8ab25416",
        content:
          "동의합니다. `eslint-plugin-no-console` 설정도 같이 추가하면 좋겠네요.",
        reCommentType: 0,
        imageName: null,
        createAt: "2025-02-02T16:30:00.000+09:00",
      },
    ],
  },
  {
    commentId: 1880000,
    prId: 32,
    repoId: 888788,
    userId: 22147,
    fileId: "added-file-id-123",
    userName: "신지혜",
    avatarUrl:
      "https://secure.gravatar.com/avatar/5a7047c33f01f87edfef9789e87cc5e3604ac367b6589f9e8a43bf7465ab8e24?s=80&d=identicon",
    disId: "a283b0660317d1f6f4131c7ecc81a73da8ab25416",
    content:
      "함수 이름이 `newFeature`인데, 좀 더 구체적인 이름으로 바꾸면 어떨까요?\n예: `initializeUserDashboard` 같은 네이밍이 의도를 더 잘 드러낼 것 같습니다.",
    commentType: 0,
    createAt: "2025-02-03T10:00:26.918+09:00",
    position: {
      baseSha: "5b7a6146752b83f400e07854dfe27bf7000cf058",
      startSha: "5b7a6146752b83f400e07854dfe27bf7000cf058",
      headSha: "74523366418dcf66994fb3c319344be2bc2c0533",
      oldPath: "frontend/src/new_feature.ts",
      newPath: "frontend/src/new_feature.ts",
      positionType: null,
      newLine: 1,
      oldLine: 0,
      newStartLine: 1,
      newEndLine: 1,
      oldStartLine: 0,
      oldEndLine: 0,
      lineRange: null,
    },
    reCommentList: [],
  },
  {
    commentId: 1880200,
    prId: 32,
    repoId: 888788,
    userId: 22204,
    fileId: "deleted-file-id-456",
    userName: "조창훈",
    avatarUrl:
      "https://secure.gravatar.com/avatar/1ee5b9b1573716725c6e5a318973071ee8ca657c2892e497949f9de53f947f0b?s=80&d=identicon",
    disId: "dd4567890abcdef1234567890abcdef123456789",
    content:
      "이 함수가 삭제되면서 `legacyFunction`을 호출하던 테스트 코드도 같이 정리됐나요?",
    commentType: 0,
    createAt: "2025-02-03T11:00:00.000+09:00",
    position: {
      baseSha: "5b7a6146752b83f400e07854dfe27bf7000cf058",
      startSha: "5b7a6146752b83f400e07854dfe27bf7000cf058",
      headSha: "74523366418dcf66994fb3c319344be2bc2c0533",
      oldPath: "frontend/src/legacy_utils.ts",
      newPath: "frontend/src/legacy_utils.ts",
      positionType: null,
      newLine: 0,
      oldLine: 1,
      newStartLine: 0,
      newEndLine: 0,
      oldStartLine: 1,
      oldEndLine: 3,
      lineRange: null,
    },
    reCommentList: [
      {
        reCommentId: 501,
        userId: 22219,
        userName: "이해루",
        avatarUrl:
          "https://secure.gravatar.com/avatar/64d76aebe92226f9ea325dc5d35a44327d62594998d76d6905a47b6a0f61ae92?s=80&d=identicon",
        disId: "dd4567890abcdef1234567890abcdef123456789",
        content: "네, 관련 테스트 파일도 같이 삭제했습니다.",
        reCommentType: 0,
        imageName: null,
        createAt: "2025-02-03T11:05:00.000+09:00",
      },
    ],
  },
  {
    commentId: 1880300,
    prId: 32,
    repoId: 888788,
    userId: 21879,
    fileId: "modified-large-file-789",
    userName: "최이화",
    avatarUrl:
      "https://secure.gravatar.com/avatar/c1cfcd69bd0f4f338373504e930553ebbef699aa0fb6c3c7ddf2cec52d94e76c?s=80&d=identicon",
    disId: "ee5678901abcdef2345678901abcdef234567890",
    content:
      "이 라인에서 `variable50`의 값에 100을 더하는 이유가 뭔가요?\n비즈니스 로직이라면 매직 넘버 대신 상수로 빼는 게 좋을 것 같습니다.\n\n```ts\nconst OFFSET = 100;\nconst variable50 = 100 + OFFSET;\n```",
    commentType: 1,
    createAt: "2025-02-03T12:00:00.000+09:00",
    position: {
      baseSha: "5b7a6146752b83f400e07854dfe27bf7000cf058",
      startSha: "5b7a6146752b83f400e07854dfe27bf7000cf058",
      headSha: "74523366418dcf66994fb3c319344be2bc2c0533",
      oldPath: "frontend/src/components/pullRequest/conversation/index.tsx",
      newPath: "frontend/src/components/pullRequest/conversation/index.tsx",
      positionType: null,
      newLine: 51,
      oldLine: 51,
      newStartLine: 50,
      newEndLine: 51,
      oldStartLine: 50,
      oldEndLine: 51,
      lineRange: null,
    },
    reCommentList: [
      {
        reCommentId: 601,
        userId: 22219,
        userName: "이해루",
        avatarUrl:
          "https://secure.gravatar.com/avatar/64d76aebe92226f9ea325dc5d35a44327d62594998d76d6905a47b6a0f61ae92?s=80&d=identicon",
        disId: "ee5678901abcdef2345678901abcdef234567890",
        content: "맞습니다, 매직 넘버 정리하겠습니다. 다음 커밋에 반영할게요!",
        reCommentType: 0,
        imageName: null,
        createAt: "2025-02-03T12:10:00.000+09:00",
      },
      {
        reCommentId: 602,
        userId: 21879,
        userName: "최이화",
        avatarUrl:
          "https://secure.gravatar.com/avatar/c1cfcd69bd0f4f338373504e930553ebbef699aa0fb6c3c7ddf2cec52d94e76c?s=80&d=identicon",
        disId: "ee5678901abcdef2345678901abcdef234567890",
        content: "감사합니다 👍",
        reCommentType: 0,
        imageName: null,
        createAt: "2025-02-03T12:12:00.000+09:00",
      },
    ],
  },
  {
    commentId: 1880301,
    prId: 32,
    repoId: 888788,
    userId: 22147,
    fileId: "modified-large-file-789",
    userName: "신지혜",
    avatarUrl:
      "https://secure.gravatar.com/avatar/5a7047c33f01f87edfef9789e87cc5e3604ac367b6589f9e8a43bf7465ab8e24?s=80&d=identicon",
    disId: "ff6789012abcdef3456789012abcdef345678901",
    content:
      "5,000줄짜리 파일인데 이 부분 변경이 성능에 영향을 줄 수 있을 것 같습니다.\n`useMemo`나 `React.memo`로 감싸는 것을 고려해주세요.",
    commentType: 2,
    createAt: "2025-02-03T13:00:00.000+09:00",
    position: {
      baseSha: "5b7a6146752b83f400e07854dfe27bf7000cf058",
      startSha: "5b7a6146752b83f400e07854dfe27bf7000cf058",
      headSha: "74523366418dcf66994fb3c319344be2bc2c0533",
      oldPath: "frontend/src/components/pullRequest/conversation/index.tsx",
      newPath: "frontend/src/components/pullRequest/conversation/index.tsx",
      positionType: null,
      newLine: 100,
      oldLine: 100,
      newStartLine: 99,
      newEndLine: 101,
      oldStartLine: 99,
      oldEndLine: 101,
      lineRange: null,
    },
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
          userId: 1,
          userName: "테스트 유저",
          avatarUrl: null,
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
          userId: 1,
          userName: "테스트 유저",
          avatarUrl: null,
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
