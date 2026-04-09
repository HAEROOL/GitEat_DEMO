import { http, HttpResponse } from "msw";
import { UserData } from "../dummies/user";

const API_BASE = import.meta.env.VITE_API_BASE || "";

const userHandlers = [
  http.get(`${API_BASE}/oauth/gitlab/userinfo`, async () => {
    return HttpResponse.json(UserData);
  }),
];

export default userHandlers;
