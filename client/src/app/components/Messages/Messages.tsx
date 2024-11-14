"use client";

// import React, { useEffect, useRef } from "react";
// import useGetMessages from "@/app/hooks/useGetMessages";
// import MessageComponent from "./Message";
// import MessageSkeleton from "../skeletons/MessageSkeleton";

// const Messages = () => {
//   const { messages, loading } = useGetMessages();
//   const lastMessageRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // Прокрутка вниз после добавления нового сообщения
//     setTimeout(() => {
//       lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, 100);
//   }, [messages]);

//   return (
//     <div className="px-4 flex-1 overflow-auto">
//       {!loading &&
//         messages.map((message, idx) => (
//           <div
//             key={message.id}
//             ref={idx === messages.length - 1 ? lastMessageRef : null} // Реф на последнее сообщение
//           >
//             <MessageComponent message={message} />
//           </div>
//         ))}
//       {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
//     </div>
//   );
// };

// export default Messages;

import { useEffect, useRef, useState } from "react";
import MessageComponent from "./Message";
import useGetMessages from "@/app/hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length) {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // Прокрутка только после обновления сообщений

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.map((message) => (
          <div key={message.id} ref={lastMessageRef}>
            <MessageComponent message={message} />
          </div>
        ))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
