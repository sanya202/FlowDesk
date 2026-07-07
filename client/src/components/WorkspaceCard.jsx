import { useNavigate } from "react-router-dom";

function WorkspaceCard({ workspace }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
          📁
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {workspace.name}
          </h2>

          <p className="text-sm text-gray-500">
            Workspace
          </p>
        </div>
      </div>

      <p className="text-gray-600 min-h-[60px]">
        {workspace.description || "No description added yet."}
      </p>

      <div className="border-t mt-6 pt-5 flex justify-between items-center">
        <span className="text-sm text-gray-400">
          Ready to organize
        </span>

        <button
          onClick={() => navigate(`/workspace/${workspace._id}`)}
          className="text-blue-600 font-semibold hover:underline"
        >
          Open →
        </button>
      </div>
    </div>
  );
}

export default WorkspaceCard;