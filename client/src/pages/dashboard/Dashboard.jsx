import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import WorkspaceCard from "../../components/WorkspaceCard";
import CreateWorkspaceModal from "../../components/CreateWorkspaceModal";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [workspaces, setWorkspaces] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(storedUser));
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
  try {
    const response = await api.get("/workspaces");

    setWorkspaces(response.data.workspaces);
  } catch (error) {
    console.log(error.response?.data);
  }
};

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar user={user} />

      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-8 py-8">

          {/* Welcome Section */}

          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-800">
              Welcome back, {user.fullName} 👋
            </h2>

            <p className="text-gray-500 mt-2">
              Manage your workspaces and stay productive.
            </p>
          </div>

          {/* Statistics */}

          <div className="grid md:grid-cols-3 gap-6 mb-10">

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <p className="text-gray-500 text-sm">
                Total Workspaces
              </p>

              <h3 className="text-4xl font-bold mt-3 text-blue-600">
                {workspaces.length}
              </h3>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <p className="text-gray-500 text-sm">
                Projects
              </p>

              <h3 className="text-4xl font-bold mt-3 text-green-600">
                --
              </h3>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <p className="text-gray-500 text-sm">
                Tasks
              </p>

              <h3 className="text-4xl font-bold mt-3 text-purple-600">
                --
              </h3>
            </div>

          </div>

          {/* Workspace Header */}

          <div className="flex justify-between items-center mb-6">

            <div>
              <h2 className="text-2xl font-bold">
                Your Workspaces
              </h2>

              <p className="text-gray-500">
                Create and manage your workspaces.
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
            >
              + New Workspace
            </button>

          </div>

          {/* Workspace Grid */}

          {workspaces.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-16 text-center">

              <div className="text-6xl mb-5">
                📂
              </div>

              <h2 className="text-2xl font-bold mb-3">
                No workspaces yet
              </h2>

              <p className="text-gray-500 mb-6">
                Create your first workspace and start organizing your projects.
              </p>

              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
              >
                Create Workspace
              </button>

            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workspaces.map((workspace) => (
                <WorkspaceCard
                  key={workspace._id}
                  workspace={workspace}
                />
              ))}
            </div>
          )}

          <CreateWorkspaceModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            fetchWorkspaces={fetchWorkspaces}
          />

        </div>
      </div>
    </>
  );
}

export default Dashboard;