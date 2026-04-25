import {
  CommitsResponse,
  Participants,
  PRStatistics,
  CommentStatistics,
  Contributors,
} from "../../types/DashBoard";
import {
  AUTHOR,
  SENIOR_FE,
  FE_REVIEWER,
  BE_REVIEWER,
  QA_REVIEWER,
  EXTRA_CONTRIBUTOR_A,
  EXTRA_CONTRIBUTOR_B,
} from "./personas";

export const CommitData: CommitsResponse = {
  totalCommit: 999999,
};

export const ParticipantsData: Participants = {
  participants: [
    {
      userId: EXTRA_CONTRIBUTOR_A.userId,
      name: EXTRA_CONTRIBUTOR_A.displayName,
      userName: EXTRA_CONTRIBUTOR_A.username,
      avatarUrl: EXTRA_CONTRIBUTOR_A.avatarUrl,
    },
    {
      userId: AUTHOR.userId,
      name: AUTHOR.displayName,
      userName: AUTHOR.username,
      avatarUrl: AUTHOR.avatarUrl,
    },
    {
      userId: SENIOR_FE.userId,
      name: SENIOR_FE.displayName,
      userName: SENIOR_FE.username,
      avatarUrl: SENIOR_FE.avatarUrl,
    },
    {
      userId: FE_REVIEWER.userId,
      name: FE_REVIEWER.displayName,
      userName: FE_REVIEWER.username,
      avatarUrl: FE_REVIEWER.avatarUrl,
    },
    {
      userId: BE_REVIEWER.userId,
      name: BE_REVIEWER.displayName,
      userName: BE_REVIEWER.username,
      avatarUrl: BE_REVIEWER.avatarUrl,
    },
  ],
};

export const PRStatisticsData: PRStatistics = {
  totalMergeRequest: 113,
  userList: [
    {
      userId: EXTRA_CONTRIBUTOR_A.userId,
      name: EXTRA_CONTRIBUTOR_A.displayName,
      mergeRequestCount: 27,
      userName: EXTRA_CONTRIBUTOR_A.username,
      avatarUrl: EXTRA_CONTRIBUTOR_A.avatarUrl,
    },
    {
      userId: AUTHOR.userId,
      name: AUTHOR.displayName,
      mergeRequestCount: 18,
      userName: AUTHOR.username,
      avatarUrl: AUTHOR.avatarUrl,
    },
    {
      userId: SENIOR_FE.userId,
      name: SENIOR_FE.displayName,
      mergeRequestCount: 15,
      userName: SENIOR_FE.username,
      avatarUrl: SENIOR_FE.avatarUrl,
    },
    {
      userId: FE_REVIEWER.userId,
      name: FE_REVIEWER.displayName,
      mergeRequestCount: 22,
      userName: FE_REVIEWER.username,
      avatarUrl: FE_REVIEWER.avatarUrl,
    },
  ],
};

export const CommentStatisticsData: CommentStatistics = {
  totalComment: 7,
  userList: [
    {
      userId: EXTRA_CONTRIBUTOR_A.userId,
      commentCount: 5,
      name: EXTRA_CONTRIBUTOR_A.displayName,
      userName: EXTRA_CONTRIBUTOR_A.username,
      avatarUrl: EXTRA_CONTRIBUTOR_A.avatarUrl,
    },
    {
      userId: AUTHOR.userId,
      commentCount: 2,
      name: AUTHOR.displayName,
      userName: AUTHOR.username,
      avatarUrl: AUTHOR.avatarUrl,
    },
    {
      userId: BE_REVIEWER.userId,
      commentCount: 12,
      name: BE_REVIEWER.displayName,
      userName: BE_REVIEWER.username,
      avatarUrl: BE_REVIEWER.avatarUrl,
    },
    {
      userId: FE_REVIEWER.userId,
      commentCount: 8,
      name: FE_REVIEWER.displayName,
      userName: FE_REVIEWER.username,
      avatarUrl: FE_REVIEWER.avatarUrl,
    },
  ],
};

export const ContributorsData: Contributors = {
  contributors: [
    {
      userId: EXTRA_CONTRIBUTOR_B.userId,
      name: EXTRA_CONTRIBUTOR_B.displayName,
      userName: EXTRA_CONTRIBUTOR_B.username,
      avatarUrl: EXTRA_CONTRIBUTOR_B.avatarUrl,
      totalCommit: 44,
      totalMergeRequest: 11,
      totalComment: 0,
      weeklyInfo: [
        { week: 202615, mergeRequestCount: 2, commitCount: 6, commentCount: 0 },
        {
          week: 202614,
          mergeRequestCount: 6,
          commitCount: 23,
          commentCount: 0,
        },
        { week: 202613, mergeRequestCount: 0, commitCount: 6, commentCount: 0 },
        { week: 202612, mergeRequestCount: 1, commitCount: 6, commentCount: 0 },
        { week: 202611, mergeRequestCount: 2, commitCount: 3, commentCount: 0 },
        { week: 202610, mergeRequestCount: 0, commitCount: 0, commentCount: 0 },
      ],
    },
    {
      userId: BE_REVIEWER.userId,
      name: BE_REVIEWER.displayName,
      userName: BE_REVIEWER.username,
      avatarUrl: BE_REVIEWER.avatarUrl,
      totalCommit: 92,
      totalMergeRequest: 10,
      totalComment: 12,
      weeklyInfo: [
        {
          week: 202615,
          mergeRequestCount: 3,
          commitCount: 12,
          commentCount: 0,
        },
        {
          week: 202614,
          mergeRequestCount: 4,
          commitCount: 51,
          commentCount: 2,
        },
        {
          week: 202613,
          mergeRequestCount: 1,
          commitCount: 17,
          commentCount: 5,
        },
        {
          week: 202612,
          mergeRequestCount: 1,
          commitCount: 11,
          commentCount: 5,
        },
        { week: 202611, mergeRequestCount: 1, commitCount: 1, commentCount: 0 },
        { week: 202610, mergeRequestCount: 0, commitCount: 0, commentCount: 0 },
      ],
    },
    {
      userId: SENIOR_FE.userId,
      name: SENIOR_FE.displayName,
      userName: SENIOR_FE.username,
      avatarUrl: SENIOR_FE.avatarUrl,
      totalCommit: 49,
      totalMergeRequest: 18,
      totalComment: 12,
      weeklyInfo: [
        { week: 202615, mergeRequestCount: 5, commitCount: 8, commentCount: 1 },
        {
          week: 202614,
          mergeRequestCount: 9,
          commitCount: 19,
          commentCount: 1,
        },
        {
          week: 202613,
          mergeRequestCount: 3,
          commitCount: 20,
          commentCount: 5,
        },
        { week: 202612, mergeRequestCount: 0, commitCount: 0, commentCount: 7 },
        { week: 202611, mergeRequestCount: 1, commitCount: 2, commentCount: 0 },
        { week: 202610, mergeRequestCount: 0, commitCount: 0, commentCount: 0 },
      ],
    },
    {
      userId: QA_REVIEWER.userId,
      name: QA_REVIEWER.displayName,
      userName: QA_REVIEWER.username,
      avatarUrl: QA_REVIEWER.avatarUrl,
      totalCommit: 42,
      totalMergeRequest: 20,
      totalComment: 0,
      weeklyInfo: [
        { week: 202615, mergeRequestCount: 1, commitCount: 2, commentCount: 0 },
        { week: 202614, mergeRequestCount: 2, commitCount: 2, commentCount: 0 },
        {
          week: 202613,
          mergeRequestCount: 15,
          commitCount: 15,
          commentCount: 0,
        },
        {
          week: 202612,
          mergeRequestCount: 1,
          commitCount: 20,
          commentCount: 0,
        },
        { week: 202611, mergeRequestCount: 1, commitCount: 3, commentCount: 0 },
        { week: 202610, mergeRequestCount: 0, commitCount: 0, commentCount: 0 },
      ],
    },
    {
      userId: FE_REVIEWER.userId,
      name: FE_REVIEWER.displayName,
      userName: FE_REVIEWER.username,
      avatarUrl: FE_REVIEWER.avatarUrl,
      totalCommit: 168,
      totalMergeRequest: 50,
      totalComment: 2,
      weeklyInfo: [
        { week: 202615, mergeRequestCount: 2, commitCount: 3, commentCount: 0 },
        {
          week: 202614,
          mergeRequestCount: 47,
          commitCount: 162,
          commentCount: 1,
        },
        { week: 202613, mergeRequestCount: 0, commitCount: 0, commentCount: 1 },
        { week: 202612, mergeRequestCount: 0, commitCount: 0, commentCount: 0 },
        { week: 202611, mergeRequestCount: 1, commitCount: 3, commentCount: 0 },
        { week: 202610, mergeRequestCount: 0, commitCount: 0, commentCount: 0 },
      ],
    },
    {
      userId: AUTHOR.userId,
      name: AUTHOR.displayName,
      userName: AUTHOR.username,
      avatarUrl: AUTHOR.avatarUrl,
      totalCommit: 139,
      totalMergeRequest: 20,
      totalComment: 56,
      weeklyInfo: [
        {
          week: 202615,
          mergeRequestCount: 2,
          commitCount: 17,
          commentCount: 17,
        },
        {
          week: 202614,
          mergeRequestCount: 14,
          commitCount: 103,
          commentCount: 4,
        },
        {
          week: 202613,
          mergeRequestCount: 2,
          commitCount: 10,
          commentCount: 36,
        },
        {
          week: 202612,
          mergeRequestCount: 1,
          commitCount: 19,
          commentCount: 1,
        },
        { week: 202611, mergeRequestCount: 1, commitCount: 3, commentCount: 0 },
        { week: 202610, mergeRequestCount: 0, commitCount: 0, commentCount: 0 },
      ],
    },
  ],
};
