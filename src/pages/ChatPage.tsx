import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatMessages from '../components/ChatMessages';
import ChatInput from '../components/ChatInput';
import PapersSidebar from '../components/PapersSidebar';
import type { Collection, Paper, Message } from '../types';
import { collectionsApi } from '../api/collections';
import { papersApi } from '../api/papers';
import { queriesApi } from '../api/queries';

const ChatPage = () => {
  const { collectionId } = useParams<{ collectionId: string }>();
  
  const [currentCollection, setCurrentCollection] = useState<Collection | null>(null);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPapersSidebarOpen, setIsPapersSidebarOpen] = useState(true);

  useEffect(() => {
    if (collectionId) {
      loadCollection(collectionId);
      loadPapers(collectionId);
      loadChatHistory(collectionId);
    }
  }, [collectionId]);

  const loadCollection = async (id: string) => {
    try {
      const data = await collectionsApi.getById(id);
      setCurrentCollection(data);
    } catch (error) {
      console.error('Failed to load collection:', error);
    }
  };

  const loadPapers = async (id: string) => {
    try {
      const data = await papersApi.getByCollection(id);
      setPapers(data);
    } catch (error) {
      console.error('Failed to load papers:', error);
    }
  };

  const loadChatHistory = async (id: string) => {
    try {
      const data = await collectionsApi.getChatHistory(id) as { messages?: any[] };
      
      if (data && data.messages && Array.isArray(data.messages)) {
        // Convert the chat history data to Message format
        const historyMessages: Message[] = data.messages.map((msg: any) => ({
          id: msg.id || Date.now().toString(),
          role: msg.role,
          content: msg.text, // Note: API uses 'text' but we use 'content'
          created_at: msg.created_at || new Date().toISOString(),
        })).reverse(); // Reverse to show oldest first
        setMessages(historyMessages);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error('Failed to load chat history:', error);
      setMessages([]);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!collectionId || !content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await queriesApi.sendQuery({
        collection_id: collectionId,
        query: content,
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.answer,
        created_at: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request.',
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchPapers = async (query: string) => {
    if (!collectionId) return;
    
    try {
      const searchResults = await collectionsApi.ingestTopic(collectionId, { topic: query });
      
      // Add found papers to the collection
      if (collectionId && searchResults && searchResults.length > 0) {
        for (const paper of searchResults) {
          await papersApi.addToCollection(collectionId, {
            title: paper.title,
            url: paper.url,
            content: paper.content,
          });
        }
        // Reload papers to show the newly added ones
        loadPapers(collectionId);
      }
    } catch (error) {
      console.error('Failed to search papers:', error);
      throw error; // Re-throw to let the modal handle it
    }
  };

  const handleDeletePaper = async (paperId: string) => {
    if (!collectionId) return;
    
    try {
      await papersApi.deletePaper(collectionId, paperId);
      // Reload papers to reflect the deletion
      loadPapers(collectionId);
    } catch (error) {
      console.error('Failed to delete paper:', error);
      throw error; // Re-throw to let the sidebar handle it
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 overflow-hidden">
      {isPapersSidebarOpen && (
        <PapersSidebar
          papers={papers}
          onAddPaper={handleSearchPapers}
          onDeletePaper={handleDeletePaper}
          onClose={() => setIsPapersSidebarOpen(false)}
        />
      )}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header - Fixed */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-gray-700 flex-shrink-0">
          <div className="flex items-center gap-3">
            {!isPapersSidebarOpen && (
              <button
                onClick={() => setIsPapersSidebarOpen(true)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg"
                title="Show papers"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            )}

            <h1 className="text-xl font-semibold text-white">
              {currentCollection?.name || 'Chat'}
            </h1>
          </div>
        </div>

        {/* Messages - Scrollable */}
        <div className="flex-1 overflow-hidden">
          <ChatMessages messages={messages} isLoading={isLoading} />
        </div>

        {/* Input - Fixed */}
        <div className="flex-shrink-0">
          <ChatInput onSendMessage={handleSendMessage} disabled={!collectionId || isLoading} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;