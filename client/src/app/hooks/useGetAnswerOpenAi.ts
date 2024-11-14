import { useState } from "react";
import useConversation from "../zustand/useConversation";
import axios from "axios";

const useGetAnswerOpenAi = () => {
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  const openai = axios.create({
    baseURL: "https://api.openai.com/v1/chat",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  const getOpenAIResponse = async (message: string) => {
    setLoadingAnswer(true);
    try {
      const response = await openai.post("/completions", {
        model: "gpt-4o-mini",
        max_tokens: 100,
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      });
      const req = response.data.choices[0].message.content;

      const question = await axios.post("http://127.0.0.1:8080/messages", {
        chatID: selectedConversation?.id,
        sender: "bot",
        content: req,
      });

      setMessages([...messages, question.data]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingAnswer(false);
    }
  };

  return { getOpenAIResponse, loadingAnswer };
};
export default useGetAnswerOpenAi;
