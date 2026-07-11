import { FiFolder, FiArrowRight, FiMoreVertical } from "react-icons/fi";
import Card from "./ui/Card";
import Button from "./ui/Button";

function WorkspaceCard({ workspace, onOpen, onEdit }) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <FiFolder className="text-blue-600 text-2xl" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {workspace.name}
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Workspace
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(workspace)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Edit
          </button>

          <button className="p-2 rounded-lg hover:bg-gray-100 transition">
            <FiMoreVertical className="text-gray-500" />
          </button>
        </div>
      </div>

      <p className="mt-5 text-gray-600 leading-relaxed min-h-[48px]">
        {workspace.description || "No description provided."}
      </p>

      <div className="mt-6 flex justify-between items-center border-t pt-4">
        <span className="text-sm text-gray-400">
          Ready to organize
        </span>

        <Button
          onClick={() => onOpen(workspace._id)}
          className="px-4 py-2"
        >
          Open
          <FiArrowRight />
        </Button>
      </div>
    </Card>
  );
}

export default WorkspaceCard;