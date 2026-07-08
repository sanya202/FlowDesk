import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import ProjectCard from "../../components/ProjectCard";
import CreateProjectModal from "../../components/CreateProjectModal";

function WorkspacePage() {
  const { workspaceId } = useParams();

  const [workspace, setWorkspace] = useState(null);
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchWorkspace = async () => {
    try {
      const response = await api.get(`/workspaces/${workspaceId}`);
      setWorkspace(response.data.workspace);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await api.get(`/projects/workspace/${workspaceId}`);
      setProjects(response.data.projects);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    fetchWorkspace();
    fetchProjects();
  }, [workspaceId]);

  if (!workspace) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-800">{workspace.name}</h1>

        <p className="text-gray-500 mt-2">{workspace.description}</p>

        <div className="mt-10">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Projects</h2>
              <p className="text-gray-500">Total Projects: {projects.length}</p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl"
            >
              + New Project
            </button>
          </div>

          {projects.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <div className="text-5xl mb-4">📁</div>

              <h3 className="text-2xl font-bold mb-2">No projects yet</h3>

              <p className="text-gray-500">
                Create your first project inside this workspace.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          )}
        </div>

        <CreateProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          workspaceId={workspaceId}
          fetchProjects={fetchProjects}
        />
      </div>
    </div>
  );
}

export default WorkspacePage;
