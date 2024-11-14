"use client";

import useCreateConversation from "@/app/hooks/useCreateConversation";
import useSendMessage from "@/app/hooks/useSendMessage";
import useConversation from "@/app/zustand/useConversation";
import { PlusIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";

interface CreateConversationProps {
  onCreateConversation: () => void;
}

const CreateConversation = ({
  onCreateConversation,
}: CreateConversationProps) => {
  const [modal, setModal] = useState(false);
  return (
    <>
      <div className="items-center gap-2">
        <button
          className="btn bg-green-600 text-white w-full"
          onClick={() => setModal(!modal)}
        >
          <span className="sm:text-lg md:text-xl ">Create new chat</span>
        </button>
      </div>
      {modal && <Modal onCreateConversation={onCreateConversation} />}
    </>
  );
};

const Modal = ({ onCreateConversation }: CreateConversationProps) => {
  const [title, setTitle] = useState("");
  const [submit, setSubmit] = useState(false);
  const { setSelectedConversation } = useConversation();
  const { loading, conversation } = useCreateConversation({ title, submit });
  const { sendMessage } = useSendMessage();

  const onSubmit = () => {
    setSubmit(true);
  };

  useEffect(() => {
    if (conversation && !loading) {
      onCreateConversation();
      setSelectedConversation(conversation);
      setSubmit(false);
      setTitle("");
    }
  }, [conversation, loading, setSelectedConversation]);

  return (
    <div className="flex items-center gap-2 mt-2">
      <input
        type="text"
        placeholder="New chat"
        className="input input-bordered rounded-full w-full h-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        className="btn btn-circle bg-green-600 text-white"
        onClick={onSubmit}
        disabled={loading || !title.trim()}
      >
        <PlusIcon className="w-6 h-6 outline-none " />
      </button>
    </div>
  );
};

export default CreateConversation;
