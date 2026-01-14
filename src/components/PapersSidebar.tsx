import { useState } from 'react';
import type { Paper } from '../types';
import AddPaperModal from './AddPaperModal';

interface PapersSidebarProps {
  papers: Paper[];
  onAddPaper: (query: string) => Promise<void>;
  onClose: () => void;
}

const PapersSidebar = ({ papers, onAddPaper, onClose }: PapersSidebarProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handlePaperClick = (paper: Paper) => {
    if (paper.pdf_url) {
      window.open(paper.pdf_url, '_blank', 'noopener,noreferrer');
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
                  onClick={() => handlePaperClick(paper)}
                  className={`p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all border border-gray-600 group ${
                    paper.pdf_url ? 'cursor-pointer hover:border-indigo-500' : 'cursor-default'
                  }`}
                  title={paper.pdf_url ? 'Click to open paper' : 'No URL available'}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-sm text-white mb-1 line-clamp-2 flex-1">
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