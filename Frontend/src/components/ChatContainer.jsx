import { useChatStore } from "../store/useChatStore";
import { useThemeStore } from "../store/useThemeStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "../components/Skeleton/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { getThemeColors } from "../constants/themeConfig";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const { theme } = useThemeStore();
  const colors = getThemeColors(theme);
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser?._id, getMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${colors.textPrimary}`}>
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${message.senderId === authUser._id ? "justify-end" : "justify-start"}`}
            ref={messageEndRef}
          >
            <div className={`flex gap-3 max-w-xs lg:max-w-md xl:max-w-lg ${message.senderId === authUser._id ? "flex-row-reverse" : "flex-row"}`}>
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className={`w-8 h-8 rounded-full border-2 ${colors.inputBorder} overflow-hidden shadow-md`}>
                  <img
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Message Content */}
              <div className={`flex flex-col ${message.senderId === authUser._id ? "items-end" : "items-start"}`}>
                {/* Time */}
                <time className={`text-xs ${colors.textTertiary} mb-1`}>
                  {formatMessageTime(message.createdAt)}
                </time>

                {/* Message Bubble */}
                <div
                  className={`rounded-2xl px-4 py-2.5 shadow-md backdrop-blur-sm transition-all ${
                    message.senderId === authUser._id
                      ? `bg-gradient-to-br ${colors.accentPrimary} text-white rounded-br-none`
                      : `${colors.inputBg} ${colors.textPrimary} border ${colors.inputBorder} rounded-bl-none`
                  }`}
                >
                  {/* Image */}
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-lg mb-2 shadow-md"
                    />
                  )}

                  {/* Text */}
                  {message.text && (
                    <p className="text-sm leading-relaxed break-words">
                      {message.text}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;