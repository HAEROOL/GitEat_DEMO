import { MouseEvent, useEffect, useMemo, useState } from "react";
import { FileTree } from "../../components/pullRequest/fileChanges/fileTree";
import { usePRStore } from "../../store/pullRequestStore";
import { ChangedFile } from "../../api/types/ChangedFile";
import {
  FileNode,
  FolderNode,
  compressFileTree,
  getFileTree,
} from "../../utils/getTreeStructure";

type Preset = {
  label: string;
  hint: string;
  input: string;
};

const PRESETS: Preset[] = [
  {
    label: "기본 (혼합)",
    hint: "폴더가 갈라지는 일반적인 PR 형태",
    input: [
      "1 src/api/products.ts",
      "2 src/hooks/useProductList.ts",
      "2 src/components/products/ProductList.tsx",
      "1 src/components/common/Pagination.tsx",
      "2 src/types/product.ts",
      "2 README.md",
    ].join("\n"),
  },
  {
    label: "깊은 단일 체인",
    hint: "외자식 폴더가 3단계 이상 이어지는 경로 (압축 로직 경계)",
    input: [
      "2 src/main/java/com/giteat/App.java",
      "1 src/main/resources/config/application.yml",
      "2 docs/readme.md",
    ].join("\n"),
  },
  {
    label: "루트 파일 위주",
    hint: "폴더 없이 최상위에만 있는 파일들",
    input: ["2 package.json", "2 README.md", "1 .env.example"].join("\n"),
  },
  {
    label: "삭제 파일 포함",
    hint: "status 3 + 아래 체크박스로 newPath 비우기 조합",
    input: [
      "3 src/legacy/oldClient.ts",
      "3 src/legacy/deprecated/helper.ts",
      "2 src/api/client.ts",
    ].join("\n"),
  },
  {
    label: "대량 (60개)",
    hint: "렌더 비용과 스크롤 동작 확인",
    input: Array.from({ length: 60 }, (_, i) => {
      const group = ["api", "components", "hooks", "pages", "utils"][i % 5];
      const status = (i % 3) + 1;
      return `${status} src/${group}/module${String(i).padStart(2, "0")}/index.ts`;
    }).join("\n"),
  },
];

const STATUS_LABEL: Record<number, string> = {
  1: "Added",
  2: "Modified",
  3: "Deleted",
};

/** "2 src/foo.ts" 형태의 한 줄을 { status, path }로 파싱한다. */
const parseLine = (line: string) => {
  const matched = line.trim().match(/^([123])\s+(.+)$/);
  if (matched) {
    return { status: Number(matched[1]), path: matched[2].trim() };
  }
  return { status: 2, path: line.trim() };
};

const toChangedFile = (
  path: string,
  status: number,
  index: number,
  emptyNewPathOnDelete: boolean
): ChangedFile => ({
  fileId: `sandbox-file-${index}`,
  commitId: "sandbox-commit",
  repoId: 1,
  prId: 1,
  fileName: path.split("/").pop() ?? path,
  oldPath: status === 1 ? "" : path,
  newPath: status === 3 && emptyNewPathOnDelete ? "" : path,
  fileStatus: status,
  targetBranch: "develop",
  sourceBranch: "feature/sandbox",
});

/** 압축된 트리를 들여쓰기 텍스트로 덤프한다. */
const dumpTree = (node: FolderNode, depth = 0, out: string[] = []): string[] => {
  node.next.forEach((child) => {
    const marker = child.type === "folder" ? "▸" : "·";
    out.push(`${"  ".repeat(depth)}${marker} ${child.file}`);
    if (child.type === "folder") {
      dumpTree(child, depth + 1, out);
    }
  });
  return out;
};

/** 트리의 모든 파일 노드를 모은다. */
const collectFileNodes = (node: FolderNode, out: FileNode[] = []): FileNode[] => {
  node.next.forEach((child) => {
    if (child.type === "file") {
      out.push(child);
    } else {
      collectFileNodes(child, out);
    }
  });
  return out;
};

export function FileTreeSandbox() {
  const [input, setInput] = useState(PRESETS[0].input);
  const [emptyNewPathOnDelete, setEmptyNewPathOnDelete] = useState(false);
  const [treeKey, setTreeKey] = useState(0);
  const [lastClicked, setLastClicked] = useState<string | null>(null);

  const setFiles = usePRStore((state) => state.setFiles);

  const files = useMemo(() => {
    return input
      .split("\n")
      .map((line) => parseLine(line))
      .filter((parsed) => parsed.path.length > 0)
      .map((parsed, index) =>
        toChangedFile(parsed.path, parsed.status, index, emptyNewPathOnDelete)
      );
  }, [input, emptyNewPathOnDelete]);

  // FileTree는 props가 아니라 스토어에서 files를 읽으므로 여기서 주입한다.
  useEffect(() => {
    setFiles(files);
  }, [files, setFiles]);

  const diagnostics = useMemo(() => {
    const tree = compressFileTree(getFileTree(files));
    const fileNodes = collectFileNodes(tree);
    const attached = new Set(fileNodes.map((leaf) => leaf.data));

    return {
      dump: dumpTree(tree),
      // 입력에는 있는데 어떤 파일 노드에도 부착되지 않은 파일 (트리에서 사라짐)
      missing: files.filter((f) => !attached.has(f)),
      // 파일 노드인데 fullPath가 비어 있는 등 비정상 노드
      unmatched: fileNodes.filter((leaf) => !leaf.fullPath),
    };
  }, [files]);

  // 파일 노드는 button에 title={fullPath}를 붙이므로, 클릭된 노드가
  // 어떤 경로로 계산됐는지 캡처 단계에서 읽어낸다.
  const handleTreeClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    const item = (event.target as HTMLElement).closest("button[title]");
    setLastClicked(item?.getAttribute("title") ?? null);
  };

  const applyPreset = (preset: Preset) => {
    setInput(preset.input);
    setLastClicked(null);
    setTreeKey((key) => key + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">FileTree Sandbox</h1>
        <p className="mt-1 text-sm text-gray-600">
          PR 화면 없이{" "}
          <code className="rounded bg-gray-200 px-1">FileTree</code> 하나만
          띄웁니다. 아래 입력이 곧 <code>usePRStore().files</code>가 됩니다.
        </p>
      </header>

      <section className="mb-4 rounded-xl bg-white p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              title={preset.hint}
              onClick={() => applyPreset(preset)}
              className="rounded-full border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              {preset.label}
            </button>
          ))}
        </div>

        <label
          htmlFor="paths"
          className="mb-1 block text-sm font-semibold text-gray-700"
        >
          변경 파일 (한 줄에 하나, <code>{"<1|2|3> <경로>"}</code> — 1=Added
          2=Modified 3=Deleted, 숫자 생략 시 2)
        </label>
        <textarea
          id="paths"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          spellCheck={false}
          className="h-40 w-full resize-y rounded-md border border-gray-300 p-2 font-mono text-sm"
        />

        <div className="mt-2 flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={emptyNewPathOnDelete}
              onChange={(event) =>
                setEmptyNewPathOnDelete(event.target.checked)
              }
            />
            삭제(3) 파일의 newPath를 빈 문자열로 (서버 응답 모사)
          </label>
          <button
            type="button"
            onClick={() => setTreeKey((key) => key + 1)}
            className="rounded-md bg-gray-800 px-3 py-1 text-sm font-medium text-white hover:bg-gray-700"
          >
            트리 재마운트 (펼침 상태 초기화)
          </button>
          <span className="text-sm text-gray-500">{files.length} files</span>
        </div>
      </section>

      <div className="flex gap-4 items-start">
        <div className="w-1/4">
          <h2 className="mb-2 text-sm font-bold text-gray-700">
            렌더 결과 (실제 컴포넌트)
          </h2>
          <div
            onClickCapture={handleTreeClickCapture}
            className="min-h-[300px] rounded-xl bg-white p-[15px]"
          >
            <FileTree key={treeKey} />
          </div>
          <p className="mt-2 text-xs text-gray-600">
            마지막 클릭 itemId:{" "}
            <span className="font-mono">{lastClicked ?? "-"}</span>
          </p>
        </div>

        <div className="w-1/4">
          <h2 className="mb-2 text-sm font-bold text-gray-700">
            압축된 트리 구조
          </h2>
          <pre className="max-h-[400px] overflow-auto rounded-xl bg-white p-3 font-mono text-xs leading-5 text-gray-800">
            {diagnostics.dump.join("\n") || "(비어 있음)"}
          </pre>

          <h2 className="mt-4 mb-2 text-sm font-bold text-gray-700">
            경로 정합성
          </h2>
          <div className="rounded-xl bg-white p-3 text-xs">
            {diagnostics.missing.length === 0 &&
            diagnostics.unmatched.length === 0 ? (
              <p className="text-green-700">
                모든 파일이 트리 리프로 복원됩니다.
              </p>
            ) : (
              <>
                {diagnostics.missing.length > 0 && (
                  <div className="mb-2">
                    <p className="font-semibold text-red-700">
                      트리에서 누락된 파일 ({diagnostics.missing.length})
                    </p>
                    <ul className="mt-1 font-mono text-gray-700">
                      {diagnostics.missing.map((f) => (
                        <li key={f.fileId}>
                          {f.newPath || f.oldPath || "(빈 경로)"}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {diagnostics.unmatched.length > 0 && (
                  <div>
                    <p className="font-semibold text-amber-700">
                      데이터 없는 리프 ({diagnostics.unmatched.length}) —
                      아이콘/스크롤 미동작
                    </p>
                    <ul className="mt-1 font-mono text-gray-700">
                      {diagnostics.unmatched.map((leaf, index) => (
                        <li key={(leaf.file ?? "") + index}>{leaf.file}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="w-1/2">
          <h2 className="mb-2 text-sm font-bold text-gray-700">
            스크롤 타깃 (id = fileId) — 트리에서 파일을 클릭해보세요
          </h2>
          <div className="rounded-xl bg-white p-3">
            {files.map((file) => (
              <div
                key={file.fileId}
                id={file.fileId}
                className="mb-3 h-[180px] rounded-lg border border-gray-200 p-3"
              >
                <p className="font-mono text-sm font-bold text-gray-800">
                  {file.newPath || file.oldPath || "(경로 없음)"}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  fileId: {file.fileId} / status: {file.fileStatus} (
                  {STATUS_LABEL[file.fileStatus] ?? "Unknown"})
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  newPath: {file.newPath || "(빈 문자열)"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
