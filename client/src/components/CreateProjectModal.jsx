import { useState } from "react";
import api from "../services/api";

function CreateProjectModal({
  isOpen,
  onClose,
  workspaceId,
  fetchProjects,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/projects", {
        name,
        description,
        workspace: workspaceId,
      });

      setName("");
      setDescription("");

      fetchProjects();
      onClose();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-[450px] shadow-xl">
        <h2 className="text-2xl font-bold mb-6">
          Create New Project
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Project Name"
            className="w-full border rounded-xl p-3 mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            placeholder="Description"
            className="w-full border rounded-xl p-3 mb-6"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProjectModal;