import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { Avatar } from '../../../reuseables/Avatar';

interface AudioPreviewProps {
  audioBlob: Blob;
  onSend: () => void;
  onDelete?: () => void; // Optional delete handler
}

export const AudioPreview: React.FC<AudioPreviewProps> = ({
  audioBlob,
  onSend,
  onDelete,
}) => (
  <div className='flex items-start gap-3 mb-4 flex-row-reverse'>
    <Avatar isUser={true} />
    <div className='flex items-center gap-2 w-fit bg-[#007b83] rounded-lg p-1'>
      <audio
        controls
        src={URL.createObjectURL(audioBlob)}
        className='max-w-[180px]'
      />
      <div className='flex gap-1'>
        {onDelete && (
          <button
            onClick={onDelete}
            className='p-2 text-white bg-red-500 rounded-lg hover:bg-red-600 cursor-pointer'
            title='Delete audio'
          >
            <FaTrash className='text-sm' />
          </button>
        )}
        <button
          onClick={onSend}
          className='px-3 py-2 text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 cursor-pointer text-sm font-medium'
        >
          Send
        </button>
      </div>
    </div>
  </div>
);
