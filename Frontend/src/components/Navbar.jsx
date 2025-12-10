import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { useThemeStore } from '../store/useThemeStore'
import { LogOut, MessageSquare, Settings, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { getThemeColors } from '../constants/themeConfig';


const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const { theme } = useThemeStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const colors = getThemeColors(theme);

  return (
    <header
      className={`${colors.inputBg} backdrop-blur-xl fixed w-full top-0 z-40 border-b transition-all duration-300`}
      style={{
        borderColor: colors.inputBorder.replace('border-', '').includes('slate') ? 'rgba(100, 116, 139, 0.3)' : 'rgba(139, 92, 246, 0.2)'
      }}
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <Link 
              to="/" 
              className={`flex items-center gap-2.5 hover:opacity-80 transition-all group`}
            >
              <div className={`size-10 rounded-lg bg-gradient-to-br ${colors.accentLight} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all`}>
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h1 className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${colors.accentPrimary}`}>
                Ahoy
              </h1>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-2">
            <Link
              to={"/settings"}
              className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 font-medium ${colors.textSecondary} 
              hover:${colors.inputBg} ${colors.inputBg} border ${colors.inputBorder} hover:border-opacity-100`}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Link>

            {authUser && (
              <>
                <Link 
                  to={"/profile"} 
                  className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 font-medium ${colors.textSecondary} 
                  hover:${colors.inputBg} ${colors.inputBg} border ${colors.inputBorder} hover:border-opacity-100`}
                >
                  <User className="size-4" />
                  <span>Profile</span>
                </Link>

                <button 
                  className={`px-4 py-2 rounded-lg transition-all duration-300 flex gap-2 items-center font-medium bg-gradient-to-r ${colors.accentPrimary} text-white 
                  hover:shadow-lg hover:shadow-${colors.shadowColor.split('-')[1]}-500/50`}
                  onClick={logout}
                >
                  <LogOut className="size-4" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="sm:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${colors.inputBg} border ${colors.inputBorder}`}
            >
              {mobileMenuOpen ? (
                <X className={`w-5 h-5 ${colors.textSecondary}`} />
              ) : (
                <Menu className={`w-5 h-5 ${colors.textSecondary}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`absolute top-16 left-0 right-0 ${colors.inputBg} border-b ${colors.inputBorder} backdrop-blur-xl`}>
            <div className="flex flex-col gap-2 p-4">
              <Link
                to={"/settings"}
                className={`px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 font-medium ${colors.textSecondary} 
                hover:${colors.inputBg} ${colors.inputBg} border ${colors.inputBorder}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>

              {authUser && (
                <>
                  <Link 
                    to={"/profile"} 
                    className={`px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 font-medium ${colors.textSecondary} 
                    hover:${colors.inputBg} ${colors.inputBg} border ${colors.inputBorder}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="size-4" />
                    <span>Profile</span>
                  </Link>

                  <button 
                    className={`px-4 py-3 rounded-lg transition-all duration-300 flex gap-2 items-center font-medium bg-gradient-to-r ${colors.accentPrimary} text-white 
                    hover:shadow-lg`}
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="size-4" />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar