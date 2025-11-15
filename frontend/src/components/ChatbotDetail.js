import React, { useState } from 'react';
import Analytics from './Analytics';
import Conversations from './Conversations';

export default function ChatbotDetail({ chatbot, onBack }) {
  const [activeTab, setActiveTab] = useState('analytics');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold">{chatbot.name}</h1>
        </div>
      </div>

      <div className="border-b">
        <nav className="flex gap-8">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`pb-4 px-1 border-b-2 font-medium ${
              activeTab === 'analytics'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('conversations')}
            className={`pb-4 px-1 border-b-2 font-medium ${
              activeTab === 'conversations'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Conversations
          </button>
        </nav>
      </div>

      <div>
        {activeTab === 'analytics' && <Analytics chatbotId={chatbot.id} />}
        {activeTab === 'conversations' && <Conversations chatbotId={chatbot.id} />}
      </div>
    </div>
  );
}
