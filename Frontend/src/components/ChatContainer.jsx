import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from '../components/ChatHeader'
import MessageInput from '../components/MessageInput'
import MessageSkeleton from '../components/Skeleton/MessageSkeleton'


const ChatContainer = () => {
  const {messages, getMessages, isMessagesLoading, selectedUser} = useChatStore();

  useEffect(() => {   
    getMessages(selectedUser._id);
  },[selectedUser._id, getMessages]);

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
    <div className='flex-1 flex flex-col overflow-auto '>
      <ChatHeader />
      <p>
        Messages
      </p>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
