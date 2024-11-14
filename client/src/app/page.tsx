import MessageContainer from "./components/Messages/MessageContainer";
import Sidebar from "./components/Sidebar/Sidebar";

export default function Home() {
  return (
    <div
      className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 
      bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0"
    >
      <Sidebar />
      <MessageContainer />
    </div>
  );
}
