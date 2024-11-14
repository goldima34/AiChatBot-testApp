import axios from "axios";
import { useState } from "react";

const useDeleteChat = () => {
  const [loading, setLoading] = useState(false);

  const deleteChat = async (id: string) => {
    setLoading(true);
    try {
      const { data } = await axios.delete(`http://127.0.0.1:8080/chats/${id}`);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, deleteChat };
};

export default useDeleteChat;
