import { useState } from "react";
import {
  Pencil,
  Trash2,
  ChevronDown,
  Flag,
  CalendarDays,
  User,
} from "lucide-react";
import api from "../services/api";

// Same FlowDesk tokens used across Dashboard / WorkspacePage / ProjectPage / ProjectCard:
// Ink #14152B · Canvas #F7F7FB · Primary #5B5EF0 → #3730A3
// Teal #0F9E93 · Amber #B45309 · Coral #F0653D

const STATUS_ACCENT = {
  Todo: { strip: "bg-[#5B5EF0]", pill: "bg-[#EEF0FE] text-[#4A4DDB] border-[#D3D6FB]" },
  "In Progress": { strip: "bg-[#B45309]", pill: "bg-[#FBF1E3] text-[#B45309] border-[#F3E1C8]" },
  Done: { strip: "bg-[#0F9E93]", pill: "bg-[#E7F7F5] text-[#0F9E93] border-[#CBEEEA]" },
};

const PRIORITY_STYLES = {
  High: "bg-[#FDF1F3] text-[#B4243C] border-[#F3D3D9]",
  Medium: "bg-[#FBF1E3] text-[#B45309] border-[#F3E1C8]",
  Low: "bg-[#E7F7F5] text-[#0F9E93] border-[#CBEEEA]",
};

const getInitials = (name) => {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
};

function TaskCard({ task, fetchTasks, onEdit }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateStatus = async (status) => {
    try {
      setIsUpdating(true);
      await api.put(`/tasks/${task._id}`, {
        status,
      });

      fetchTasks();
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteTask = async () => {
    try {
      await api.delete(`/tasks/${task._id}`);

      fetchTasks();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const accent = STATUS_ACCENT[task.status] || STATUS_ACCENT.Todo;

  return (
    <div className="group relative bg-white/90 backdrop-blur-sm rounded-2xl border border-[#ECEDF6] shadow-[0_1px_2px_rgba(20,21,43,0.04)] pl-5 pr-5 py-5 overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#D3D6FB] hover:shadow-[0_20px_40px_-18px_rgba(91,94,240,0.35)]">
      {/* Status-colored left accent strip */}
      <span className={`absolute left-0 top-0 bottom-0 w-1 ${accent.strip}`} />

      {/* Subtle top gradient highlight */}
      <div className="pointer-events-none absolute top-0 left-1 right-0 h-px bg-gradient-to-r from-[#5B5EF0]/40 via-[#5B5EF0]/10 to-transparent" />

      <div className="flex justify-between items-start gap-3">
        <h3 className="fd-display font-medium text-[15px] sm:text-base text-[#14152B] leading-snug break-words">
          {task.title}
        </h3>

        {task.priority && (
          <span
            className={`shrink-0 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium whitespace-nowrap ${
              PRIORITY_STYLES[task.priority] ||
              "bg-[#F1F1F6] text-[#6B6C87] border-[#E4E4F5]"
            }`}
          >
            <Flag className="w-3 h-3" />
            {task.priority}
          </span>
        )}
      </div>

      <p
        className={`mt-2.5 text-sm leading-relaxed line-clamp-2 ${
          task.description ? "text-[#6B6C87]" : "text-[#B7B8CC] italic"
        }`}
      >
        {task.description || "No description"}
      </p>

      {task.dueDate && (
        <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#8B8CA8]">
          <CalendarDays className="w-3.5 h-3.5" />
          {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}

      <div className="mt-4 relative">
        <select
          value={task.status}
          onChange={(e) => updateStatus(e.target.value)}
          disabled={isUpdating}
          className={`w-full appearance-none cursor-pointer rounded-full border px-3.5 py-2 pr-9 text-xs font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A4DDB]/40 disabled:opacity-60 ${accent.pill}`}
        >
          <option>Todo</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
        <ChevronDown className="pointer-events-none w-3.5 h-3.5 absolute right-3.5 top-1/2 -translate-y-1/2 opacity-60" />
      </div>

      <div className="mt-4 pt-4 border-t border-[#F1F1F6] flex justify-between items-center">
        {task.assignee?.fullName ? (
          <span className="inline-flex items-center gap-2 min-w-0">
            <span className="fd-mono shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#6B6EF5] to-[#3730A3] text-white flex items-center justify-center text-[10px] font-semibold">
              {getInitials(task.assignee.fullName)}
            </span>
            <span className="text-xs text-[#6B6C87] truncate">
              {task.assignee.fullName}
            </span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 text-xs text-[#B7B8CC]">
            <span className="w-6 h-6 rounded-full bg-[#F1F1F6] flex items-center justify-center">
              <User className="w-3 h-3 text-[#C7C8DE]" />
            </span>
            Unassigned
          </span>
        )}

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onEdit(task)}
            aria-label="Edit task"
            className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-[#8B8CA8] hover:bg-[#EEF0FE] hover:text-[#4A4DDB] transition-all duration-200 hover:scale-105"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => deleteTask()}
            aria-label="Delete task"
            className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-[#8B8CA8] hover:bg-[#FDF1F3] hover:text-[#B4243C] transition-all duration-200 hover:scale-105"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
