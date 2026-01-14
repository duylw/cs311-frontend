import { useState } from 'react';
import type { Paper } from '../types';
import AddPaperModal from './AddPaperModal';

interface PapersSidebarProps {
  papers: Paper[];
  onAddPaper: (query: string) => Promise<void>;
  onDeletePaper: (paperId: string) => Promise<void>;
  onClose: () => void;
}

const PapersSidebar = ({ papers, onAddPaper, onDeletePaper, onClose }: PapersSidebarProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingPaperId, setDeletingPaperId] = useState<string | null>(null);

  const handlePaperClick = (paper: Paper) => {
    if (paper.pdf_url) {
      window.open(paper.pdf_url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleDelete = async (e: React.MouseEvent, paperId: string) => {
    e.stopPropagation(); // Prevent opening the paper when clicking delete
    
    if (!confirm('Are you sure you want to delete this paper?')) {
      return;
    }

    setDeletingPaperId(paperId);
    try {
      await onDeletePaper(paperId);
    } catch (error) {
      console.error('Failed to delete paper:', error);
      alert('Failed to delete paper. Please try again.');
    } finally {
      setDeletingPaperId(null);
    }
  };

  return (
    <>
      <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Papers & Sources</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            title="Close sidebar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 border-b border-gray-700">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all"
          >
            + Add Source
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {papers.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <svg
                className="mx-auto h-12 w-12 text-gray-600 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-sm">No papers yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {papers.map((paper) => (
                <div
                  key={paper.id}
                  className={`p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all border border-gray-600 group relative ${
                    paper.pdf_url ? 'cursor-pointer hover:border-indigo-500' : 'cursor-default'
                  } ${deletingPaperId === paper.id ? 'opacity-50' : ''}`}
                >
                  <div onClick={() => handlePaperClick(paper)}>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-medium text-sm text-white mb-1 line-clamp-2 flex-1 pr-6">
                        {paper.title}
                      </h3>
                      {paper.url && (
                        <svg 
                          className="w-4 h-4 text-gray-400 group-hover:text-indigo-400 transition-colors flex-shrink-0 mt-0.5" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      )}
                    </div>
                    {paper.authors && paper.authors.length > 0 && (
                      <p className="text-xs text-gray-400 mb-1">
                        {paper.authors.join(', ')}
                      </p>
                    )}
                    {paper.year && (
                      <p className="text-xs text-gray-500">{paper.year}</p>
                    )}
                  </div>
                  
                  {/* Delete Button */}
                  <button
                    onClick={(e) => handleDelete(e, paper.id)}
                    disabled={deletingPaperId === paper.id}
                    className="absolute top-2 right-2 p-1.5 bg-gray-800 hover:bg-red-600 text-gray-400 hover:text-white rounded transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50"
                    title="Delete paper"
                  >
                    {deletingPaperId === paper.id ? (
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isAddModalOpen && (
        <AddPaperModal
          onClose={() => setIsAddModalOpen(false)}
          onSearch={onAddPaper}
        />
      )}
    </>
  );
};

export default PapersSidebar;