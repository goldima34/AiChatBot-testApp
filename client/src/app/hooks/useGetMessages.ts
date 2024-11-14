import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import axios from "axios";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const getMessages = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8080/messages/${selectedConversation?.id}`
      );
      if (data.error) throw new Error(data.error);
      console.log("Received messages:", data);
      setMessages(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (selectedConversation?.id) getMessages();
  }, [selectedConversation?.id, setMessages]);

  return { messages, loading, getMessages };
};

export default useGetMessages;
