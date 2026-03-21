import { FaRobot, FaUser } from 'react-icons/fa';

export const Avatar = ({ isUser }: { isUser: boolean }) => {
  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser ? 'bg-[#007b83] text-white' : 'bg-gray-500 text-white'
      }`}
    >
      {isUser ? <FaUser size={14} /> : <FaRobot size={14} />}
    </div>
  );
};
