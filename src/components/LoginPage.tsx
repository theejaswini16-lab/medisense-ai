import React, { useState } from "react";
import {
  BrainCircuit,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Activity,
  User,
  Stethoscope,
  Building
} from "lucide-react";
import { UserRole } from "../types";

interface LoginPageProps {
  onLoginSuccess: (role: UserRole) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("patient");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(selectedRole);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 bg-[radial-gradient(#00C853_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>
      <div className="absolute w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[130px] pointer-events-none -top-20 -left-20"></div>
      <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none -bottom-20 -right-20"></div>

      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-3xl border border-emerald-500/20 shadow-2xl overflow-hidden relative z-10">
        
        {/* Left Side: Medical AI Illustration Graphic */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden border-r border-slate-800">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl"></div>
          
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00C853] to-[#00BCD4] p-[2px]">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Activity className="w-5 h-5 text-[#00C853] animate-pulse" />
                </div>
              </div>
              <span className="text-xl font-black text-white">MediSense AI</span>
            </div>

            <h2 className="text-2xl font-black tracking-tight leading-tight text-white mb-3">
              Intelligent Urban Health Gateway
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Access AI diagnostic reports, patient queues, and regional disease monitoring networks.
            </p>
          </div>

          <div className="space-y-3 pt-8">
            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#00C853]" />
              <div>
                <h5 className="text-xs font-bold text-white">HIPAA & Clinical Compliant</h5>
                <p className="text-[10px] text-slate-400">Encrypted health data storage</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-3">
              <BrainCircuit className="w-5 h-5 text-[#00BCD4]" />
              <div>
                <h5 className="text-xs font-bold text-white">Gemini 3.6 Neural Diagnostic</h5>
                <p className="text-[10px] text-slate-400">Real-time triage & vector predictions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Glassmorphism Login Card */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center space-y-6">
          
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              {isRegister ? "Create Portal Account" : "Welcome Back"}
            </h3>
            <span className="text-xs text-slate-400">Step 1 of 2</span>
          </div>

          {/* Account Type Selector */}
          <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setSelectedRole("patient")}
              className={`py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                selectedRole === "patient"
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow-sm"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              <User className="w-3.5 h-3.5" /> Patient
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole("doctor")}
              className={`py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                selectedRole === "doctor"
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow-sm"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" /> Doctor
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole("admin")}
              className={`py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                selectedRole === "admin"
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow-sm"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              <Building className="w-3.5 h-3.5" /> Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Email / Medical Portal ID
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@health.gov.in"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#00C853] via-[#00BCD4] to-[#1E3A8A] text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-[1.01] transition-all cursor-pointer"
            >
              <span>{isRegister ? "Create Account & Proceed" : "Sign In to Portal"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Social Google Login Button */}
          <div className="pt-2">
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
              <span className="flex-shrink mx-4 text-[10px] font-bold text-slate-400 uppercase">Or continue with</span>
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            </div>

            <button
              onClick={() => onLoginSuccess(selectedRole)}
              className="w-full py-2.5 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center justify-center gap-2 hover:border-cyan-500 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign in with Google Health ID</span>
            </button>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => setIsRegister((prev) => !prev)}
              className="text-xs text-slate-500 hover:text-emerald-500 font-medium"
            >
              {isRegister ? "Already registered? Sign in here." : "New healthcare user? Register here."}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
