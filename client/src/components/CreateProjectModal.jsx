import { useEffect, useState } from "react";
import { FolderKanban, X } from "lucide-react";
import api from "../services/api";

function CreateProjectModal({
  isOpen,
  onClose,
  workspaceId,
  fetchProjects,
  editingProject,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingProject) {
      setName(editingProject.name || "");
      setDescription(editingProject.description || "");
    } else {
      setName("");
      setDescription("");
    }
  }, [editingProject, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingProject) {
        await api.put(`/projects/${editingProject._id}`, {
          name,
          description,
        });
      } else {
        await api.post("/projects", {
          name,
          description,
          workspace: workspaceId,
        });
      }

      setName("");
      setDescription("");

      fetchProjects();
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
          from { opacity: 0; transform: translateY(8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .fd-backdrop-in { animation: fd-backdrop-in 0.2s ease-out both; }
        .fd-modal-in { animation: fd-modal-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) both; }

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
      <div className="fd-modal-in relative w-full max-w-[460px] rounded-3xl border border-[#E4E4F5] bg-white/85 backdrop-blur-xl shadow-[0_1px_2px_rgba(20,21,43,0.04),0_32px_64px_-24px_rgba(20,21,43,0.35)] overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -right-16 w-64 h-64 rounded-full bg-gradient-to-br from-[#5B5EF0]/20 to-transparent blur-3xl" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 inline-flex items-center justify-center w-8 h-8 rounded-lg text-[#8B8CA8] hover:bg-[#F1F1F6] hover:text-[#14152B] transition-all duration-200"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative px-7 sm:px-8 pt-8 pb-8">
          <div className="flex items-center gap-3.5 mb-7">
            <div className="shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-[#6B6EF5] to-[#3730A3] flex items-center justify-center shadow-[0_8px_18px_-6px_rgba(74,77,219,0.5)]">
              <FolderKanban className="w-5 h-5 text-white" />
            </div>

            <h2 className="fd-display text-xl sm:text-2xl font-medium text-[#14152B]">
              {editingProject ? "Edit Project" : "Create New Project"}
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block text-xs font-semibold tracking-wide text-[#8B8CA8] uppercase mb-2">
                Project Name
              </label>
              <input
                type="text"
                placeholder="e.g. Marketing Website Revamp"
                className="w-full rounded-xl border border-[#E4E4F5] bg-white px-4 py-3 text-sm text-[#14152B] placeholder:text-[#B7B8CC] shadow-sm transition-all duration-200 focus:outline-none focus:border-[#B9BEF7] focus:ring-4 focus:ring-[#5B5EF0]/10"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-7">
              <label className="block text-xs font-semibold tracking-wide text-[#8B8CA8] uppercase mb-2">
                Description
              </label>
              <textarea
                placeholder="What's this project about?"
                className="w-full rounded-xl border border-[#E4E4F5] bg-white px-4 py-3 text-sm text-[#14152B] placeholder:text-[#B7B8CC] shadow-sm transition-all duration-200 resize-none focus:outline-none focus:border-[#B9BEF7] focus:ring-4 focus:ring-[#5B5EF0]/10"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-[#E4E4F5] text-[#6B6C87] font-medium text-sm shadow-sm transition-all duration-200 hover:bg-[#F1F1F6] hover:text-[#14152B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A4DDB]/30"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-b from-[#6B6EF5] to-[#4A4DDB] text-white font-medium text-sm shadow-[0_1px_0_rgba(255,255,255,0.2)_inset,0_10px_24px_-8px_rgba(74,77,219,0.55)] transition-all duration-200 hover:shadow-[0_1px_0_rgba(255,255,255,0.25)_inset,0_14px_28px_-8px_rgba(74,77,219,0.65)] hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A4DDB]/40"
              >
                {editingProject ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateProjectModal;
