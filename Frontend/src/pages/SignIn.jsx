import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, ArrowRight } from "lucide-react";
import { getThemeColors } from "../constants/themeConfig";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [focusedField, setFocusedField] = useState(null);
  const { login, isLoggingIn } = useAuthStore();
  const { theme } = useThemeStore();
  
  // Get theme colors
  const colors = getThemeColors(theme);

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bgFrom} ${colors.bgVia} ${colors.bgTo} relative overflow-hidden flex items-center justify-center`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -left-40 w-80 h-80 ${colors.blobColor1} rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute -bottom-40 -right-40 w-96 h-96 ${colors.blobColor2} rounded-full blur-3xl animate-pulse animation-delay-2000`}></div>
        <div className={`absolute top-1/3 right-1/4 w-72 h-72 ${colors.blobColor3} rounded-full blur-3xl animate-pulse animation-delay-4000`}></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-6 sm:px-8">
        {/* Logo Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center mb-8">
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-r ${colors.accentPrimary} rounded-2xl blur-lg opacity-75`}></div>
              <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.accentLight} flex items-center justify-center shadow-2xl ${colors.shadowColor}`}>
                <MessageSquare className="w-8 h-8 text-white" strokeWidth={1.5} />
              </div>
            </div>
          </div>
          <h1 className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${colors.headingGradient} mb-3`}>
            Welcome Back
          </h1>
          <p className={`${colors.textSecondary} text-lg`}>Sign in to continue your conversations</p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="relative group">
            <label className={`block text-sm font-semibold ${colors.textPrimary} mb-3 ml-1`}>
              Email Address
            </label>
            <div
              className={`relative transition-all duration-300 ${
                focusedField === "email"
                  ? "scale-[1.02]"
                  : "scale-100"
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${colors.accentSecondary} rounded-xl blur opacity-0 group-hover:opacity-10 transition duration-300`}></div>
              <div className={`relative ${colors.inputBg} backdrop-blur-xl rounded-xl border ${colors.inputBorder} ${colors.inputBorderHover} transition-colors ${colors.inputBorderFocus}`}>
                <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${colors.textTertiary} pointer-events-none`} />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full bg-transparent pl-12 pr-4 py-3 ${colors.textPrimary} placeholder-slate-500 focus:outline-none transition-colors`}
                />
              </div>
            </div>
          </div>

          {/* Password Field */}
          <div className="relative group">
            <label className={`block text-sm font-semibold ${colors.textPrimary} mb-3 ml-1`}>
              Password
            </label>
            <div
              className={`relative transition-all duration-300 ${
                focusedField === "password"
                  ? "scale-[1.02]"
                  : "scale-100"
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${colors.accentSecondary} rounded-xl blur opacity-0 group-hover:opacity-10 transition duration-300`}></div>
              <div className={`relative ${colors.inputBg} backdrop-blur-xl rounded-xl border ${colors.inputBorder} ${colors.inputBorderHover} transition-colors ${colors.inputBorderFocus}`}>
                <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${colors.textTertiary} pointer-events-none`} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full bg-transparent pl-12 pr-12 py-3 ${colors.textPrimary} placeholder-slate-500 focus:outline-none transition-colors`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${colors.textTertiary} hover:${colors.textSecondary} transition-colors focus:outline-none`}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full relative mt-8 group overflow-hidden rounded-xl"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${colors.accentPrimary} transition-transform duration-300 group-hover:scale-105`}></div>
            <div className={`relative bg-gradient-to-r ${colors.accentPrimary} px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 font-semibold text-white transition-all duration-300 group-hover:shadow-2xl group-hover:${colors.shadowColor} disabled:opacity-70`}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </div>
          </button>
        </form>

        {/* Signup Link */}
        <div className="mt-8 text-center">
          <p className={colors.textTertiary}>
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className={`relative font-semibold bg-gradient-to-r ${colors.accentPrimary} bg-clip-text text-transparent hover:opacity-80 transition-opacity inline-flex items-center gap-1 group`}
            >
              Create one
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;