import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import { useThemeStore } from '../store/useThemeStore'
import SidebarSkeleton from '../components/Skeleton/SidebarSkeleton'
import { Users } from 'lucide-react'
import { getThemeColors } from '../constants/themeConfig'

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore()
  const { onlineUsers } = useAuthStore()
  const { theme } = useThemeStore()
  const colors = getThemeColors(theme)

  useEffect(() => {
    getUsers()
  }, [getUsers])

  if (isUsersLoading) return <SidebarSkeleton />

  return (
    <aside className={`h-full w-20 lg:w-72 ${colors.inputBg} border-r ${colors.inputBorder} flex flex-col transition-all duration-200`}>
      {/* Header */}
      <div className={`border-b ${colors.inputBorder} w-full p-5`}>
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${colors.accentLight}`}>
            <Users className="size-5 text-white" />
          </div>
          <span className={`font-bold hidden lg:block bg-clip-text text-transparent bg-gradient-to-r ${colors.headingGradient}`}>
            Contacts
          </span>
        </div>
      </div>

      {/* Users List */}
      <div className={`flex-1 overflow-y-auto w-full py-2 px-2 space-y-1`}>
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3 rounded-lg
              transition-all duration-200
              ${
                selectedUser?._id === user._id
                  ? `bg-gradient-to-r ${colors.accentPrimary} shadow-lg`
                  : `hover:${colors.inputBg} ${colors.textPrimary}`
              }
            `}
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0 mx-auto lg:mx-0">
              <img
                src={user.profile || "/avatar.png"}
                alt={user.fullname}
                className={`size-12 object-cover rounded-full border-2 ${colors.inputBorder} shadow-md transition-transform hover:scale-105`}
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className={`absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ${colors.inputBorder}`}
                />
              )}
            </div>

            {/* User Info */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className={`font-semibold truncate ${selectedUser?._id === user._id ? 'text-white' : colors.textPrimary}`}>
                {user.fullname || user.email || "Unknown User"}
              </div>
              <div className={`text-xs mt-0.5 ${selectedUser?._id === user._id ? 'text-white/70' : colors.textTertiary}`}>
                {onlineUsers.includes(user._id) ? (
                  <span className="flex items-center gap-1">
                    <span className="size-1.5 bg-green-500 rounded-full"></span>
                    Online
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <span className={`size-1.5 rounded-full opacity-40`} style={{backgroundColor: 'currentColor'}}></span>
                    Offline
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}

        {/* Empty State */}
        {users.length === 0 && (
          <div className={`text-center ${colors.textSecondary} py-8`}>
            <Users className="size-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No users available</p>
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar