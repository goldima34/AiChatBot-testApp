import useDeleteChat from "@/app/hooks/useDeleteChat";
import { Chat } from "@/app/types/Chat";
import useConversation from "@/app/zustand/useConversation";
import { TrashIcon } from "@heroicons/react/24/solid";
import React from "react";

interface ConversationProps {
  conversation: Chat;
  RefreshConverstions: () => void;
}

const Conversation = ({
  conversation,
  RefreshConverstions,
}: ConversationProps) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?.id === conversation.id;
  const { loading, deleteChat } = useDeleteChat();

  const onChatDelete = async () => {
    await deleteChat(conversation.id);
    if (!loading) {
      setSelectedConversation(null);
      RefreshConverstions();
    }
  };

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-green-600 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-green-600" : ""
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src="/AiLogo.png" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.title}</p>
            <span className="text-xl ">
              <TrashIcon
                className="size-8 text-white cursor-pointer hover:text-gray-200 z-10"
                onClick={() => onChatDelete()}
              />
            </span>
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1" />
    </>
  );
};

export default Conversation;
