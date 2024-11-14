"use client";

import { extractTime } from "@/app/services/extractTime";
import { Message } from "@/app/types/Message";
import React from "react";

interface MessageProps {
  message: Message;
}

const MessageComponent = ({ message }: MessageProps) => {
  const userPhoto =
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
  const botPhoto = "/AiLogo.png";
  const fromMe = message.sender === "user";
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? userPhoto : botPhoto;
  const bubbleBgColor = fromMe ? "bg-green-600" : "";
  const formattedTime = extractTime(message.createdAt);

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>

      <div className={`chat-bubble ${bubbleBgColor} text-white`}>
        {message.content}
      </div>

      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default MessageComponent;
