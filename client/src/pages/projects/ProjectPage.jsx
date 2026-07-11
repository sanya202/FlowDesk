import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Trash2,
  Plus,
  ListTodo,
  Rocket,
  CheckCircle2,
  ListChecks,
  User,
  Layers,
} from "lucide-react";
import api from "../../services/api";
import TaskCard from "../../components/TaskCard";
import CreateTaskModal from "../../components/CreateTaskModal";

// Same FlowDesk tokens used across Dashboard / WorkspacePage / ProjectCard:
// Ink #14152B · Canvas #F7F7FB · Primary #5B5EF0 → #3730A3
// Teal #0F9E93 · Amber #B45309 · Coral #F0653D (signature glow)

const EmptyTasksIllustration = () => (
  <svg
    viewBox="0 0 200 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <defs>
      <linearGradient id="pp-panel-a" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#EEF0FE" />
        <stop offset="100%" stopColor="#E0E3FC" />
      </linearGradient>
      <linearGradient id="pp-panel-b" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#5B5EF0" />
        <stop offset="100%" stopColor="#3730A3" />
      </linearGradient>
    </defs>
    <rect x="28" y="58" width="70" height="48" rx="10" fill="url(#pp-panel-a)" stroke="#C7CBFA" strokeWidth="1.5" />
    <rect x="106" y="38" width="66" height="68" rx="10" fill="url(#pp-panel-b)" />
    <path d="M124 70 l8 8 16 -18" stroke="rgba(255,255,255,0.9)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <rect x="118" y="88" width="42" height="5" rx="2.5" fill="rgba(255,255,255,0.4)" />
    <rect x="40" y="74" width="34" height="5" rx="2.5" fill="#B9BEF7" />
    <rect x="40" y="86" width="46" height="5" rx="2.5" fill="#D3D6FB" />
    <line x1="98" y1="84" x2="106" y2="74" stroke="#C7CBFA" strokeWidth="2" strokeDasharray="3 4" strokeLinecap="round" />
    <circle cx="50" cy="34" r="4" fill="#0F9E93" opacity="0.6" />
    <circle cx="172" cy="120" r="5" fill="#F0653D" opacity="0.55" />
  </svg>
);

function ProjectPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const todoTasks = tasks.filter((task) => task.status === "Todo");

  const inProgressTasks = tasks.filter((task) => task.status === "In Progress");

  const doneTasks = tasks.filter((task) => task.status === "Done");

  const fetchProject = async () => {
    try {
      const response = await api.get(`/projects/${projectId}`);
      setProject(response.data.project);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await api.get(`/tasks/project/${projectId}`);
      setTasks(response.data.tasks);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    fetchProject();
    fetchTasks();
  }, [projectId]);

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const deleteProject = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/projects/${projectId}`);
      navigate(`/workspace/${project.workspace._id}`);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const fontStyles = (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap');

      .fd-root { font-family: 'Inter', system-ui, sans-serif; }
      .fd-display { font-family: 'Fraunces', serif; font-feature-settings: 'ss01' on; }
      .fd-mono { font-family: 'JetBrains Mono', monospace; }

      @keyframes fd-fade-up {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .fd-fade-up { animation: fd-fade-up 0.5s ease-out both; }

      @media (prefers-reduced-motion: reduce) {
        .fd-fade-up { animation: none; }
      }
    `}</style>
  );

  if (!project) {
    return (
      <div className="fd-root min-h-screen flex items-center justify-center text-lg bg-[#F7F7FB] text-[#5A5B78]">
        {fontStyles}
        Loading...
      </div>
    );
  }

  const initials = project.name?.trim()?.charAt(0)?.toUpperCase() || "P";

  const columns = [
    {
      key: "todo",
      label: "Todo",
      icon: ListTodo,
      tasks: todoTasks,
      accent: "text-[#3730A3]",
      badgeBg: "bg-[#EEF0FE]",
      dot: "bg-[#5B5EF0]",
    },
    {
      key: "in-progress",
      label: "In Progress",
      icon: Rocket,
      tasks: inProgressTasks,
      accent: "text-[#92400E]",
      badgeBg: "bg-[#FBF1E3]",
      dot: "bg-[#B45309]",
    },
    {
      key: "done",
      label: "Done",
      icon: CheckCircle2,
      tasks: doneTasks,
      accent: "text-[#0F766E]",
      badgeBg: "bg-[#E7F7F5]",
      dot: "bg-[#0F9E93]",
    },
  ];

  return (
    <div className="fd-root relative min-h-screen bg-[#F7F7FB] overflow-hidden">
      {fontStyles}

      {/* Layered background: soft radial wash + faint grid texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 8%, rgba(91,94,240,0.10), transparent 40%), radial-gradient(circle at 85% 20%, rgba(240,101,61,0.07), transparent 35%), linear-gradient(rgba(20,21,43,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(20,21,43,0.035) 1px, transparent 1px)",
          backgroundSize: "auto, auto, 44px 44px, 44px 44px",
        }}
      />

      {/* Decorative blurred orbs */}
      <div className="pointer-events-none absolute -top-24 -left-16 w-96 h-96 rounded-full bg-[#5B5EF0]/20 blur-[100px]" />
      <div className="pointer-events-none absolute top-40 right-0 w-80 h-80 rounded-full bg-[#F0653D]/10 blur-[110px]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 md:px-8 py-8 md:py-10">
        {/* Hero */}
        <div className="fd-fade-up relative overflow-hidden rounded-[2rem] border border-[#E4E4F5] bg-white/70 backdrop-blur-xl shadow-[0_1px_2px_rgba(20,21,43,0.04),0_20px_50px_-24px_rgba(91,94,240,0.25)] mb-10 md:mb-12">
          <div className="pointer-events-none absolute -top-20 -right-10 w-72 h-72 rounded-full bg-gradient-to-br from-[#5B5EF0]/25 to-transparent blur-3xl" />

          <div className="relative px-6 py-9 sm:px-8 sm:py-11 md:px-12 md:py-14 flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-8">
            <div className="flex items-start gap-4 sm:gap-5 max-w-xl">
              <div className="fd-display shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#6B6EF5] to-[#3730A3] text-white flex items-center justify-center text-lg sm:text-xl font-medium shadow-[0_10px_24px_-8px_rgba(74,77,219,0.55)]">
                {initials}
              </div>

              <div className="min-w-0">
                <h1 className="fd-display text-2xl sm:text-3xl md:text-[2.5rem] leading-[1.1] font-medium text-[#14152B] break-words">
                  {project.name}
                </h1>

                <p className="text-[#6B6C87] mt-3 text-base leading-relaxed">
                  {project.description || "No description added"}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF0FE] border border-[#D3D6FB] px-3 py-1 text-xs font-medium text-[#4340C4]">
                    <User className="w-3.5 h-3.5" />
                    {project.createdBy?.fullName || "Unknown"}
                  </span>

                  {project.workspace?.name && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F1F1F6] border border-[#E4E4F5] px-3 py-1 text-xs font-medium text-[#6B6C87]">
                      <Layers className="w-3.5 h-3.5" />
                      {project.workspace.name}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={deleteProject}
              className="group inline-flex items-center gap-2 bg-white text-[#B4243C] border border-[#F3D3D9] rounded-xl px-4 py-2.5 font-medium shadow-sm transition-all duration-200 hover:bg-[#FDF1F3] hover:border-[#F0B9C3] hover:-translate-y-0.5 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B4243C]/40"
            >
              <Trash2 className="w-4 h-4" />
              Delete Project
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 md:mb-12">
          <div className="fd-fade-up group relative bg-white rounded-2xl border border-[#ECEDF6] p-5 sm:p-6 shadow-[0_1px_2px_rgba(20,21,43,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(91,94,240,0.35)] hover:border-[#D3D6FB]">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#EEF0FE] flex items-center justify-center mb-4 sm:mb-5 transition-transform duration-300 group-hover:scale-105">
              <ListChecks className="w-5 h-5 text-[#4A4DDB]" />
            </div>
            <p className="text-[#6B6C87] text-xs sm:text-sm font-medium">Total Tasks</p>
            <h3 className="fd-mono text-2xl sm:text-3xl font-semibold mt-2 text-[#14152B]">
              {tasks.length}
            </h3>
          </div>

          <div className="fd-fade-up group relative bg-white rounded-2xl border border-[#ECEDF6] p-5 sm:p-6 shadow-[0_1px_2px_rgba(20,21,43,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(15,158,147,0.35)] hover:border-[#CBEEEA]">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#E7F7F5] flex items-center justify-center mb-4 sm:mb-5 transition-transform duration-300 group-hover:scale-105">
              <CheckCircle2 className="w-5 h-5 text-[#0F9E93]" />
            </div>
            <p className="text-[#6B6C87] text-xs sm:text-sm font-medium">Completed</p>
            <h3 className="fd-mono text-2xl sm:text-3xl font-semibold mt-2 text-[#14152B]">
              {tasks.length ? doneTasks.length : "--"}
            </h3>
          </div>

          <div className="fd-fade-up group relative bg-white rounded-2xl border border-[#ECEDF6] p-5 sm:p-6 shadow-[0_1px_2px_rgba(20,21,43,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(180,83,9,0.3)] hover:border-[#F3E1C8]">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#FBF1E3] flex items-center justify-center mb-4 sm:mb-5 transition-transform duration-300 group-hover:scale-105">
              <Rocket className="w-5 h-5 text-[#B45309]" />
            </div>
            <p className="text-[#6B6C87] text-xs sm:text-sm font-medium">In Progress</p>
            <h3 className="fd-mono text-2xl sm:text-3xl font-semibold mt-2 text-[#14152B]">
              {tasks.length ? inProgressTasks.length : "--"}
            </h3>
          </div>

          <div className="fd-fade-up group relative bg-white rounded-2xl border border-[#ECEDF6] p-5 sm:p-6 shadow-[0_1px_2px_rgba(20,21,43,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(91,94,240,0.35)] hover:border-[#D3D6FB]">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#EEF0FE] flex items-center justify-center mb-4 sm:mb-5 transition-transform duration-300 group-hover:scale-105">
              <ListTodo className="w-5 h-5 text-[#4A4DDB]" />
            </div>
            <p className="text-[#6B6C87] text-xs sm:text-sm font-medium">Pending</p>
            <h3 className="fd-mono text-2xl sm:text-3xl font-semibold mt-2 text-[#14152B]">
              {tasks.length ? todoTasks.length : "--"}
            </h3>
          </div>
        </div>

        {/* Elegant divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#E4E4F5] to-transparent mb-8" />

        {/* Tasks Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-7">
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#8B8CA8] uppercase mb-1.5">
              This Project
            </p>
            <h2 className="fd-display text-2xl font-medium text-[#14152B]">
              Tasks
            </h2>
            <p className="text-[#6B6C87] mt-1 text-sm">
              Manage your project tasks.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="group inline-flex items-center justify-center gap-2 bg-gradient-to-b from-[#6B6EF5] to-[#4A4DDB] text-white rounded-xl px-5 py-3 font-medium shadow-[0_1px_0_rgba(255,255,255,0.2)_inset,0_10px_24px_-8px_rgba(74,77,219,0.55)] transition-all duration-200 hover:shadow-[0_1px_0_rgba(255,255,255,0.25)_inset,0_14px_28px_-8px_rgba(74,77,219,0.65)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_6px_14px_-6px_rgba(74,77,219,0.5)] whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A4DDB]/40"
          >
            <Plus className="w-4 h-4" />
            New Task
          </button>
        </div>

        {tasks.length === 0 ? (
          <div className="fd-fade-up relative overflow-hidden bg-white rounded-[2rem] border border-[#ECEDF6] shadow-[0_1px_2px_rgba(20,21,43,0.04)] p-10 sm:p-16 text-center">
            <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-[#5B5EF0]/8 blur-3xl" />

            <div className="relative w-40 h-32 mx-auto mb-7">
              <EmptyTasksIllustration />
            </div>

            <h2 className="fd-display relative text-2xl font-medium text-[#14152B] mb-2.5">
              No tasks yet
            </h2>

            <p className="relative text-[#6B6C87] mb-8 max-w-sm mx-auto leading-relaxed">
              Create your first task for this project.
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="relative inline-flex items-center gap-2 bg-gradient-to-b from-[#6B6EF5] to-[#4A4DDB] text-white rounded-xl px-6 py-3 font-medium shadow-[0_1px_0_rgba(255,255,255,0.2)_inset,0_10px_24px_-8px_rgba(74,77,219,0.55)] transition-all duration-200 hover:shadow-[0_1px_0_rgba(255,255,255,0.25)_inset,0_14px_28px_-8px_rgba(74,77,219,0.65)] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A4DDB]/40"
            >
              <Plus className="w-4 h-4" />
              Create Task
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
            {columns.map((column) => {
              const Icon = column.icon;
              return (
                <div
                  key={column.key}
                  className="fd-fade-up group bg-white/75 backdrop-blur-sm rounded-2xl border border-[#D7DBFF] p-5 sm:p-6 shadow-[0_0_0_1px_rgba(91,94,240,0.06),0_10px_30px_-18px_rgba(91,94,240,0.35)] transition-all duration-300 hover:border-[#7C82FF] hover:shadow-[0_0_0_1px_rgba(91,94,240,0.18),0_0_24px_rgba(91,94,240,0.18),0_18px_40px_-18px_rgba(91,94,240,0.45)]"
                >
                  <div className="flex items-center gap-2.5 mb-4 sm:mb-5 px-1">
                    <span
                      className={`w-9 h-9 rounded-xl ${column.badgeBg} flex items-center justify-center shadow-sm border border-white/70`}
                    >
                      <Icon className={`w-5 h-5 ${column.accent} stroke-[2.4]`} />
                    </span>
                    <h3 className="font-semibold text-[#14152B] text-sm sm:text-base">
                      {column.label}
                    </h3>
                    <span className="ml-auto fd-mono text-xs font-medium text-[#8B8CA8] bg-[#F1F1F6] rounded-full px-2 py-0.5">
                      {column.tasks.length}
                    </span>
                  </div>

                  <div className="space-y-3 sm:space-y-4 min-h-[2rem]">
                    {column.tasks.map((task) => (
                      <TaskCard
                        key={task._id}
                        task={task}
                        fetchTasks={fetchTasks}
                        onEdit={handleEdit}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <CreateTaskModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
          }}
          projectId={projectId}
          fetchTasks={fetchTasks}
          editingTask={editingTask}
        />
      </div>
    </div>
  );
}

export default ProjectPage;
