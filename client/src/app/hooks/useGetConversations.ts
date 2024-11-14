import axios from "axios";
import { useEffect, useState } from "react";
import { Chat } from "../types/Chat";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<Chat[]>([]);

  const getConversations = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<Chat[]>("http://127.0.0.1:8080/chats");
      setConversations(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConversations();
  }, []);

  return { loading, conversations, refetchConversations: getConversations };
};

export default useGetConversations;
