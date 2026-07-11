import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Rocket,
  FolderKanban,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import api from "../../services/api";

const FEATURES = [
  { icon: Rocket, label: "Launch projects faster" },
  { icon: FolderKanban, label: "Organize workspaces" },
  { icon: CheckCircle2, label: "Track tasks effortlessly" },
];

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      await api.post("/auth/register", {
        fullName,
        email,
        password,
      });

      navigate("/login");
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fd-root relative min-h-screen bg-[#F7F7FB] overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        .fd-root { font-family: 'Inter', system-ui, sans-serif; }
        .fd-display { font-family: 'Fraunces', serif; font-feature-settings: 'ss01' on; }

        @keyframes fd-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fd-fade-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fd-spin { to { transform: rotate(360deg); } }
        .fd-fade-in { animation: fd-fade-in 0.5s ease-out both; }
        .fd-fade-up { animation: fd-fade-up 0.5s ease-out both; }
        .fd-spin { animation: fd-spin 0.7s linear infinite; }

        @media (prefers-reduced-motion: reduce) {
          .fd-fade-in, .fd-fade-up { animation: none; }
        }
      `}</style>

      {/* Layered background: soft radial wash + faint grid texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 8%, rgba(91,94,240,0.12), transparent 40%), radial-gradient(circle at 85% 85%, rgba(240,101,61,0.08), transparent 35%), linear-gradient(rgba(20,21,43,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(20,21,43,0.035) 1px, transparent 1px)",
          backgroundSize: "auto, auto, 44px 44px, 44px 44px",
        }}
      />

      {/* Decorative blurred orbs */}
      <div className="pointer-events-none absolute -top-24 -left-16 w-96 h-96 rounded-full bg-[#5B5EF0]/20 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#F0653D]/10 blur-[120px]" />

      <div className="fd-fade-in relative min-h-screen flex items-center justify-center lg:justify-between max-w-7xl mx-auto px-6 sm:px-8 py-12 gap-12">
        {/* Left side — hero (desktop only) */}
        <div className="hidden lg:flex flex-col justify-center max-w-lg">
          <div className="flex items-center gap-3 mb-10">
            <div className="fd-display w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6B6EF5] to-[#3730A3] flex items-center justify-center text-white text-xl font-medium shadow-[0_10px_24px_-8px_rgba(74,77,219,0.55)]">
              F
            </div>
            <span className="fd-display text-xl font-medium text-[#14152B]">
              FlowDesk
            </span>
          </div>

          <h1 className="fd-display text-5xl leading-[1.1] font-medium text-[#14152B]">
            Start building better workflows.
          </h1>

          <p className="text-[#6B6C87] text-base leading-relaxed mt-6 max-w-md">
            Create your FlowDesk account and organize projects, workspaces
            and tasks beautifully.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
            {FEATURES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="group bg-white/70 backdrop-blur-sm rounded-2xl border border-[#ECEDF6] p-5 shadow-[0_1px_2px_rgba(20,21,43,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(91,94,240,0.35)] hover:border-[#D3D6FB]"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EEF0FE] flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-105">
                  <Icon className="w-5 h-5 text-[#4A4DDB]" />
                </div>
                <p className="text-sm font-medium text-[#14152B]">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right side — register card */}
        <div className="fd-fade-up w-full max-w-md">
          {/* Mobile-only compact logo */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-8">
            <div className="fd-display w-11 h-11 rounded-xl bg-gradient-to-br from-[#6B6EF5] to-[#3730A3] flex items-center justify-center text-white text-lg font-medium shadow-[0_10px_24px_-8px_rgba(74,77,219,0.55)]">
              F
            </div>
            <span className="fd-display text-lg font-medium text-[#14152B]">
              FlowDesk
            </span>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-[#E4E4F5] bg-white/85 backdrop-blur-xl shadow-[0_1px_2px_rgba(20,21,43,0.04),0_32px_64px_-24px_rgba(20,21,43,0.35)] p-8 sm:p-10">
            <div className="pointer-events-none absolute -top-24 -right-16 w-64 h-64 rounded-full bg-gradient-to-br from-[#5B5EF0]/20 to-transparent blur-3xl" />

            <div className="relative">
              <h1 className="fd-display text-3xl font-medium text-center text-[#14152B]">
                Create Account
              </h1>

              <p className="text-center text-[#6B6C87] text-sm mt-2.5 mb-8">
                Create your FlowDesk workspace in under a minute.
              </p>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B7B8CC]" />

                  <input
                    type="text"
                    placeholder="Full name"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#E4E4F5] bg-white text-sm text-[#14152B] placeholder:text-[#B7B8CC] shadow-sm transition-all duration-200 hover:border-[#D3D6FB] focus:outline-none focus:border-[#B9BEF7] focus:ring-4 focus:ring-[#5B5EF0]/10"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B7B8CC]" />

                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#E4E4F5] bg-white text-sm text-[#14152B] placeholder:text-[#B7B8CC] shadow-sm transition-all duration-200 hover:border-[#D3D6FB] focus:outline-none focus:border-[#B9BEF7] focus:ring-4 focus:ring-[#5B5EF0]/10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B7B8CC]" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full pl-11 pr-11 py-3.5 rounded-xl border border-[#E4E4F5] bg-white text-sm text-[#14152B] placeholder:text-[#B7B8CC] shadow-sm transition-all duration-200 hover:border-[#D3D6FB] focus:outline-none focus:border-[#B9BEF7] focus:ring-4 focus:ring-[#5B5EF0]/10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-7 h-7 rounded-lg text-[#8B8CA8] hover:bg-[#F1F1F6] hover:text-[#14152B] transition-all duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group w-full inline-flex items-center justify-center gap-2 bg-gradient-to-b from-[#6B6EF5] to-[#4A4DDB] text-white rounded-xl py-3.5 font-medium text-sm shadow-[0_1px_0_rgba(255,255,255,0.2)_inset,0_10px_24px_-8px_rgba(74,77,219,0.55)] transition-all duration-200 hover:shadow-[0_1px_0_rgba(255,255,255,0.25)_inset,0_14px_28px_-8px_rgba(74,77,219,0.65)] hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A4DDB]/40 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 fd-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 text-center text-sm text-[#6B6C87]">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-[#4A4DDB] hover:text-[#3730A3] font-semibold transition-colors duration-200"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
