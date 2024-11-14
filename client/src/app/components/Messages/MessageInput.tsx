"use client";

import useGetAnswerOpenAi from "@/app/hooks/useGetAnswerOpenAi";
import useGetMessages from "@/app/hooks/useGetMessages";
import useSendMessage from "@/app/hooks/useSendMessage";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const { loadingAnswer, getOpenAIResponse } = useGetAnswerOpenAi();
  const { getMessages } = useGetMessages();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) return;
    if (!loading) {
      await sendMessage(message, "user");
    }
    if (!loadingAnswer) {
      await getOpenAIResponse(message);
    }
    await getMessages();
    setMessage("");
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 items-center pe-3"
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <PaperAirplaneIcon className="size-7 text-white" />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
