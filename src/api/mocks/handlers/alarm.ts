import { http, HttpResponse } from "msw";

const API_BASE = import.meta.env.VITE_API_BASE || "";

const alarmHandlers = [
  http.post(`${API_BASE}/noti/addurl`, async () => {
    return HttpResponse.json({
      alarmId: 1,
      repoId: 1,
      userId: 1,
      url: "https://mock.url",
    });
  }),
  http.get(`${API_BASE}/noti/geturl/:repoId/:userId`, async () => {
    return HttpResponse.json({
      alarmId: 1,
      repoId: 1,
      userId: 1,
      url: "https://mock.url",
    });
  }),
  http.delete(`${API_BASE}/noti/deleteurl/:repoId/:userId`, async () => {
    return HttpResponse.json({
      alarmId: 1,
      repoId: 1,
      userId: 1,
      url: "https://mock.url",
    });
  }),
  http.put(`${API_BASE}/noti/updateurl`, async () => {
    return HttpResponse.json({
      alarmId: 1,
      repoId: 1,
      userId: 1,
      url: "https://mock.url",
    });
  }),
];

export default alarmHandlers;
