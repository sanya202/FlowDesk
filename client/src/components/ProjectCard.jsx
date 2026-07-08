import { useNavigate } from "react-router-dom";

function ProjectCard({ project }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/project/${project._id}`)}
      className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            {project.name}
          </h3>

          <p className="text-gray-500 mt-2">
            {project.description || "No description"}
          </p>
        </div>

        <div className="text-3xl">
          📁
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center text-sm text-gray-400">
        <span>
          Created by {project.createdBy?.fullName || "Unknown"}
        </span>

        <span>
          {new Date(project.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

export default ProjectCard;