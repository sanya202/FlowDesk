import { useParams } from "react-router-dom";

function WorkspacePage() {
  const { workspaceId } = useParams();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Workspace
        </h1>

        <p className="text-gray-500 mt-2">
          Workspace ID:
        </p>

        <p className="text-blue-600 font-medium mt-1">
          {workspaceId}
        </p>
      </div>
    </div>
  );
}

export default WorkspacePage;