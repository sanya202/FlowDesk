import { useState } from "react";
import api from "../services/api";

function CreateWorkspaceModal({ isOpen, onClose, fetchWorkspaces }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleCreateWorkspace = async () => {
    try {
      await api.post("/workspaces", {
        name,
        description,
      });

      setName("");
      setDescription("");

      onClose();

      fetchWorkspaces();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-6">Create Workspace</h2>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Workspace Name</label>

          <input
            type="text"
            placeholder="Enter workspace name"
            className="w-full border rounded-lg p-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium">Description</label>

          <textarea
            placeholder="Enter description"
            className="w-full border rounded-lg p-3"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2 rounded-lg border">
            Cancel
          </button>

          <button
            onClick={handleCreateWorkspace}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateWorkspaceModal;
