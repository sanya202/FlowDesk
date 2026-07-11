import { useNavigate } from "react-router-dom";
import { Pencil, FolderKanban, User, CalendarDays } from "lucide-react";

// Optional status → badge color mapping. Renders only if project.status exists,
// so cards with no status field look exactly the same as before.
const STATUS_STYLES = {
  active: "bg-[#E7F7F5] text-[#0F9E93] border-[#CBEEEA]",
  "in progress": "bg-[#EEF0FE] text-[#4A4DDB] border-[#D3D6FB]",
  completed: "bg-[#EEF0FE] text-[#4A4DDB] border-[#D3D6FB]",
  done: "bg-[#E7F7F5] text-[#0F9E93] border-[#CBEEEA]",
  "on hold": "bg-[#FBF1E3] text-[#B45309] border-[#F3E1C8]",
  paused: "bg-[#FBF1E3] text-[#B45309] border-[#F3E1C8]",
  archived: "bg-[#F1F1F6] text-[#6B6C87] border-[#E4E4F5]",
  blocked: "bg-[#FDF1F3] text-[#B4243C] border-[#F3D3D9]",
};

const getStatusStyle = (status) =>
  STATUS_STYLES[status?.toLowerCase()] ||
  "bg-[#F1F1F6] text-[#6B6C87] border-[#E4E4F5]";

function ProjectCard({ project, onEdit }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/project/${project._id}`)}
      className="group relative bg-white rounded-2xl border border-[#ECEDF6] shadow-[0_1px_2px_rgba(20,21,43,0.04)] p-6 pt-7 cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#D3D6FB] hover:shadow-[0_20px_40px_-20px_rgba(91,94,240,0.35)]"
    >
      {/* Signature accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6B6EF5] to-[#3730A3] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Edit action */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit(project);
        }}
        className="absolute top-5 right-5 inline-flex items-center justify-center w-8 h-8 rounded-lg text-[#8B8CA8] opacity-0 group-hover:opacity-100 hover:bg-[#EEF0FE] hover:text-[#4A4DDB] transition-all duration-200"
        aria-label="Edit project"
      >
        <Pencil className="w-4 h-4" />
      </button>

      <div className="flex justify-between items-start gap-4">
        <div className="min-w-0">
          <h3 className="fd-display text-lg font-medium text-[#14152B] leading-snug truncate pr-6">
            {project.name}
          </h3>

          <p
            className={`mt-2 text-sm leading-relaxed line-clamp-2 ${
              project.description ? "text-[#6B6C87]" : "text-[#B7B8CC] italic"
            }`}
          >
            {project.description || "No description added"}
          </p>
        </div>

        <div className="shrink-0 w-11 h-11 rounded-xl bg-[#EEF0FE] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <FolderKanban className="w-5 h-5 text-[#4A4DDB]" />
        </div>
      </div>

      {project.status && (
        <div className="mt-4">
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${getStatusStyle(
              project.status
            )}`}
          >
            {project.status}
          </span>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-[#F1F1F6] flex justify-between items-center text-xs text-[#8B8CA8]">
        <span className="inline-flex items-center gap-1.5 min-w-0">
          <User className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">
            {project.createdBy?.fullName || "Unknown"}
          </span>
        </span>

        <span className="inline-flex items-center gap-1.5 shrink-0">
          <CalendarDays className="w-3.5 h-3.5" />
          {new Date(project.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

export default ProjectCard;
