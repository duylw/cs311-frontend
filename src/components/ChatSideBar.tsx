import { useState } from 'react';
import type { Collection } from '../types';

interface ChatSidebarProps {
  collections: Collection[];
  currentCollectionId?: string;
}

const ChatSidebar = ({
  collections,
  currentCollectionId,
}: ChatSidebarProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newChatName, setNewChatName] = useState('');


  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <button
          onClick={() => setIsCreating(true)}
          className="w-full px-4 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
        >
          + New Chat
        </button>
      </div>

      {isCreating && (
        <div className="p-4 bg-gray-800">
          <input
            type="text"
            value={newChatName}
            onChange={(e) => setNewChatName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            placeholder="Chat name..."
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={handleCreate}
              className="flex-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              Create
            </button>
            <button
              onClick={() => {
                setIsCreating(false);
                setNewChatName('');
              }}
              className="flex-1 px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {collections.map((collection) => (
          <button
            key={collection.id}
            onClick={() => onSelectCollection(collection.id)}
            className={`w-full px-4 py-3 text-left hover:bg-gray-800 transition-colors ${
              currentCollectionId === collection.id ? 'bg-gray-800' : ''
            }`}
          >
            <div className="font-medium truncate">{collection.name}</div>
            {collection.description && (
              <div className="text-xs text-gray-400 truncate mt-1">
                {collection.description}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;