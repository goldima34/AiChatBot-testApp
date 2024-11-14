"use client";
import React from "react";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import CreateConversation from "./CreateConversation";
import useGetConversations from "@/app/hooks/useGetConversations";
import useSendMessage from "@/app/hooks/useSendMessage";

const Sidebar = () => {
  const { loading, conversations, refetchConversations } =
    useGetConversations();

  const RefreshConverstions = async () => {
    refetchConversations();
  };

  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <CreateConversation onCreateConversation={RefreshConverstions} />
      <div className="divider px-3"></div>
      <Conversations
        loading={loading}
        conversations={conversations}
        RefreshConverstions={RefreshConverstions}
      />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
