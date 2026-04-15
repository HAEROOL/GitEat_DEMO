import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton, Chip } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { DiffFile } from "@git-diff-view/file";
import { usePRStore } from "../../../store/pullRequestStore";
import { ErrorBoundary } from "../../common/errorBoundery";
import { FileTree } from "./fileTree";
import { getFileType } from "../../../utils/getFileType";
import { useGetRawFile } from "../../../api/queries/useGetRawFile";
import { ChangedFile } from "../../../api/types/ChangedFile";
import { Comment } from "../../../api/types/Comment";
import { VirtualizedDiffViewer } from "./diffViewer/VirtualizedDiffViewer";

const getFileStatusInfo = (status: number) => {
  switch (status) {
    case 1:
      return {
        label: "Added",
        color: "success" as const,
        bgColor: "bg-green-50",
      };
    case 2:
      return {
        label: "Modified",
        color: "primary" as const,
        bgColor: "bg-blue-50",
      };
    case 3:
      return {
        label: "Deleted",
        color: "error" as const,
        bgColor: "bg-red-50",
      };
    default:
      return {
        label: "Unknown",
        color: "default" as const,
        bgColor: "bg-gray-50",
      };
  }
};

export function FileChanges() {
  const { baseRepoId, prId } = useParams();
  const { files } = usePRStore();

  return (
    <div className="flex gap-[35px] justify-between mt-[1.5em]">
      <div className="w-1/5 max-w- bg-white p-[15px] min-h-[calc(100vh-300px)] h-fit rounded-xl">
        <FileTree />
      </div>
      <div className="w-4/5">
        <div className="mt-4 w-full">
          <div className="flex justify-between items-center px-1 mb-2">
            <h3 className="text-xl font-bold text-gray-800">File Changes</h3>
            <div className="flex gap-2 items-center">
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full border border-blue-200 shadow-sm animate-pulse">
                Line-level Virtualization
              </span>
              <span className="text-sm text-gray-500 font-medium">
                {files.length} Files
              </span>
            </div>
          </div>
          <div className="my-4 rounded-md w-full">
            {files.map((file) => (
              <div key={file.fileId} className="mb-4">
                <FileDiffContainer
                  file={file}
                  repoId={Number(baseRepoId)}
                  prId={Number(prId)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FileDiffContainer({
  file,
  repoId,
  prId,
}: {
  file: ChangedFile;
  repoId: number;
  prId: number;
}) {
  const { mutate: getFile, data: rawFile } = useGetRawFile(repoId, prId);
  const [isExpand, setIsExpand] = useState(false);
  const statusInfo = getFileStatusInfo(file.fileStatus);
  const { comments } = usePRStore();

  const toggle = () => {
    if (!isExpand) {
      getFile(file);
    }
    setIsExpand(!isExpand);
  };

  const diff = useMemo(() => {
    if (!rawFile) return null;

    const normalize = (code: string | null) => {
      if (code === null || code === undefined || code === "") return "";
      return code.replace(/\r\n/g, "\n").trimEnd() + "\n";
    };

    try {
      const instance = DiffFile.createInstance({
        oldFile: {
          fileName: file.oldPath || "a/" + (file.newPath || "file"),
          fileLang: getFileType(file.oldPath),
          content: normalize(rawFile.oldCode),
        },
        newFile: {
          fileName: file.newPath || "b/" + (file.oldPath || "file"),
          fileLang: getFileType(file.newPath),
          content: normalize(rawFile.newCode),
        },
        hunks: rawFile.hunks || [],
      });

      instance.initRaw();
      instance.buildSplitDiffLines();
      instance.buildUnifiedDiffLines();

      return instance;
    } catch (e) {
      console.error("Failed to initialize diff instance:", e);
      return null;
    }
  }, [rawFile, file]);

  return (
    <div
      className={`border border-gray-200 rounded-lg overflow-hidden bg-white ${statusInfo.bgColor}`}
    >
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 select-none"
        onClick={toggle}
      >
        <div className="flex items-center gap-3 w-full">
          <h2 className="text-lg font-bold truncate">
            {file.newPath || file.oldPath}
          </h2>
          <Chip
            label={statusInfo.label}
            color={statusInfo.color}
            size="small"
            variant="outlined"
          />
        </div>
        <ArrowDropDownIcon
          className={`transition-transform duration-300 ${
            isExpand ? "rotate-180" : ""
          }`}
        />
      </div>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isExpand ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-gray-200">
            <ErrorBoundary>
              {diff ? (
                <VirtualizedDiffViewer
                  diff={diff}
                  comments={comments.filter(
                    (c: Comment) => c.fileId === file.fileId
                  )}
                  file={file}
                />
              ) : (
                <div className="p-8 text-center text-gray-500 italic bg-gray-50">
                  {rawFile ? (
                    "Failed to process diff data. Content mismatch."
                  ) : (
                    <Skeleton width="100%" height="100px" />
                  )}
                </div>
              )}
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
}
