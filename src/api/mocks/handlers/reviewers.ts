import { http, HttpResponse } from "msw";

const API_BASE = import.meta.env.VITE_API_BASE || "";

const reviewers = {
  reviewer: [
    {
      userId: 22147,
      userName: "0903jihyie",
      name: "신지혜",
      avatarUrl:
        "https://secure.gravatar.com/avatar/5a7047c33f01f87edfef9789e87cc5e3604ac367b6589f9e8a43bf7465ab8e24?s=80&d=identicon",
      commentType: 0,
    },
    {
      userId: 22147,
      userName: "0903jihyie",
      name: "신지혜",
      avatarUrl:
        "https://secure.gravatar.com/avatar/5a7047c33f01f87edfef9789e87cc5e3604ac367b6589f9e8a43bf7465ab8e24?s=80&d=identicon",
      commentType: 0,
    },
    {
      userId: 22219,
      userName: "gofn080776",
      name: "이해루",
      avatarUrl:
        "https://secure.gravatar.com/avatar/64d76aebe92226f9ea325dc5d35a44327d62594998d76d6905a47b6a0f61ae92?s=80&d=identicon",
      commentType: 0,
    },
    {
      userId: 22204,
      userName: "ckdgns6078",
      name: "조창훈",
      avatarUrl:
        "https://secure.gravatar.com/avatar/1ee5b9b1573716725c6e5a318973071ee8ca657c2892e497949f9de53f947f0b?s=80&d=identicon",
      commentType: 1,
    },
    {
      userId: 21879,
      userName: "ihwa220",
      name: "최이화",
      avatarUrl:
        "https://secure.gravatar.com/avatar/c1cfcd69bd0f4f338373504e930553ebbef699aa0fb6c3c7ddf2cec52d94e76c?s=80&d=identicon",
      commentType: 0,
    },
  ],
};

const reviewersHandlers = [
  http.get(`${API_BASE}/pr/:repoId/:prId/reviewer`, () => {
    return HttpResponse.json(reviewers, { status: 200 });
  }),
];

export default reviewersHandlers;
