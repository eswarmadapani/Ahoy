import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { useThemeStore } from '../store/useThemeStore'
import Sidebar from '../components/Sidebar'
import NochatSelected from '../components/NochatSelected'
import ChatContainer from '../components/ChatContainer'
import { getThemeColors } from '../constants/themeConfig'

const HomePage = () => {
  const { selectedUser } = useChatStore()
  const { theme } = useThemeStore()
  const colors = getThemeColors(theme)

  return (
    <div className={`h-screen bg-gradient-to-br ${colors.bgFrom} ${colors.bgVia} ${colors.bgTo} relative overflow-hidden pt-20 px-4`}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -left-40 w-80 h-80 ${colors.blobColor1} rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute -bottom-40 -right-40 w-96 h-96 ${colors.blobColor2} rounded-full blur-3xl animate-pulse animation-delay-2000`}></div>
        <div className={`absolute top-1/2 right-1/4 w-72 h-72 ${colors.blobColor3} rounded-full blur-3xl animate-pulse animation-delay-4000`}></div>
      </div>

      {/* Main Container */}
      <div className='relative z-10 flex items-center justify-center h-full'>
        <div className={`${colors.inputBg} backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-6xl h-[calc(100vh-8rem)] border ${colors.inputBorder}`}>
          <div className='flex h-full rounded-3xl overflow-hidden'>
            <Sidebar />
            {!selectedUser ? <NochatSelected /> : <ChatContainer />}
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
  )
}

export default HomePage