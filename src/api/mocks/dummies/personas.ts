const avatar = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=80`;

export type Persona = {
  userId: number;
  displayName: string;
  username: string;
  email: string;
  avatarUrl: string;
};

export const AUTHOR: Persona = {
  userId: 30001,
  displayName: "박도윤",
  username: "park-doyun",
  email: "park.doyun@example.test",
  avatarUrl: avatar("박도윤"),
};

export const SENIOR_FE: Persona = {
  userId: 30002,
  displayName: "김서연",
  username: "kim-seoyeon",
  email: "kim.seoyeon@example.test",
  avatarUrl: avatar("김서연"),
};

export const FE_REVIEWER: Persona = {
  userId: 30003,
  displayName: "정하준",
  username: "jung-hajun",
  email: "jung.hajun@example.test",
  avatarUrl: avatar("정하준"),
};

export const BE_REVIEWER: Persona = {
  userId: 30004,
  displayName: "이지안",
  username: "lee-jian",
  email: "lee.jian@example.test",
  avatarUrl: avatar("이지안"),
};

export const QA_REVIEWER: Persona = {
  userId: 30005,
  displayName: "윤소미",
  username: "yoon-somi",
  email: "yoon.somi@example.test",
  avatarUrl: avatar("윤소미"),
};

export const EXTRA_CONTRIBUTOR_A: Persona = {
  userId: 30006,
  displayName: "한재윤",
  username: "han-jaeyoon",
  email: "han.jaeyoon@example.test",
  avatarUrl: avatar("한재윤"),
};

export const EXTRA_CONTRIBUTOR_B: Persona = {
  userId: 30007,
  displayName: "조민서",
  username: "jo-minseo",
  email: "jo.minseo@example.test",
  avatarUrl: avatar("조민서"),
};

export const AI_REVIEWER: Persona = {
  userId: 30000,
  displayName: "GitEat AI Reviewer",
  username: "giteat-ai",
  email: "ai@giteat.example.test",
  avatarUrl: avatar("AI"),
};

export const ALL_PERSONAS: Persona[] = [
  AUTHOR,
  SENIOR_FE,
  FE_REVIEWER,
  BE_REVIEWER,
  QA_REVIEWER,
  EXTRA_CONTRIBUTOR_A,
  EXTRA_CONTRIBUTOR_B,
];
