import { useEffect, useState } from "react";
import { CheckSquare, FileText, Flag, X } from "lucide-react";
import api from "../services/api";

const PRIORITY_STYLES = {
  Low: "bg-[#E7F7F5] text-[#0F9E93] border-[#CBEEEA]",
  Medium: "bg-[#FBF1E3] text-[#B45309] border-[#F3E1C8]",
  High: "bg-[#FDF1F3] text-[#B4243C] border-[#F3D3D9]",
};

function CreateTaskModal({
  isOpen,
  onClose,
  projectId,
  fetchTasks,
  editingTask,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setDescription(editingTask.description || "");
      setPriority(editingTask.priority || "Medium");
    } else {
      setTitle("");
      setDescription("");
      setPriority("Medium");
    }
  }, [editingTask, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, {
          title,
          description,
          priority,
        });
      } else {
        await api.post("/tasks", {
          title,
          description,
          priority,
          project: projectId,
        });
      }

      fetchTasks();

      setTitle("");
      setDescription("");
      setPriority("Medium");

      onClose();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="fd-root fixed inset-0 z-50 flex items-center justify-center px-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        .fd-root { font-family: 'Inter', system-ui, sans-serif; }
        .fd-display { font-family: 'Fraunces', serif; font-feature-settings: 'ss01' on; }

        @keyframes fd-backdrop-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fd-modal-in {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        .fd-backdrop-in { animation: fd-backdrop-in 0.22s ease-out both; }
        .fd-modal-in { animation: fd-modal-in 0.22s cubic-bezier(0.16, 1, 0.3, 1) both; }

        @media (prefers-reduced-motion: reduce) {
          .fd-backdrop-in, .fd-modal-in { animation: none; }
        }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fd-backdrop-in absolute inset-0 bg-[#0B0C1E]/50 backdrop-blur-sm"
      />

      {/* Modal panel */}
      <div className="fd-modal-in relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-[#E4E4F5] bg-white/85 backdrop-blur-xl shadow-[0_1px_2px_rgba(20,21,43,0.04),0_32px_64px_-24px_rgba(20,21,43,0.35)]">
        <div className="pointer-events-none absolute -top-24 -right-16 w-64 h-64 rounded-full bg-gradient-to-br from-[#5B5EF0]/20 to-transparent blur-3xl" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 inline-flex items-center justify-center w-8 h-8 rounded-lg text-[#8B8CA8] hover:bg-[#F1F1F6] hover:text-[#14152B] transition-all duration-200"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative px-6 sm:px-8 pt-8 pb-8">
          <div className="flex items-center gap-3.5 mb-1.5">
            <div className="shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-[#6B6EF5] to-[#3730A3] flex items-center justify-center shadow-[0_8px_18px_-6px_rgba(74,77,219,0.5)]">
              <CheckSquare className="w-5 h-5 text-white" />
            </div>

            <h2 className="fd-display text-xl sm:text-2xl font-medium text-[#14152B]">
              {editingTask ? "Edit Task" : "Create Task"}
            </h2>
          </div>

          <p className="text-sm text-[#8B8CA8] mb-7 ml-[3.4rem]">
            {editingTask
              ? "Update your task details."
              : "Add a new task to this project."}
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-[#8B8CA8] uppercase mb-2">
                <CheckSquare className="w-3.5 h-3.5" />
                Task Title
              </label>
              <input
                type="text"
                placeholder="e.g. Design the onboarding flow"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full rounded-xl border border-[#E4E4F5] bg-white px-4 py-3 text-sm text-[#14152B] placeholder:text-[#B7B8CC] shadow-sm transition-all duration-200 focus:outline-none focus:border-[#B9BEF7] focus:ring-4 focus:ring-[#5B5EF0]/10"
              />
            </div>

            <div className="mb-5">
              <label className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-[#8B8CA8] uppercase mb-2">
                <FileText className="w-3.5 h-3.5" />
                Description
              </label>
              <textarea
                placeholder="Add more detail about this task..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className="w-full rounded-xl border border-[#E4E4F5] bg-white px-4 py-3 text-sm text-[#14152B] placeholder:text-[#B7B8CC] shadow-sm transition-all duration-200 resize-none focus:outline-none focus:border-[#B9BEF7] focus:ring-4 focus:ring-[#5B5EF0]/10"
              />
            </div>

            <div className="mb-7">
              <label className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-[#8B8CA8] uppercase mb-2">
                <Flag className="w-3.5 h-3.5" />
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className={`w-full rounded-xl border px-4 py-3 text-sm font-medium shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#5B5EF0]/10 ${PRIORITY_STYLES[priority]}`}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-[#E4E4F5] bg-white text-[#14152B] font-medium text-sm shadow-sm transition-all duration-200 hover:bg-[#EEF0FE] hover:border-[#D3D6FB] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A4DDB]/30"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-b from-[#6B6EF5] to-[#4A4DDB] text-white font-medium text-sm shadow-[0_1px_0_rgba(255,255,255,0.2)_inset,0_10px_24px_-8px_rgba(74,77,219,0.55)] transition-all duration-200 hover:shadow-[0_1px_0_rgba(255,255,255,0.25)_inset,0_14px_28px_-8px_rgba(74,77,219,0.65)] hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A4DDB]/40"
              >
                {editingTask ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateTaskModal;
