import React from 'react';
import type { Agent } from '~/lib/stores/agents';
import { Dialog } from '@radix-ui/react-dialog';

interface AgentStoreProps {
  isOpen: boolean;
  onClose: () => void;
  agents: Agent[];
  onAgentSelect: (agent: Agent) => void;
  onAgentDelete: (agentId: string) => void;
}

export const AgentStore: React.FC<AgentStoreProps> = ({
  isOpen,
  onClose,
  agents,
  onAgentSelect,
  onAgentDelete,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Saved Agents</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {agents.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No saved agents yet. Start a conversation and save it as an agent!
            </p>
          ) : (
            <div className="grid gap-4">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{agent.name}</h3>
                      <p className="text-sm text-gray-600">
                        {agent.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Created: {new Date(agent.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onAgentSelect(agent)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                      >
                        Load
                      </button>
                      <button
                        onClick={() => onAgentDelete(agent.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
}; 