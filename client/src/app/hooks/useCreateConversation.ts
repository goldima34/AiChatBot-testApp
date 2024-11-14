import axios from "axios";
import { useEffect, useState } from "react";
import { Chat } from "../types/Chat";

interface CreateConversationProps {
  title: string;
  submit: boolean;
}

const useCreateConversation = ({ title, submit }: CreateConversationProps) => {
  const [conversation, setConversation] = useState<Chat>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (submit && title) {
      const createConversation = async () => {
        setLoading(true);
        try {
          const { data } = await axios.post<Chat>(
            "http://127.0.0.1:8080/chats",
            { title: title }
          );
          setConversation(data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

      createConversation();
    }
  }, [submit, title]);

  return { loading, conversation };
};

export default useCreateConversation;
