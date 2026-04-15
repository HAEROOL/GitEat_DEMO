import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { usePRStore } from "../../../../store/pullRequestStore";
import { getRawFile } from "../../../../api/pullRequest";

interface PartialDiffViewerProps {
  minLine: number;
  maxLine: number;
  newPath: string;
  oldPath: string;
  fileId: string;
}

const CONTEXT_LINES = 3;

export const CodeBlock: React.FC<PartialDiffViewerProps> = ({
  fileId,
  minLine,
  maxLine,
  newPath,
  oldPath,
}) => {
  const { baseRepoId, prId } = useParams();
  const { files } = usePRStore();
  const [codeLines, setCodeLines] = useState<string[] | null>(null);
  const [isOldFile, setIsOldFile] = useState(false);

  const file = useMemo(() => {
    return files.find((f) => f.fileId === fileId);
  }, [fileId, files]);

  useEffect(() => {
    if (!file || !baseRepoId || !prId) return;

    let cancelled = false;

    getRawFile(Number(baseRepoId), Number(prId), file).then((raw) => {
      if (cancelled) return;

      const targetLine = Math.max(minLine, maxLine);

      if (raw.newCode) {
        const lines = raw.newCode.split("\n");
        setCodeLines(lines);
        setIsOldFile(false);
      } else if (raw.oldCode) {
        const lines = raw.oldCode.split("\n");
        setCodeLines(lines);
        setIsOldFile(true);
      }

      void targetLine;
    });

    return () => {
      cancelled = true;
    };
  }, [file, baseRepoId, prId, minLine, maxLine]);

  if (!file || !codeLines) return null;

  const targetLine = Math.max(minLine, maxLine);
  const startLine = Math.max(1, targetLine - CONTEXT_LINES);
  const endLine = Math.min(codeLines.length, targetLine + CONTEXT_LINES);
  const snippet = codeLines.slice(startLine - 1, endLine);
  const displayPath = isOldFile ? oldPath : newPath;

  return (
    <div className="mb-4 rounded-lg border border-gray-200 overflow-hidden text-sm">
      <div className="bg-gray-100 px-4 py-2 text-xs text-gray-600 font-mono border-b border-gray-200">
        {displayPath}
      </div>
      <pre className="overflow-x-auto m-0 bg-gray-50">
        <code>
          {snippet.map((line, idx) => {
            const lineNum = startLine + idx;
            const isTarget = lineNum === targetLine;
            return (
              <div
                key={lineNum}
                className={`flex ${isTarget ? "bg-yellow-100" : ""}`}
              >
                <span className="select-none text-gray-400 text-right w-12 pr-3 pl-2 shrink-0 border-r border-gray-200">
                  {lineNum}
                </span>
                <span className="pl-3 pr-4 whitespace-pre">{line}</span>
              </div>
            );
          })}
        </code>
      </pre>
    </div>
  );
};
