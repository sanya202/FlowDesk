import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Plus,
  Layers,
  FolderKanban,
  CheckSquare,
  ArrowUpRight,
} from "lucide-react";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import WorkspaceCard from "../../components/WorkspaceCard";
import CreateWorkspaceModal from "../../components/CreateWorkspaceModal";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";

// FlowDesk design tokens (used inline below):
// Ink        #14152B  – primary text
// Canvas     #F7F7FB  – page background
// Primary    #5B5EF0  – violet-indigo, brand core
// Primary-2  #3730A3  – deep indigo, gradient partner
// Teal       #0F9E93  – "Projects" accent
// Amber      #B45309  – "Tasks" accent
// Coral      #F0653D  – signature glow, used once, sparingly

const EmptyStateIllustration = () => (
  <svg
    viewBox="0 0 200 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <defs>
      <linearGradient id="fd-panel-a" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#EEF0FE" />
        <stop offset="100%" stopColor="#E0E3FC" />
      </linearGradient>
      <linearGradient id="fd-panel-b" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#5B5EF0" />
        <stop offset="100%" stopColor="#3730A3" />
      </linearGradient>
    </defs>
    <rect x="24" y="54" width="70" height="52" rx="10" fill="url(#fd-panel-a)" stroke="#C7CBFA" strokeWidth="1.5" />
    <rect x="106" y="34" width="70" height="72" rx="10" fill="url(#fd-panel-b)" />
    <rect x="118" y="50" width="46" height="6" rx="3" fill="rgba(255,255,255,0.75)" />
    <rect x="118" y="62" width="30" height="6" rx="3" fill="rgba(255,255,255,0.45)" />
    <circle cx="128" cy="86" r="7" fill="rgba(255,255,255,0.9)" />
    <rect x="36" y="70" width="34" height="5" rx="2.5" fill="#B9BEF7" />
    <rect x="36" y="82" width="46" height="5" rx="2.5" fill="#D3D6FB" />
    <line x1="94" y1="80" x2="106" y2="70" stroke="#C7CBFA" strokeWidth="2" strokeDasharray="3 4" strokeLinecap="round" />
    <circle cx="45" cy="30" r="4" fill="#F0653D" opacity="0.7" />
    <circle cx="168" cy="122" r="5" fill="#0F9E93" opacity="0.5" />
  </svg>
);

function Dashboard() {
  const { user } = useAuth();
  const [workspaces, setWorkspaces] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWorkspace, setEditingWorkspace] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const fetchWorkspaces = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/workspaces");

      setWorkspaces(response.data.workspaces);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response?.data);
      setIsLoading(false);
    }
  };

  const handleEditWorkspace = (workspace) => {
    setEditingWorkspace(workspace);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (user) {
      fetchWorkspaces();
    }
  }, [user]);

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

  if (!user) {
    return (
      <div className="fd-root min-h-screen flex items-center justify-center text-lg bg-[#F7F7FB] text-[#5A5B78]">
        {fontStyles}
        Loading...
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="fd-root min-h-screen flex items-center justify-center text-lg bg-[#F7F7FB] text-[#5A5B78]">
        {fontStyles}
        Loading workspaces...
      </div>
    );
  }

  return (
    <>
      {fontStyles}
      <Navbar />

      <div className="fd-root relative min-h-screen bg-[#F7F7FB] overflow-hidden">
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

            <div className="relative px-8 py-11 md:px-12 md:py-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF0FE] border border-[#D3D6FB] px-3 py-1 text-xs font-medium text-[#4340C4] mb-5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Workspace Overview
                </div>

                <h1 className="fd-display text-4xl md:text-[2.75rem] leading-[1.1] font-medium text-[#14152B]">
                  Welcome back, {user.fullName}
                </h1>

                <p className="text-[#6B6C87] mt-4 text-base leading-relaxed">
                  Manage your workspaces and stay productive.
                </p>
              </div>

              <Button
                onClick={() => {
                  setEditingWorkspace(null);
                  setIsModalOpen(true);
                }}
                className="group inline-flex items-center gap-2 !bg-gradient-to-b !from-[#6B6EF5] !to-[#4A4DDB] !text-white rounded-xl px-5 py-3 font-medium shadow-[0_1px_0_rgba(255,255,255,0.2)_inset,0_10px_24px_-8px_rgba(74,77,219,0.55)] transition-all duration-200 hover:shadow-[0_1px_0_rgba(255,255,255,0.25)_inset,0_14px_28px_-8px_rgba(74,77,219,0.65)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_6px_14px_-6px_rgba(74,77,219,0.5)] whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                New Workspace
              </Button>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="fd-fade-up group relative bg-white rounded-2xl border border-[#ECEDF6] p-6 shadow-[0_1px_2px_rgba(20,21,43,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(91,94,240,0.35)] hover:border-[#D3D6FB]">
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-[#EEF0FE] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Layers className="w-5 h-5 text-[#4A4DDB]" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#C7C8DE] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <p className="text-[#6B6C87] text-sm font-medium">Total Workspaces</p>
              <h3 className="fd-mono text-3xl font-semibold mt-2 text-[#14152B]">
                {workspaces.length}
              </h3>
            </div>

            <div className="fd-fade-up group relative bg-white rounded-2xl border border-[#ECEDF6] p-6 shadow-[0_1px_2px_rgba(20,21,43,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(15,158,147,0.35)] hover:border-[#CBEEEA]">
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-[#E7F7F5] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <FolderKanban className="w-5 h-5 text-[#0F9E93]" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#C7C8DE] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <p className="text-[#6B6C87] text-sm font-medium">Projects</p>
              <h3 className="fd-mono text-3xl font-semibold mt-2 text-[#B7B8CC]">--</h3>
            </div>

            <div className="fd-fade-up group relative bg-white rounded-2xl border border-[#ECEDF6] p-6 shadow-[0_1px_2px_rgba(20,21,43,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(180,83,9,0.3)] hover:border-[#F3E1C8]">
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-[#FBF1E3] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <CheckSquare className="w-5 h-5 text-[#B45309]" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#C7C8DE] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <p className="text-[#6B6C87] text-sm font-medium">Tasks</p>
              <h3 className="fd-mono text-3xl font-semibold mt-2 text-[#B7B8CC]">--</h3>
            </div>
          </div>

          {/* Elegant divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#E4E4F5] to-transparent mb-8" />

          {/* Workspace Header */}
          <div className="flex justify-between items-end mb-7">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#8B8CA8] uppercase mb-1.5">
                Your Space
              </p>
              <h2 className="fd-display text-2xl font-medium text-[#14152B]">
                Workspaces
              </h2>
            </div>

            <Button
              onClick={() => {
                setEditingWorkspace(null);
                setIsModalOpen(true);
              }}
              className="hidden md:inline-flex items-center gap-2 !bg-white !text-[#4A4DDB] border border-[#D3D6FB] rounded-xl px-4 py-2.5 font-medium shadow-sm transition-all duration-200 hover:bg-[#EEF0FE] hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              New Workspace
            </Button>
          </div>

          {/* Workspace Grid */}
          {workspaces.length === 0 ? (
            <div className="fd-fade-up relative overflow-hidden bg-white rounded-[2rem] border border-[#ECEDF6] shadow-[0_1px_2px_rgba(20,21,43,0.04)] p-16 text-center">
              <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-[#5B5EF0]/8 blur-3xl" />

              <div className="relative w-40 h-32 mx-auto mb-7">
                <EmptyStateIllustration />
              </div>

              <h2 className="fd-display relative text-2xl font-medium text-[#14152B] mb-2.5">
                No workspaces yet
              </h2>

              <p className="relative text-[#6B6C87] mb-8 max-w-sm mx-auto leading-relaxed">
                Create your first workspace and start organizing your projects.
              </p>

              <Button
                onClick={() => {
                  setEditingWorkspace(null);
                  setIsModalOpen(true);
                }}
                className="relative inline-flex items-center gap-2 !bg-gradient-to-b !from-[#6B6EF5] !to-[#4A4DDB] !text-white rounded-xl px-6 py-3 font-medium shadow-[0_1px_0_rgba(255,255,255,0.2)_inset,0_10px_24px_-8px_rgba(74,77,219,0.55)] transition-all duration-200 hover:shadow-[0_1px_0_rgba(255,255,255,0.25)_inset,0_14px_28px_-8px_rgba(74,77,219,0.65)] hover:-translate-y-0.5"
              >
                <Plus className="w-4 h-4" />
                Create Workspace
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workspaces.map((workspace) => (
                <div
                  key={workspace._id}
                  className="fd-fade-up transition-all duration-300 hover:-translate-y-1"
                >
                  <WorkspaceCard
                    workspace={workspace}
                    onOpen={(id) => navigate(`/workspace/${id}`)}
                    onEdit={handleEditWorkspace}
                  />
                </div>
              ))}
            </div>
          )}

          <CreateWorkspaceModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setEditingWorkspace(null);
            }}
            fetchWorkspaces={fetchWorkspaces}
            editingWorkspace={editingWorkspace}
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
