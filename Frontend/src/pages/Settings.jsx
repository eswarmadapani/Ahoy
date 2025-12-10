import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send, Palette, CheckCircle2, ArrowRight } from "lucide-react";
import { getThemeColors } from "../constants/themeConfig";
import { useState } from "react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey, how are you?", isSent: false },
  { id: 2, content: "Doing great! You?", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const colors = getThemeColors(theme);
  const [hoveredTheme, setHoveredTheme] = useState(null);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bgFrom} ${colors.bgVia} ${colors.bgTo} relative overflow-hidden`}>
      {/* Premium Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -left-40 w-80 h-80 ${colors.blobColor1} rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute -bottom-40 -right-40 w-96 h-96 ${colors.blobColor2} rounded-full blur-3xl animate-pulse animation-delay-2000`}></div>
        <div className={`absolute top-1/2 left-1/2 w-72 h-72 ${colors.blobColor3} rounded-full blur-3xl animate-pulse animation-delay-4000`}></div>
      </div>

      <div className="relative z-10 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Premium Header */}
          <div className="text-center mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-opacity-20" style={{borderColor: colors.accentPrimary}}>
              <Palette className="w-4 h-4" style={{color: colors.accentPrimary.split(' ')[1]}} />
              <span className={`text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r ${colors.accentPrimary}`}>
                Personalization
              </span>
            </div>
            
            <h1 className={`text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r ${colors.headingGradient}`}>
              Choose Your Style
            </h1>
            
            <p className={`${colors.textSecondary} text-lg max-w-2xl mx-auto leading-relaxed`}>
              Express yourself with carefully curated themes designed for the perfect user experience
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Themes Grid Section */}
            <div className="lg:col-span-2">
              {/* Theme Grid */}
              <div className={`${colors.inputBg} backdrop-blur-xl rounded-3xl border ${colors.inputBorder} p-8 shadow-2xl`}>
                <div className="mb-8">
                  <h2 className={`text-3xl font-bold ${colors.textPrimary} mb-2`}>
                    Available Themes
                  </h2>
                  <p className={`${colors.textSecondary} text-sm`}>
                    {THEMES.length} beautiful themes to choose from
                  </p>
                </div>

                {/* Theme Grid - 2x Grid for better visuals */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {THEMES.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      onMouseEnter={() => setHoveredTheme(t)}
                      onMouseLeave={() => setHoveredTheme(null)}
                      className={`group relative rounded-2xl overflow-hidden transition-all duration-300 focus:outline-none`}
                    >
                      {/* Background Glow */}
                      {theme === t && (
                        <div className={`absolute inset-0 bg-gradient-to-r ${colors.accentPrimary} opacity-20 blur-lg`}></div>
                      )}

                      {/* Theme Card */}
                      <div
                        className={`relative p-4 rounded-2xl backdrop-blur-lg border transition-all duration-300 ${
                          theme === t
                            ? `border-opacity-100 shadow-2xl scale-105 ${colors.inputBorder}`
                            : `border-opacity-30 hover:border-opacity-60 ${colors.inputBorder} hover:shadow-lg`
                        }`}
                        data-theme={t}
                      >
                        {/* Color Preview Boxes */}
                        <div className="grid grid-cols-2 gap-2 mb-3 h-12">
                          <div className="rounded-lg bg-primary shadow-md"></div>
                          <div className="rounded-lg bg-secondary shadow-md"></div>
                          <div className="rounded-lg bg-accent shadow-md"></div>
                          <div className="rounded-lg bg-neutral shadow-md"></div>
                        </div>

                        {/* Theme Name */}
                        <div className="space-y-2">
                          <p className={`text-xs font-bold truncate ${colors.textPrimary}`}>
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                          </p>
                          
                          {/* Active Checkmark */}
                          {theme === t && (
                            <div className="flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" style={{color: colors.accentPrimary.split(' ')[1]}} />
                              <span className={`text-[10px] font-semibold bg-clip-text text-transparent bg-gradient-to-r ${colors.accentPrimary}`}>
                                Active
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className={`${colors.inputBg} backdrop-blur-xl rounded-2xl border ${colors.inputBorder} p-6 shadow-xl`}>
                  <p className={`${colors.textTertiary} text-sm mb-2`}>Total Themes</p>
                  <p className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${colors.headingGradient}`}>
                    {THEMES.length}
                  </p>
                </div>
                <div className={`${colors.inputBg} backdrop-blur-xl rounded-2xl border ${colors.inputBorder} p-6 shadow-xl`}>
                  <p className={`${colors.textTertiary} text-sm mb-2`}>Selected</p>
                  <p className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${colors.accentPrimary}`}>
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  </p>
                </div>
              </div>
            </div>

            {/* Premium Chat Preview */}
            <div className="lg:col-span-1">
              <div className={`${colors.inputBg} backdrop-blur-xl rounded-3xl border ${colors.inputBorder} overflow-hidden shadow-2xl h-full flex flex-col`}>
                {/* Header with Gradient */}
                <div className={`px-6 py-4 bg-gradient-to-r ${colors.accentPrimary} relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
                  <h3 className="relative text-white font-bold text-sm">Live Preview</h3>
                  <p className="relative text-white/70 text-xs mt-1">See how your theme looks</p>
                </div>

                {/* Chat Content */}
                <div className="flex-1 flex flex-col justify-between p-4 overflow-hidden">
                  {/* Messages */}
                  <div className="space-y-3 mb-4">
                    {/* Chat Header */}
                    <div className={`flex items-center gap-2 pb-3 border-b ${colors.inputBorder}`}>
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${colors.accentLight} flex items-center justify-center text-white text-xs font-bold shadow-lg`}>
                        A
                      </div>
                      <div className="flex-1">
                        <p className={`text-xs font-bold ${colors.textPrimary}`}>Ahoy Chat</p>
                        <p className={`text-[10px] ${colors.textTertiary}`}>Online now</p>
                      </div>
                    </div>

                    {/* Messages */}
                    {PREVIEW_MESSAGES.map((message) => (
                      <div key={message.id} className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[75%] rounded-xl px-3 py-2 text-xs shadow-md backdrop-blur-sm transition-all ${
                            message.isSent
                              ? `bg-gradient-to-r ${colors.accentPrimary} text-white`
                              : `${colors.inputBg} ${colors.textPrimary} border border-opacity-20 ${colors.inputBorder}`
                          }`}
                        >
                          <p className="leading-tight">{message.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input Area */}
                  <div className={`flex gap-2 pt-3 border-t border-opacity-20 ${colors.inputBorder}`}>
                    <input
                      type="text"
                      className={`flex-1 text-xs ${colors.inputBg} border border-opacity-30 ${colors.inputBorder} rounded-lg px-3 py-2 ${colors.textPrimary} placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-opacity-50 transition-all backdrop-blur-sm`}
                      placeholder="Message..."
                      readOnly
                    />
                    <button className={`p-2 rounded-lg bg-gradient-to-r ${colors.accentPrimary} hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                      <Send size={14} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className={`${colors.inputBg} backdrop-blur-xl rounded-3xl border ${colors.inputBorder} p-8 shadow-2xl`}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className={`text-xl font-bold ${colors.textPrimary} mb-1`}>
                  Love the new design?
                </h3>
                <p className={`${colors.textSecondary} text-sm`}>
                  Themes apply instantly across your entire chat experience
                </p>
              </div>
              <button className={`relative px-6 py-3 rounded-xl overflow-hidden group whitespace-nowrap`}>
                <div className={`absolute inset-0 bg-gradient-to-r ${colors.accentPrimary} transition-transform duration-300 group-hover:scale-105`}></div>
                <div className="relative flex items-center gap-2 font-semibold text-white">
                  <span>Explore More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </div>
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

export default SettingsPage;
