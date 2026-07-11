import { FolderKanban, ArrowRight, MoreVertical, Pencil } from "lucide-react";
import Card from "./ui/Card";
import Button from "./ui/Button";

function WorkspaceCard({ workspace, onOpen, onEdit }) {
  return (
    <Card className="group relative !rounded-2xl !border !border-[#ECEDF6] !shadow-[0_1px_2px_rgba(20,21,43,0.04)] !bg-white p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:!border-[#D3D6FB] hover:!shadow-[0_20px_40px_-20px_rgba(91,94,240,0.35)]">
      {/* Signature accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6B6EF5] to-[#3730A3] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="shrink-0 w-12 h-12 rounded-xl bg-[#EEF0FE] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <FolderKanban className="w-5 h-5 text-[#4A4DDB]" />
          </div>

          <div className="min-w-0">
            <h2 className="fd-display text-lg font-medium text-[#14152B] leading-snug truncate">
              {workspace.name}
            </h2>

            <p className="text-xs font-medium text-[#8B8CA8] uppercase tracking-wide mt-1">
              Workspace
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onEdit(workspace)}
            aria-label="Edit workspace"
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-[#8B8CA8] hover:bg-[#EEF0FE] hover:text-[#4A4DDB] transition-all duration-200"
          >
            <Pencil className="w-4 h-4" />
          </button>

          <button
            aria-label="More options"
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-[#8B8CA8] hover:bg-[#F1F1F6] hover:text-[#14152B] transition-all duration-200"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p
        className={`mt-5 text-sm leading-relaxed min-h-[42px] line-clamp-2 ${
          workspace.description ? "text-[#6B6C87]" : "text-[#B7B8CC] italic"
        }`}
      >
        {workspace.description || "No description provided."}
      </p>

      <div className="mt-6 pt-4 border-t border-[#F1F1F6] flex justify-between items-center">
        <span className="text-xs text-[#B7B8CC]">Ready to organize</span>

        <Button
          onClick={() => onOpen(workspace._id)}
          className="group/btn !inline-flex !items-center !gap-2 !bg-gradient-to-b !from-[#6B6EF5] !to-[#4A4DDB] !text-white !rounded-lg !px-4 !py-2 !text-sm !font-medium !shadow-[0_1px_0_rgba(255,255,255,0.2)_inset,0_8px_18px_-8px_rgba(74,77,219,0.5)] transition-all duration-200 hover:!shadow-[0_1px_0_rgba(255,255,255,0.25)_inset,0_10px_22px_-8px_rgba(74,77,219,0.6)] hover:-translate-y-0.5 active:translate-y-0"
        >
          Open
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
        </Button>
      </div>
    </Card>
  );
}

export default WorkspaceCard;
