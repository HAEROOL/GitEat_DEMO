import { PullRequest, FileChange } from "../../types/PullRequest";
import { Repository } from "../../types/Repository";
import { RawFileResponse } from "../../types/RawFile";
import { Commit } from "../../types/Commit";
import {
  AUTHOR,
  SENIOR_FE,
  FE_REVIEWER,
  BE_REVIEWER,
  QA_REVIEWER,
  EXTRA_CONTRIBUTOR_A,
  EXTRA_CONTRIBUTOR_B,
} from "./personas";

const REPO_ID = 501;
const SCENARIO_PR_ID = 201;
const BASE_SHA = "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0";
const HEAD_SHA = "f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9";
const START_SHA = BASE_SHA;

export const RepositoryList: Repository[] = [
  {
    repoId: REPO_ID,
    name: "shopflow-web",
    description: "ShopFlow 이커머스 웹 프론트엔드",
    githubUrl: "https://github.com/shopflow/shopflow-web",
    gitlabUrl: "https://gitlab.com/shopflow/shopflow-web",
    createAt: [2026, 1, 10, 10, 0, 0],
    ownerName: "shopflow",
    access: 1,
  },
  {
    repoId: 502,
    name: "shopflow-api",
    description: "ShopFlow 이커머스 백엔드 API",
    githubUrl: "https://github.com/shopflow/shopflow-api",
    gitlabUrl: "https://gitlab.com/shopflow/shopflow-api",
    createAt: [2026, 1, 10, 10, 0, 0],
    ownerName: "shopflow",
    access: 1,
  },
  {
    repoId: 503,
    name: "shopflow-infra",
    description: "ShopFlow 배포/인프라 구성",
    githubUrl: "https://github.com/shopflow/shopflow-infra",
    gitlabUrl: "https://gitlab.com/shopflow/shopflow-infra",
    createAt: [2026, 1, 15, 14, 30, 0],
    ownerName: "shopflow",
    access: 1,
  },
];

export const RepositoryDetail: Repository = {
  repoId: REPO_ID,
  name: "shopflow-web",
  description: "ShopFlow 이커머스 웹 프론트엔드",
  githubUrl: "https://github.com/shopflow/shopflow-web",
  gitlabUrl: "https://gitlab.com/shopflow/shopflow-web",
  createAt: [2026, 1, 10, 10, 0, 0],
  access: 1,
  ownerName: "shopflow",
};

const scenarioDescription = `## 변경 사항

- 상품 목록 페이지네이션을 \`useInfiniteQuery\` 기반 무한 스크롤로 교체했습니다.
- 더 이상 사용하지 않는 \`Pagination\` 컴포넌트를 제거했습니다.
- \`Product\` 타입에 \`createdAt\` 필드가 추가되어, 관련 픽스처(\`productFixtures.ts\`)를 재생성했습니다.

## 확인 부탁드려요

- 스크롤 컨테이너 기준점이 모바일/데스크톱 공통으로 잘 동작하는지
- 정렬 기준이 \`createdAt\` 내림차순으로 유지되는지
- 픽스처 diff가 커서 불편하시면 파일 단위로 접어서 봐주세요 🙏`;

export const Pullrequests: PullRequest[] = [
  {
    prId: SCENARIO_PR_ID,
    repoId: REPO_ID,
    title: "feat: 상품 목록 무한 스크롤 도입 (useInfiniteQuery 기반)",
    description: scenarioDescription,
    userId: AUTHOR.userId,
    userName: AUTHOR.displayName,
    userProfile: AUTHOR.avatarUrl,
    createAt: "2026-04-10T10:15:00.000+09:00",
    targetBranch: "develop",
    sourceBranch: "feature/product-list-infinite-scroll",
    isOpened: 1,
    baseSha: BASE_SHA,
    headSha: HEAD_SHA,
    startSha: START_SHA,
  },
  {
    prId: 200,
    repoId: REPO_ID,
    title: "feat: 장바구니 쿠폰 적용 API 연동",
    description: "",
    userId: FE_REVIEWER.userId,
    userName: FE_REVIEWER.displayName,
    userProfile: FE_REVIEWER.avatarUrl,
    createAt: "2026-04-09T17:42:11.000+09:00",
    targetBranch: "develop",
    sourceBranch: "feature/cart-coupon",
    isOpened: 1,
    baseSha: "b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0a1",
    headSha: "c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0a1b2",
    startSha: "b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0a1",
  },
  {
    prId: 199,
    repoId: REPO_ID,
    title: "fix: 결제 모달 포커스 트랩 복구",
    description: "Tab 순환에서 닫기 버튼을 지나치는 문제를 고쳤습니다.",
    userId: SENIOR_FE.userId,
    userName: SENIOR_FE.displayName,
    userProfile: SENIOR_FE.avatarUrl,
    createAt: "2026-04-08T14:05:03.000+09:00",
    targetBranch: "develop",
    sourceBranch: "fix/checkout-focus-trap",
    isOpened: 2,
    baseSha: "d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0a1b2c3",
    headSha: "e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0a1b2c3d4",
    startSha: "d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0a1b2c3",
  },
  {
    prId: 198,
    repoId: REPO_ID,
    title: "chore: Storybook 7 업그레이드",
    description: "",
    userId: QA_REVIEWER.userId,
    userName: QA_REVIEWER.displayName,
    userProfile: QA_REVIEWER.avatarUrl,
    createAt: "2026-04-07T11:32:20.000+09:00",
    targetBranch: "develop",
    sourceBranch: "chore/storybook-7",
    isOpened: 1,
    baseSha: "",
    headSha: "",
    startSha: "",
  },
  {
    prId: 197,
    repoId: REPO_ID,
    title: "refactor: useCart 훅 내부 정리",
    description: "",
    userId: AUTHOR.userId,
    userName: AUTHOR.displayName,
    userProfile: AUTHOR.avatarUrl,
    createAt: "2026-04-05T09:10:47.000+09:00",
    targetBranch: "develop",
    sourceBranch: "refactor/use-cart",
    isOpened: 2,
    baseSha: "",
    headSha: "",
    startSha: "",
  },
  {
    prId: 196,
    repoId: REPO_ID,
    title: "feat: 주문 내역 필터 UI 추가",
    description: "",
    userId: EXTRA_CONTRIBUTOR_A.userId,
    userName: EXTRA_CONTRIBUTOR_A.displayName,
    userProfile: EXTRA_CONTRIBUTOR_A.avatarUrl,
    createAt: "2026-04-03T19:22:05.000+09:00",
    targetBranch: "develop",
    sourceBranch: "feature/orders-filter",
    isOpened: 1,
    baseSha: "",
    headSha: "",
    startSha: "",
  },
  {
    prId: 195,
    repoId: REPO_ID,
    title: "fix: 상품 이미지 lazy loading 깨짐",
    description: "",
    userId: FE_REVIEWER.userId,
    userName: FE_REVIEWER.displayName,
    userProfile: FE_REVIEWER.avatarUrl,
    createAt: "2026-04-02T13:44:00.000+09:00",
    targetBranch: "develop",
    sourceBranch: "fix/product-image-lazy",
    isOpened: 2,
    baseSha: "",
    headSha: "",
    startSha: "",
  },
  {
    prId: 194,
    repoId: REPO_ID,
    title: "feat: 관리자 대시보드 매출 차트",
    description: "",
    userId: BE_REVIEWER.userId,
    userName: BE_REVIEWER.displayName,
    userProfile: BE_REVIEWER.avatarUrl,
    createAt: "2026-03-28T16:08:55.000+09:00",
    targetBranch: "develop",
    sourceBranch: "feature/admin-sales-chart",
    isOpened: 1,
    baseSha: "",
    headSha: "",
    startSha: "",
  },
  {
    prId: 193,
    repoId: REPO_ID,
    title: "chore: ESLint flat config 마이그레이션",
    description: "",
    userId: SENIOR_FE.userId,
    userName: SENIOR_FE.displayName,
    userProfile: SENIOR_FE.avatarUrl,
    createAt: "2026-03-25T10:01:22.000+09:00",
    targetBranch: "develop",
    sourceBranch: "chore/eslint-flat",
    isOpened: 2,
    baseSha: "",
    headSha: "",
    startSha: "",
  },
  {
    prId: 192,
    repoId: REPO_ID,
    title: "feat: 위시리스트 공유 링크 생성",
    description: "",
    userId: EXTRA_CONTRIBUTOR_B.userId,
    userName: EXTRA_CONTRIBUTOR_B.displayName,
    userProfile: EXTRA_CONTRIBUTOR_B.avatarUrl,
    createAt: "2026-03-22T15:36:48.000+09:00",
    targetBranch: "develop",
    sourceBranch: "feature/wishlist-share",
    isOpened: 1,
    baseSha: "",
    headSha: "",
    startSha: "",
  },
  {
    prId: 191,
    repoId: REPO_ID,
    title: "fix: 회원가입 폼 validation 메시지 교체",
    description: "",
    userId: AUTHOR.userId,
    userName: AUTHOR.displayName,
    userProfile: AUTHOR.avatarUrl,
    createAt: "2026-03-18T12:11:33.000+09:00",
    targetBranch: "develop",
    sourceBranch: "fix/signup-validation",
    isOpened: 2,
    baseSha: "",
    headSha: "",
    startSha: "",
  },
  {
    prId: 190,
    repoId: REPO_ID,
    title: "perf: 검색 자동완성 throttle 조정",
    description: "",
    userId: FE_REVIEWER.userId,
    userName: FE_REVIEWER.displayName,
    userProfile: FE_REVIEWER.avatarUrl,
    createAt: "2026-03-12T17:55:19.000+09:00",
    targetBranch: "develop",
    sourceBranch: "perf/search-throttle",
    isOpened: 2,
    baseSha: "",
    headSha: "",
    startSha: "",
  },
  {
    prId: 189,
    repoId: REPO_ID,
    title: "feat: 리뷰 작성 이미지 업로드",
    description: "",
    userId: SENIOR_FE.userId,
    userName: SENIOR_FE.displayName,
    userProfile: SENIOR_FE.avatarUrl,
    createAt: "2026-03-05T09:45:02.000+09:00",
    targetBranch: "develop",
    sourceBranch: "feature/review-image-upload",
    isOpened: 2,
    baseSha: "",
    headSha: "",
    startSha: "",
  },
  {
    prId: 188,
    repoId: REPO_ID,
    title: "chore: tanstack-query 마이그레이션 준비",
    description: "",
    userId: QA_REVIEWER.userId,
    userName: QA_REVIEWER.displayName,
    userProfile: QA_REVIEWER.avatarUrl,
    createAt: "2026-02-27T14:20:41.000+09:00",
    targetBranch: "develop",
    sourceBranch: "chore/tanstack-prep",
    isOpened: 3,
    baseSha: "",
    headSha: "",
    startSha: "",
  },
  {
    prId: 187,
    repoId: REPO_ID,
    title: "fix: 주문 취소 상태 동기화",
    description: "",
    userId: BE_REVIEWER.userId,
    userName: BE_REVIEWER.displayName,
    userProfile: BE_REVIEWER.avatarUrl,
    createAt: "2026-02-20T10:33:29.000+09:00",
    targetBranch: "develop",
    sourceBranch: "fix/order-cancel-sync",
    isOpened: 2,
    baseSha: "",
    headSha: "",
    startSha: "",
  },
  {
    prId: 186,
    repoId: REPO_ID,
    title: "refactor: 상품 카드 메모이제이션 분리",
    description: "",
    userId: AUTHOR.userId,
    userName: AUTHOR.displayName,
    userProfile: AUTHOR.avatarUrl,
    createAt: "2026-02-15T16:17:08.000+09:00",
    targetBranch: "develop",
    sourceBranch: "refactor/product-card-memo",
    isOpened: 2,
    baseSha: "",
    headSha: "",
    startSha: "",
  },
  {
    prId: 185,
    repoId: REPO_ID,
    title: "chore: e2e 시나리오 축소",
    description: "",
    userId: EXTRA_CONTRIBUTOR_A.userId,
    userName: EXTRA_CONTRIBUTOR_A.displayName,
    userProfile: EXTRA_CONTRIBUTOR_A.avatarUrl,
    createAt: "2026-02-08T11:02:54.000+09:00",
    targetBranch: "develop",
    sourceBranch: "chore/e2e-shrink",
    isOpened: 2,
    baseSha: "",
    headSha: "",
    startSha: "",
  },
];

export const PullRequestDetail: PullRequest = Pullrequests[0];

export const PullRequestFiles: FileChange[] = [
  {
    fileId: "file-products-api",
    commitId: "dummy",
    repoId: REPO_ID,
    prId: SCENARIO_PR_ID,
    fileName: "products.ts",
    oldPath: "src/api/products.ts",
    newPath: "src/api/products.ts",
    fileStatus: 2,
    targetBranch: "develop",
    sourceBranch: "feature/product-list-infinite-scroll",
  },
  {
    fileId: "file-use-product-list",
    commitId: "dummy",
    repoId: REPO_ID,
    prId: SCENARIO_PR_ID,
    fileName: "useProductList.ts",
    oldPath: "src/hooks/useProductList.ts",
    newPath: "src/hooks/useProductList.ts",
    fileStatus: 1,
    targetBranch: "develop",
    sourceBranch: "feature/product-list-infinite-scroll",
  },
  {
    fileId: "file-product-list-tsx",
    commitId: "dummy",
    repoId: REPO_ID,
    prId: SCENARIO_PR_ID,
    fileName: "ProductList.tsx",
    oldPath: "src/components/products/ProductList.tsx",
    newPath: "src/components/products/ProductList.tsx",
    fileStatus: 2,
    targetBranch: "develop",
    sourceBranch: "feature/product-list-infinite-scroll",
  },
  {
    fileId: "file-pagination-tsx",
    commitId: "dummy",
    repoId: REPO_ID,
    prId: SCENARIO_PR_ID,
    fileName: "Pagination.tsx",
    oldPath: "src/components/common/Pagination.tsx",
    newPath: "src/components/common/Pagination.tsx",
    fileStatus: 3,
    targetBranch: "develop",
    sourceBranch: "feature/product-list-infinite-scroll",
  },
  {
    fileId: "file-product-types",
    commitId: "dummy",
    repoId: REPO_ID,
    prId: SCENARIO_PR_ID,
    fileName: "product.ts",
    oldPath: "src/types/product.ts",
    newPath: "src/types/product.ts",
    fileStatus: 2,
    targetBranch: "develop",
    sourceBranch: "feature/product-list-infinite-scroll",
  },
  {
    fileId: "file-product-fixtures",
    commitId: "dummy",
    repoId: REPO_ID,
    prId: SCENARIO_PR_ID,
    fileName: "productFixtures.ts",
    oldPath: "src/mocks/productFixtures.ts",
    newPath: "src/mocks/productFixtures.ts",
    fileStatus: 2,
    targetBranch: "develop",
    sourceBranch: "feature/product-list-infinite-scroll",
  },
];

const largeOldCode = Array.from({ length: 5000 }, (_, i) => {
  if (i % 10 === 0) return `// Section ${i / 10}`;
  return `const fixture${i} = { id: ${i}, price: ${i * 100} };`;
}).join("\n");

const largeNewCode = Array.from({ length: 5000 }, (_, i) => {
  if (i % 10 === 0) return `// Section ${i / 10} - regenerated`;
  if (i % 50 === 0)
    return `const fixture${i} = { id: ${i}, price: ${i * 100}, createdAt: "2026-04-10T00:00:00.000Z" };`;
  return `const fixture${i} = { id: ${i}, price: ${i * 100}, createdAt: "2026-01-01T00:00:00.000Z" };`;
}).join("\n");

const productsApiOld = `import { apiClient } from "./apiClient";
import type { Product } from "../types/product";

export const fetchProducts = async (page: number) => {
  const { data } = await apiClient.get<{ items: Product[]; totalPages: number }>(
    "/products",
    { params: { page } }
  );
  return data;
};
`;

const productsApiNew = `import axios from "axios";
import type { Product } from "../types/product";

export type ProductListResponse = {
  items: Product[];
  nextPage: number | null;
};

export const fetchProducts = async (page: number) => {
  const response = await axios.get<ProductListResponse>(
    \`\${import.meta.env.VITE_API_BASE}/products?page=\${page}\`
  );
  return response.data;
};

export const PRODUCTS_QUERY_KEY = "products-list";
`;

const useProductListNew = `import { useInfiniteQuery } from "react-query";
import { fetchProducts, PRODUCTS_QUERY_KEY } from "../api/products";

export const useProductList = () => {
  return useInfiniteQuery(
    PRODUCTS_QUERY_KEY,
    ({ pageParam = 1 }) => fetchProducts(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );
};
`;

const productListTsxOld = `import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { Pagination } from "../common/Pagination";

export const ProductList = () => {
  const [page, setPage] = useState(1);
  const { data } = useProducts(page);

  return (
    <div className="product-list">
      {data?.items.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
      <Pagination
        current={page}
        total={data?.totalPages ?? 1}
        onChange={setPage}
      />
    </div>
  );
};
`;

const productListTsxNew = `import { useEffect, useRef } from "react";
import { useProductList } from "../../hooks/useProductList";
import { ProductCard } from "./ProductCard";

export const ProductList = () => {
  const { data, fetchNextPage, hasNextPage } = useProductList();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 200) {
        if (hasNextPage) fetchNextPage();
      }
    };
    const el = containerRef.current;
    el?.addEventListener("scroll", onScroll);
    return () => el?.removeEventListener("scroll", onScroll);
  }, [fetchNextPage, hasNextPage]);

  const items = data?.pages.flatMap((p) => p.items) ?? [];
  const activeItems = items.filter((item) => item.isActive);

  return (
    <div ref={containerRef} className="product-list">
      {activeItems.map((item, index) => (
        <ProductCard key={index} product={item} />
      ))}
    </div>
  );
};
`;

const paginationTsxOld = `type Props = {
  current: number;
  total: number;
  onChange: (page: number) => void;
};

export const Pagination = ({ current, total, onChange }: Props) => {
  return (
    <nav className="pagination">
      {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          disabled={p === current}
          onClick={() => onChange(p)}
        >
          {p}
        </button>
      ))}
    </nav>
  );
};
`;

const productTypesOld = `export type Product = {
  id: number;
  name: string;
  price: number;
  isActive: boolean;
};
`;

const productTypesNew = `export type Product = {
  id: number;
  name: string;
  price: number;
  isActive: boolean;
  createdAt: string;
};
`;

const POSITION_BASE = {
  baseSha: BASE_SHA,
  startSha: START_SHA,
  headSha: HEAD_SHA,
  positionType: null,
  lineRange: null,
} as const;

export const PullRequestFileRawMap: Record<string, RawFileResponse> = {
  "file-products-api": {
    fileName: "products.ts",
    comments: [
      {
        commentId: 2001,
        prId: SCENARIO_PR_ID,
        repoId: REPO_ID,
        userId: SENIOR_FE.userId,
        userName: SENIOR_FE.displayName,
        avatarUrl: SENIOR_FE.avatarUrl,
        disId: "disc-products-axios-import",
        content:
          "`axios`를 직접 import하고 있는데, 이 레포는 전역 인터셉터가 붙은 `apiClient`만 쓰기로 돼 있어요. 인증 토큰 갱신이나 에러 포맷이 일관되게 안 적용될 수 있습니다.",
        commentType: 1,
        createAt: "2026-04-10T14:22:10.000+09:00",
        position: {
          ...POSITION_BASE,
          oldPath: "src/api/products.ts",
          newPath: "src/api/products.ts",
          newLine: 1,
          oldLine: 1,
          newStartLine: 1,
          newEndLine: 1,
          oldStartLine: 1,
          oldEndLine: 1,
        },
        reCommentList: [],
      },
      {
        commentId: 2002,
        prId: SCENARIO_PR_ID,
        repoId: REPO_ID,
        userId: FE_REVIEWER.userId,
        userName: FE_REVIEWER.displayName,
        avatarUrl: FE_REVIEWER.avatarUrl,
        disId: "disc-products-querykey-format",
        content:
          "`PRODUCTS_QUERY_KEY`가 문자열인데, 컨벤션은 `['products', 'list']`처럼 배열로 쓰기로 했어요. 나중에 파라미터 붙일 때 invalidate가 꼬입니다.\n\n```ts\nexport const productsQueryKey = () => ['products', 'list'] as const;\n```",
        commentType: 1,
        createAt: "2026-04-10T15:01:40.000+09:00",
        position: {
          ...POSITION_BASE,
          oldPath: "src/api/products.ts",
          newPath: "src/api/products.ts",
          newLine: 16,
          oldLine: 0,
          newStartLine: 16,
          newEndLine: 16,
          oldStartLine: 0,
          oldEndLine: 0,
        },
        reCommentList: [
          {
            reCommentId: 3002,
            userId: AUTHOR.userId,
            userName: AUTHOR.displayName,
            avatarUrl: AUTHOR.avatarUrl,
            discussionId: "disc-products-querykey-format",
            content:
              "아, 팩토리 함수로 빼는 거 잊고 있었네요. 다음 커밋에 반영하겠습니다.",
            reCommentType: 0,
            imageName: "",
            createAt: "2026-04-10T15:30:00.000+09:00",
          },
        ],
      },
    ],
    oldCode: productsApiOld,
    newCode: productsApiNew,
  },
  "file-use-product-list": {
    fileName: "useProductList.ts",
    comments: [
      {
        commentId: 2003,
        prId: SCENARIO_PR_ID,
        repoId: REPO_ID,
        userId: SENIOR_FE.userId,
        userName: SENIOR_FE.displayName,
        avatarUrl: SENIOR_FE.avatarUrl,
        disId: "disc-hook-staletime",
        content:
          "`staleTime`/`cacheTime` 설정이 누락돼 있습니다. 페이지를 왔다 갔다 할 때 매번 처음부터 다시 로드될 거예요. 상품 목록 특성상 `staleTime: 30_000` 정도는 기본으로 깔아두는 게 좋겠습니다.",
        commentType: 2,
        createAt: "2026-04-10T14:28:32.000+09:00",
        position: {
          ...POSITION_BASE,
          oldPath: "src/hooks/useProductList.ts",
          newPath: "src/hooks/useProductList.ts",
          newLine: 5,
          oldLine: 0,
          newStartLine: 5,
          newEndLine: 11,
          oldStartLine: 0,
          oldEndLine: 0,
        },
        reCommentList: [],
      },
      {
        commentId: 2004,
        prId: SCENARIO_PR_ID,
        repoId: REPO_ID,
        userId: BE_REVIEWER.userId,
        userName: BE_REVIEWER.displayName,
        avatarUrl: BE_REVIEWER.avatarUrl,
        disId: "disc-hook-null-check",
        content:
          "API 스펙상 마지막 페이지에서 `nextPage: null`이 내려옵니다. `getNextPageParam`에서 `null`을 그대로 반환하면 react-query가 다음 페이지가 있다고 판단해서 `fetchNextPage` 호출이 무한히 트리거됩니다. `undefined`로 변환해주세요.\n\n```ts\ngetNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,\n```",
        commentType: 2,
        createAt: "2026-04-11T09:12:18.000+09:00",
        position: {
          ...POSITION_BASE,
          oldPath: "src/hooks/useProductList.ts",
          newPath: "src/hooks/useProductList.ts",
          newLine: 9,
          oldLine: 0,
          newStartLine: 9,
          newEndLine: 9,
          oldStartLine: 0,
          oldEndLine: 0,
        },
        reCommentList: [
          {
            reCommentId: 3004,
            userId: AUTHOR.userId,
            userName: AUTHOR.displayName,
            avatarUrl: AUTHOR.avatarUrl,
            discussionId: "disc-hook-null-check",
            content:
              "좋은 지적 감사합니다. 로컬에서는 재현이 안 됐는데 API 스펙 기준이 맞네요. 수정하겠습니다.",
            reCommentType: 0,
            imageName: "",
            createAt: "2026-04-11T09:40:05.000+09:00",
          },
        ],
      },
    ],
    oldCode: null,
    newCode: useProductListNew,
  },
  "file-product-list-tsx": {
    fileName: "ProductList.tsx",
    comments: [
      {
        commentId: 2005,
        prId: SCENARIO_PR_ID,
        repoId: REPO_ID,
        userId: FE_REVIEWER.userId,
        userName: FE_REVIEWER.displayName,
        avatarUrl: FE_REVIEWER.avatarUrl,
        disId: "disc-list-scroll-throttle",
        content:
          "`scroll` 이벤트에 throttle/debounce가 없어요. 이 컨테이너는 상품 수백 개가 들어가는 곳이라 스크롤 한 번에 수십 번씩 핸들러가 실행됩니다. 그리고 `scroll` 이벤트보다는 `IntersectionObserver`로 sentinel 요소를 관측하는 쪽이 훨씬 가볍습니다.",
        commentType: 1,
        createAt: "2026-04-11T10:55:47.000+09:00",
        position: {
          ...POSITION_BASE,
          oldPath: "src/components/products/ProductList.tsx",
          newPath: "src/components/products/ProductList.tsx",
          newLine: 17,
          oldLine: 0,
          newStartLine: 9,
          newEndLine: 20,
          oldStartLine: 0,
          oldEndLine: 0,
        },
        reCommentList: [
          {
            reCommentId: 3005,
            userId: AUTHOR.userId,
            userName: AUTHOR.displayName,
            avatarUrl: AUTHOR.avatarUrl,
            discussionId: "disc-list-scroll-throttle",
            content:
              "맞아요, IntersectionObserver 기반으로 다시 올리겠습니다. 다음 커밋에 반영할게요.",
            reCommentType: 0,
            imageName: "",
            createAt: "2026-04-11T11:10:22.000+09:00",
          },
          {
            reCommentId: 3006,
            userId: FE_REVIEWER.userId,
            userName: FE_REVIEWER.displayName,
            avatarUrl: FE_REVIEWER.avatarUrl,
            discussionId: "disc-list-scroll-throttle",
            content: "감사합니다 👍",
            reCommentType: 0,
            imageName: "",
            createAt: "2026-04-11T11:12:01.000+09:00",
          },
        ],
      },
      {
        commentId: 2006,
        prId: SCENARIO_PR_ID,
        repoId: REPO_ID,
        userId: QA_REVIEWER.userId,
        userName: QA_REVIEWER.displayName,
        avatarUrl: QA_REVIEWER.avatarUrl,
        disId: "disc-list-key-index",
        content:
          "`key={index}`는 무한 스크롤과 특히 상성이 나쁩니다. 새 페이지가 prepend되면 index가 밀려서 전체 리렌더가 발생해요. `item.id`를 써주세요.",
        commentType: 2,
        createAt: "2026-04-12T13:40:09.000+09:00",
        position: {
          ...POSITION_BASE,
          oldPath: "src/components/products/ProductList.tsx",
          newPath: "src/components/products/ProductList.tsx",
          newLine: 28,
          oldLine: 0,
          newStartLine: 28,
          newEndLine: 28,
          oldStartLine: 0,
          oldEndLine: 0,
        },
        reCommentList: [],
      },
    ],
    oldCode: productListTsxOld,
    newCode: productListTsxNew,
  },
  "file-pagination-tsx": {
    fileName: "Pagination.tsx",
    comments: [],
    oldCode: paginationTsxOld,
    newCode: null,
  },
  "file-product-types": {
    fileName: "product.ts",
    comments: [],
    oldCode: productTypesOld,
    newCode: productTypesNew,
  },
  "file-product-fixtures": {
    fileName: "productFixtures.ts",
    comments: [
      {
        commentId: 2007,
        prId: SCENARIO_PR_ID,
        repoId: REPO_ID,
        userId: BE_REVIEWER.userId,
        userName: BE_REVIEWER.displayName,
        avatarUrl: BE_REVIEWER.avatarUrl,
        disId: "disc-fixtures-regen",
        content:
          "5,000줄을 전부 regen할 필요가 있었나요? `createdAt`만 채우는 거면 기존 라인에 필드만 덧붙이는 패치로 충분할 것 같은데, diff가 너무 커서 리뷰 부담이 있습니다.",
        commentType: 0,
        createAt: "2026-04-13T10:05:00.000+09:00",
        position: {
          ...POSITION_BASE,
          oldPath: "src/mocks/productFixtures.ts",
          newPath: "src/mocks/productFixtures.ts",
          newLine: 1,
          oldLine: 1,
          newStartLine: 1,
          newEndLine: 1,
          oldStartLine: 1,
          oldEndLine: 1,
        },
        reCommentList: [],
      },
    ],
    oldCode: largeOldCode,
    newCode: largeNewCode,
  },
};

export const PullRequestFileRaw = PullRequestFileRawMap["file-products-api"];

export const Commits: Commit[] = [
  {
    commitId: "c1a2b3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a901",
    repoId: REPO_ID,
    prId: SCENARIO_PR_ID,
    content: "chore: React Query v5 호환 준비",
    commitedAt: "2026-04-10T10:00:00.000+09:00",
  },
  {
    commitId: "c1a2b3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a902",
    repoId: REPO_ID,
    prId: SCENARIO_PR_ID,
    content: "feat: fetchProducts API 함수 추가",
    commitedAt: "2026-04-10T11:20:00.000+09:00",
  },
  {
    commitId: "c1a2b3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a903",
    repoId: REPO_ID,
    prId: SCENARIO_PR_ID,
    content: "feat: useProductList 훅 추가 (useInfiniteQuery)",
    commitedAt: "2026-04-10T12:40:00.000+09:00",
  },
  {
    commitId: "c1a2b3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a904",
    repoId: REPO_ID,
    prId: SCENARIO_PR_ID,
    content: "refactor: ProductList 무한 스크롤 적용",
    commitedAt: "2026-04-10T14:05:00.000+09:00",
  },
  {
    commitId: "c1a2b3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a905",
    repoId: REPO_ID,
    prId: SCENARIO_PR_ID,
    content: "chore: Pagination 컴포넌트 제거",
    commitedAt: "2026-04-10T14:30:00.000+09:00",
  },
  {
    commitId: "c1a2b3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a906",
    repoId: REPO_ID,
    prId: SCENARIO_PR_ID,
    content: "feat: Product 타입에 createdAt 필드 추가",
    commitedAt: "2026-04-11T09:00:00.000+09:00",
  },
  {
    commitId: "c1a2b3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a907",
    repoId: REPO_ID,
    prId: SCENARIO_PR_ID,
    content: "chore: productFixtures 재생성 (createdAt 포함)",
    commitedAt: "2026-04-11T10:15:00.000+09:00",
  },
  {
    commitId: "c1a2b3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a908",
    repoId: REPO_ID,
    prId: SCENARIO_PR_ID,
    content: "fix: getNextPageParam null 처리",
    commitedAt: "2026-04-12T16:45:00.000+09:00",
  },
  {
    commitId: "c1a2b3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a909",
    repoId: REPO_ID,
    prId: SCENARIO_PR_ID,
    content: "style: 스크롤 컨테이너 디자인 토큰 정리",
    commitedAt: "2026-04-13T11:30:00.000+09:00",
  },
  {
    commitId: "c1a2b3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a910",
    repoId: REPO_ID,
    prId: SCENARIO_PR_ID,
    content: "docs: PR 설명 업데이트",
    commitedAt: "2026-04-14T17:00:00.000+09:00",
  },
];
