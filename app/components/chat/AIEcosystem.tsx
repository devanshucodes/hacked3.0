import React from 'react';
import { useStore } from '@nanostores/react';
import { agentsStore, deleteAgent } from '~/lib/stores/agents';
import { toast } from 'react-toastify';
import { useNavigate } from '@remix-run/react';

const AIEcosystem = () => {
  const agents = useStore(agentsStore);
  const navigate = useNavigate();

  const handleDeleteAgent = (agentId: string) => {
    if (confirm('Are you sure you want to delete this agent?')) {
      deleteAgent(agentId);
      toast.success('Agent deleted successfully!');
    }
  };

  const handleLoadAgent = (agent: any) => {
    // Navigate back to chat with this agent
    navigate('/', { state: { loadAgent: agent } });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">AI Agent Ecosystem</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Saved AI Agents Column */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Saved AI Agents</h2>
          <div className="space-y-4">
            {agents.length === 0 ? (
              <p className="text-center text-gray-500 py-4">
                No saved agents yet. Create a chat and save it as an agent!
              </p>
            ) : (
              agents.map((agent) => (
                <div key={agent.id} className="border p-4 rounded-md hover:shadow-md transition-all">
                  <h3 className="font-medium text-lg mb-2">{agent.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{agent.description}</p>
                  <div className="text-xs text-gray-400 mb-3">
                    Created: {new Date(agent.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleLoadAgent(agent)}
                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                    >
                      Load Agent
                    </button>
                    <button
                      onClick={() => handleDeleteAgent(agent.id)}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Global AI Agents Column */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Global AI Agents</h2>
          <div className="text-center text-gray-500 mt-8">
            <p>Coming Soon</p>
            <p className="text-sm">Discover and use AI agents created by the community</p>
          </div>
        </div>

        {/* Marketplace Column */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Marketplace</h2>
          <div className="text-center text-gray-500 mt-8">
            <p>Coming Soon</p>
            <p className="text-sm">Buy and sell AI agents</p>
          </div>
        </div>

        {/* Crowdfunding Column */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Crowdfunding</h2>
          <div className="text-center text-gray-500 mt-8">
            <p>Coming Soon</p>
            <p className="text-sm">Support the development of new AI agents</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIEcosystem; 