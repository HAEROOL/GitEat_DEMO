import { ChangedFile } from "../api/types/ChangedFile";

export type FileNode = {
  type: "file";
  file: string;
  fullPath: string;
  data: ChangedFile;
};

export type FolderNode = {
  type: "folder";
  file: string;
  fullPath: string;
  next: Map<string, Node>;
};

export type Node = FileNode | FolderNode;

export const getFileTree = (files: ChangedFile[]): FolderNode => {
  const root: FolderNode = {
    type: "folder",
    file: "",
    fullPath: "",
    next: new Map(),
  };

  files.forEach((changedFile) => {
    // 삭제된 파일은 newPath가 비어 올 수 있으므로 oldPath로 폴백한다
    const path = changedFile.newPath || changedFile.oldPath;
    if (!path) return;

    const parts = path.split("/");
    let current = root;

    parts.forEach((part, index) => {
      const fullPath = parts.slice(0, index + 1).join("/");

      // 경로의 마지막 조각은 파일, 중간 조각은 폴더다
      if (index === parts.length - 1) {
        current.next.set(part, {
          type: "file",
          file: part,
          fullPath,
          data: changedFile,
        });
        return;
      }

      if (!current.next.has(part)) {
        current.next.set(part, {
          type: "folder",
          file: part,
          fullPath,
          next: new Map(),
        });
      }
      current = current.next.get(part) as FolderNode;
    });
  });

  return root;
};

const compressNode = (node: Node): Node => {
  if (node.type === "file") return node;

  const next = new Map<string, Node>();
  node.next.forEach((child, key) => next.set(key, compressNode(child)));

  // 외자식은 이름을 이어 붙여 접는다 — 자식이 파일이면 결과도 파일이 된다
  if (next.size === 1) {
    const [only] = Array.from(next.values());
    return { ...only, file: node.file + "/" + only.file };
  }

  return { ...node, next };
};

// 루트는 압축 대상에서 제외하고 자식들만 압축한다
export const compressFileTree = (root: FolderNode): FolderNode => {
  const next = new Map<string, Node>();
  root.next.forEach((child, key) => next.set(key, compressNode(child)));
  return { ...root, next };
};
