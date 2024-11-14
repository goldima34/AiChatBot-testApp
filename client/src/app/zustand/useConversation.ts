import { create } from "zustand";
import { Chat } from "../types/Chat";
import { Message } from "../types/Message";

interface ConversationState {
  selectedConversation: Chat | null;
  setSelectedConversation: (selectedConversation: Chat | null) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
