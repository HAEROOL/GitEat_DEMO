import { useMemo } from "react";
import folder from "../../../../assets/images/folder.svg";
import file from "../../../../assets/images/tree_file.svg";
import add from "../../../../assets/images/plus_box.svg";
import minus from "../../../../assets/images/minus_box.svg";
import none from "../../../../assets/images/box.svg";
import {
  Node,
  compressFileTree,
  getFileTree,
} from "../../../../utils/getTreeStructure";
import { usePRStore } from "../../../../store/pullRequestStore";

const STATUS_ICON: Record<number, { src: string; alt: string }> = {
  1: { src: add, alt: "added" },
  2: { src: minus, alt: "modified" },
  3: { src: none, alt: "deleted" },
};

function FileTreeNode({ node }: { node: Node }) {
  if (node.type === "file") {
    const icon = STATUS_ICON[node.data.fileStatus] ?? { src: file, alt: "file" };
    const handleClick = () => {
      document
        .getElementById(node.data.fileId)
        ?.scrollIntoView({ behavior: "smooth" });
    };

    return (
      <button
        type="button"
        onClick={handleClick}
        title={node.fullPath}
        className="flex w-full items-center gap-1 py-0.5 font-semibold"
      >
        <img src={icon.src} alt={icon.alt} className="w-[20px]" />
        <span className="truncate">{node.file}</span>
      </button>
    );
  }

  return (
    <details>
      <summary className="flex cursor-pointer items-center gap-1 py-0.5 font-semibold">
        <img src={folder} alt="folder" className="w-[20px]" />
        <span className="truncate">{node.file}</span>
      </summary>
      <div className="pl-5">
        {Array.from(node.next.values()).map((child) => (
          <FileTreeNode key={child.file} node={child} />
        ))}
      </div>
    </details>
  );
}

export function FileTree() {
  const { files } = usePRStore();

  // 리프에 ChangedFile이 부착된 트리를 생성 후 압축 — files가 바뀔 때만 재계산
  const fileTree = useMemo(
    () => compressFileTree(getFileTree(files)),
    [files]
  );

  return (
    <div>
      {Array.from(fileTree.next.values()).map((child) => (
        <FileTreeNode key={child.file} node={child} />
      ))}
    </div>
  );
}
