import { useState, useRef, useEffect } from 'react';
import type { KeyboardEvent } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
      // Reset textarea height after sending
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = 'auto';
    target.style.height = `${Math.min(target.scrollHeight, 200)}px`;
  };

  // Reset height when message is cleared
  useEffect(() => {
    if (!message && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, [message]);

  return (
    <div className="border-t border-gray-700 bg-gray-800 px-6 py-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end gap-3">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            placeholder="Type your message..."
            disabled={disabled}
            rows={1}
            className="flex-1 resize-none px-4 py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-800 disabled:cursor-not-allowed"
            style={{ minHeight: '52px', maxHeight: '200px', height: 'auto' }}
          />
          <button
            onClick={handleSend}
            disabled={disabled || !message.trim()}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed flex-shrink-0"
            style={{ height: '52px' }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;