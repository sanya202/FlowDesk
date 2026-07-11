import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Trash2, Plus, Layers, FolderKanban, Users, ArrowUpRight } from "lucide-react";
import api from "../../services/api";
import ProjectCard from "../../components/ProjectCard";
import CreateProjectModal from "../../components/CreateProjectModal";

// Same FlowDesk tokens used on the Dashboard:
// Ink #14152B · Canvas #F7F7FB · Primary #5B5EF0 → #3730A3
// Teal #0F9E93 · Amber #B45309 · Coral #F0653D (signature glow)

const EmptyProjectsIllustration = () => (
  <svg
    viewBox="0 0 200 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <defs>
      <linearGradient id="wp-panel-a" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#EEF0FE" />
        <stop offset="100%" stopColor="#E0E3FC" />
      </linearGradient>
      <linearGradient id="wp-panel-b" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#5B5EF0" />
        <stop offset="100%" stopColor="#3730A3" />
      </linearGradient>
    </defs>
    <rect x="26" y="56" width="72" height="50" rx="10" fill="url(#wp-panel-a)" stroke="#C7CBFA" strokeWidth="1.5" />
    <rect x="104" y="36" width="70" height="70" rx="10" fill="url(#wp-panel-b)" />
    <rect x="116" y="52" width="46" height="6" rx="3" fill="rgba(255,255,255,0.75)" />
    <rect x="116" y="64" width="28" height="6" rx="3" fill="rgba(255,255,255,0.45)" />
    <rect x="116" y="82" width="34" height="16" rx="4" fill="rgba(255,255,255,0.18)" />
    <rect x="38" y="72" width="34" height="5" rx="2.5" fill="#B9BEF7" />
    <rect x="38" y="84" width="46" height="5" rx="2.5" fill="#D3D6FB" />
    <line x1="96" y1="82" x2="104" y2="72" stroke="#C7CBFA" strokeWidth="2" strokeDasharray="3 4" strokeLinecap="round" />
    <circle cx="48" cy="32" r="4" fill="#0F9E93" opacity="0.6" />
    <circle cx="170" cy="120" r="5" fill="#F0653D" opacity="0.55" />
  </svg>
);

function WorkspacePage() {
  const { workspaceId } = useParams();
  const navigate = useNavigate();

  const [workspace, setWorkspace] = useState(null);
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

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

  const handleEditProject = (project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const deleteWorkspace = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this workspace?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/workspaces/${workspaceId}`);
      navigate("/");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    fetchWorkspace();
    fetchProjects();
  }, [workspaceId]);

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

  if (!workspace) {
    return (
      <div className="fd-root min-h-screen flex items-center justify-center text-lg bg-[#F7F7FB] text-[#5A5B78]">
        {fontStyles}
        Loading...
      </div>
    );
  }

  const initials = workspace.name?.trim()?.charAt(0)?.toUpperCase() || "W";

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

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 py-10">
        {/* Hero */}
        <div className="fd-fade-up relative overflow-hidden rounded-[2rem] border border-[#E4E4F5] bg-white/70 backdrop-blur-xl shadow-[0_1px_2px_rgba(20,21,43,0.04),0_20px_50px_-24px_rgba(91,94,240,0.25)] mb-12">
          <div className="pointer-events-none absolute -top-20 -right-10 w-72 h-72 rounded-full bg-gradient-to-br from-[#5B5EF0]/25 to-transparent blur-3xl" />

          <div className="relative px-8 py-11 md:px-12 md:py-14 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            <div className="flex items-start gap-5 max-w-xl">
              <div className="fd-display shrink-0 w-[68px] h-[68px] rounded-full text-[#14152B] flex items-center justify-center text-3xl font-bold ring-2 ring-[#3730A3] bg-gradient-to-br from-[#EEF0FE] via-[#C7CBFA] to-[#A5B4FC] shadow-[0_18px_36px_-12px_rgba(74,77,219,0.65)] transition-all duration-300 hover:scale-105 hover:shadow-[0_24px_48px_-12px_rgba(74,77,219,0.75)]">
                {initials}
              </div>

              <div>
                <h1 className="fd-display text-3xl md:text-[2.5rem] leading-[1.1] font-medium text-[#14152B]">
                  {workspace.name}
                </h1>

                <p className="text-[#6B6C87] mt-3 text-base leading-relaxed">
                  {workspace.description}
                </p>
              </div>
            </div>

            <button
              onClick={deleteWorkspace}
              className="group inline-flex items-center gap-2 bg-white text-[#7F1D1D] border border-[#F3D3D9] rounded-xl px-4 py-2.5 font-semibold shadow-sm transition-all duration-200 hover:bg-[#FDF1F3] hover:text-[#991B1B] hover:border-[#F0B9C3] hover:-translate-y-0.5 whitespace-nowrap"
            >
              <Trash2 className="w-4 h-4" />
              Delete Workspace
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="fd-fade-up group relative bg-white rounded-2xl border border-[#ECEDF6] p-6 shadow-[0_1px_2px_rgba(20,21,43,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(91,94,240,0.35)] hover:border-[#D3D6FB]">
            <div className="flex items-center justify-between mb-5">
              <div className="w-11 h-11 rounded-xl bg-[#EEF0FE] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <FolderKanban className="w-5 h-5 text-[#4A4DDB]" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#C7C8DE] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <p className="text-[#6B6C87] text-sm font-medium">Total Projects</p>
            <h3 className="fd-mono text-3xl font-semibold mt-2 text-[#14152B]">
              {projects.length}
            </h3>
          </div>

          <div className="fd-fade-up group relative bg-white rounded-2xl border border-[#ECEDF6] p-6 shadow-[0_1px_2px_rgba(20,21,43,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(15,158,147,0.35)] hover:border-[#CBEEEA]">
            <div className="flex items-center justify-between mb-5">
              <div className="w-11 h-11 rounded-xl bg-[#E7F7F5] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Layers className="w-5 h-5 text-[#0F9E93]" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#C7C8DE] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <p className="text-[#6B6C87] text-sm font-medium">Tasks</p>
            <h3 className="fd-mono text-3xl font-semibold mt-2 text-[#B7B8CC]">--</h3>
          </div>

          <div className="fd-fade-up group relative bg-white rounded-2xl border border-[#ECEDF6] p-6 shadow-[0_1px_2px_rgba(20,21,43,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(180,83,9,0.3)] hover:border-[#F3E1C8]">
            <div className="flex items-center justify-between mb-5">
              <div className="w-11 h-11 rounded-xl bg-[#FBF1E3] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Users className="w-5 h-5 text-[#B45309]" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#C7C8DE] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <p className="text-[#6B6C87] text-sm font-medium">Members</p>
            <h3 className="fd-mono text-3xl font-semibold mt-2 text-[#B7B8CC]">--</h3>
          </div>
        </div>

        {/* Elegant divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#E4E4F5] to-transparent mb-8" />

        {/* Projects Header */}
        <div className="flex justify-between items-end mb-7">
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#8B8CA8] uppercase mb-1.5">
              This Workspace
            </p>
            <h2 className="fd-display text-2xl font-medium text-[#14152B]">
              Projects
            </h2>
          </div>

          <button
            onClick={() => {
              setEditingProject(null);
              setIsModalOpen(true);
            }}
            className="group inline-flex items-center gap-2 bg-gradient-to-b from-[#6B6EF5] to-[#4A4DDB] text-[#F8FAFC] rounded-xl px-5 py-3 font-medium shadow-[0_1px_0_rgba(255,255,255,0.2)_inset,0_10px_24px_-8px_rgba(74,77,219,0.55)] transition-all duration-200 hover:shadow-[0_1px_0_rgba(255,255,255,0.25)_inset,0_14px_28px_-8px_rgba(74,77,219,0.65)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_6px_14px_-6px_rgba(74,77,219,0.5)] whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            New Project
          </button>
        </div>

        {/* Project Grid */}
        {projects.length === 0 ? (
          <div className="fd-fade-up relative overflow-hidden bg-white rounded-[2rem] border border-[#ECEDF6] shadow-[0_1px_2px_rgba(20,21,43,0.04)] p-16 text-center">
            <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-[#5B5EF0]/8 blur-3xl" />

            <div className="relative w-40 h-32 mx-auto mb-7">
              <EmptyProjectsIllustration />
            </div>

            <h3 className="fd-display relative text-2xl font-medium text-[#14152B] mb-2.5">
              No projects yet
            </h3>

            <p className="relative text-[#6B6C87] mb-8 max-w-sm mx-auto leading-relaxed">
              Create your first project inside this workspace.
            </p>

            <button
              onClick={() => {
                setEditingProject(null);
                setIsModalOpen(true);
              }}
              className="relative inline-flex items-center gap-2 bg-gradient-to-b from-[#6B6EF5] to-[#4A4DDB] text-[#F8FAFC] rounded-xl px-6 py-3 font-medium shadow-[0_1px_0_rgba(255,255,255,0.2)_inset,0_10px_24px_-8px_rgba(74,77,219,0.55)] transition-all duration-200 hover:shadow-[0_1px_0_rgba(255,255,255,0.25)_inset,0_14px_28px_-8px_rgba(74,77,219,0.65)] hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              Create Project
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                className="fd-fade-up transition-all duration-300 hover:-translate-y-1"
              >
                <ProjectCard project={project} onEdit={handleEditProject} />
              </div>
            ))}
          </div>
        )}
      </div>

      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProject(null);
        }}
        workspaceId={workspaceId}
        fetchProjects={fetchProjects}
        editingProject={editingProject}
      />
    </div>
  );
}

export default WorkspacePage;
