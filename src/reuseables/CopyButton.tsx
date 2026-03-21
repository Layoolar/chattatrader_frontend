import { useState } from 'react';
import { FaCopy } from 'react-icons/fa';

export const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className='text-blue-600 hover:text-blue-800 text-lg p-2'
      title='Copy to clipboard'
    >
      {copied ? '✔' : <FaCopy />}
    </button>
  );
};
