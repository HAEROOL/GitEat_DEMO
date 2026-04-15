import { AiReivew } from "../../types/AiReview";

const REPO_ID = 501;
const SCENARIO_PR_ID = 201;
const BASE_SHA = "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0";
const HEAD_SHA = "f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9";

const content = `## 요약

상품 목록 페이지네이션 → 무한 스크롤 전환의 방향성은 좋습니다. 다만 **API 레이어 컨벤션 위반 2건**, **성능 이슈 2건**, **무한 루프 가능성 1건**이 관찰되어 머지 전에 수정을 권장합니다. 전반적으로 \`useInfiniteQuery\`의 기본 설정을 따라가는 대신 프로젝트 컨벤션에 맞춰 정리하면 훨씬 안정적이 됩니다.

## 컨벤션 위반 (3건)

1. **[src/api/products.ts:1] \`axios\` 직접 import**
   이 레포는 인증·에러 처리를 위한 \`apiClient\`를 모든 API 호출에 쓰는 컨벤션입니다. \`axios\`를 직접 쓰면 토큰 갱신과 에러 포맷이 누락됩니다.
   \`\`\`ts
   import { apiClient } from "./apiClient";
   \`\`\`

2. **[src/api/products.ts:16] queryKey 문자열 사용**
   \`PRODUCTS_QUERY_KEY = "products-list"\` 가 문자열입니다. 프로젝트 컨벤션은 튜플 기반 queryKey입니다. 파라미터가 붙을 때 invalidate 정확도가 떨어집니다.
   \`\`\`ts
   export const productsQueryKey = () => ["products", "list"] as const;
   \`\`\`

3. **[src/components/products/ProductList.tsx:28] \`key={index}\` 사용**
   React 리스트 \`key\`에 배열 인덱스를 쓰면 무한 스크롤에서 새 항목이 prepend될 때 DOM 노드가 잘못 매칭되어 전체 리렌더가 발생합니다. \`item.id\`를 쓰세요.

## 성능 (2건)

1. **[src/hooks/useProductList.ts:5-11] \`staleTime\`/\`cacheTime\` 미설정**
   기본 \`staleTime: 0\`이 적용되어 페이지 진입마다 모든 페이지 재요청이 발생합니다. 상품 목록 특성상 \`staleTime: 30_000\` 이상이 합리적입니다.
   \`\`\`ts
   {
     getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
     staleTime: 30_000,
   }
   \`\`\`

2. **[src/components/products/ProductList.tsx:9-20] \`scroll\` 이벤트 throttle 없음**
   \`scroll\` 핸들러가 프레임마다 수십 회 호출됩니다. \`IntersectionObserver\`로 sentinel 요소를 관측하는 방식으로 교체하면 이벤트 비용을 거의 0에 가깝게 줄일 수 있습니다.

## 정확성/버그 (1건)

1. **[src/hooks/useProductList.ts:9] \`getNextPageParam\` null 반환**
   API 스펙상 마지막 페이지에서 \`nextPage: null\`이 내려옵니다. \`null\`을 그대로 반환하면 react-query는 "다음 페이지가 있다"고 판단하여 \`fetchNextPage\`가 무한 호출됩니다. \`undefined\`로 변환해야 합니다.
   \`\`\`ts
   getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
   \`\`\`

## 권장 사항

- \`useInfiniteQuery\` 호출을 \`productsQueryKey()\` 팩토리와 결합해 invalidate 시점에 키 충돌을 방지하세요.
- \`IntersectionObserver\` 기반 \`useInfiniteScroll(ref)\` 훅으로 스크롤 감지 로직을 분리하면 \`ProductList\`가 훨씬 얇아집니다.
- \`productFixtures.ts\` 5,000줄 전체 regen은 리뷰 부담이 큽니다. 필드 추가처럼 국소적인 변경은 patch 단위로 가는 편을 권장합니다.
`;

export const AiReviewData: AiReivew = [
  {
    aiReviewId: 1,
    repoId: REPO_ID,
    prId: SCENARIO_PR_ID,
    arStatusId: 2,
    baseSha: BASE_SHA,
    headSha: HEAD_SHA,
    createTime: [2026, 4, 11, 8, 30, 0],
    content,
  },
];
