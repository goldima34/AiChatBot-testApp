import React from "react";
import Conversation from "./Conversation";
import { Chat } from "@/app/types/Chat";

interface ConversationsProps {
  loading: boolean;
  conversations: Chat[];
  RefreshConverstions: () => void;
}

const Conversations = ({
  loading,
  conversations,
  RefreshConverstions,
}: ConversationsProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else {
    return (
      <div className="py-2 flex flex-col overflow-auto">
        {conversations.map((conversation) => (
          <Conversation
            key={conversation.id}
            conversation={conversation}
            RefreshConverstions={RefreshConverstions}
          />
        ))}
      </div>
    );
  }
};

export default Conversations;
