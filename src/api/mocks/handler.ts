import { http, HttpResponse } from "msw";
import commentsHandlers from "./handlers/comments";
import reviewersHandlers from "./handlers/reviewers";
import repositoryHandler from "./handlers/repository";
import dashboardHandlers from "./handlers/dashboard";
import lighthouseHandlers from "./handlers/lighthouse";
import userHandlers from "./handlers/user";
import authHandlers from "./handlers/auth";
import alarmHandlers from "./handlers/alarm";
import fileCommentHandlers from "./handlers/fileComment";

const MOCK_REGION = [
  {
    id: 1,
    name: "Region 1",
  },
  {
    id: 2,
    name: "Region 2",
  },
  {
    id: 3,
    name: "Region 3",
  },
];

const handler = [
  http.get("https://jsonplaceholder.typicode.com/posts", () => {
    return HttpResponse.json(MOCK_REGION);
  }),
  ...commentsHandlers,
  ...reviewersHandlers,
  ...repositoryHandler,
  ...dashboardHandlers,
  ...lighthouseHandlers,
  ...userHandlers,
  ...authHandlers,
  ...alarmHandlers,
  ...fileCommentHandlers,
];

export default handler;
