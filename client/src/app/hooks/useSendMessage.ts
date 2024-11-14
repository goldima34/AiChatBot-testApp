import { useState } from "react";
import useConversation from "../zustand/useConversation";
import axios from "axios";
import useGetAnswerOpenAi from "./useGetAnswerOpenAi";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message: string, sender: string = "user") => {
    setLoading(true);
    try {
      const question = await axios.post("http://127.0.0.1:8080/messages", {
        chatID: selectedConversation?.id,
        sender: sender,
        content: message,
      });

      if (question.data.error) throw new Error(question.data.error);
      setMessages([...messages, question.data]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
export default useSendMessage;
