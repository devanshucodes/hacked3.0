import { atom } from 'nanostores';
import type { Message } from 'ai';

export interface Agent {
  id: string;
  name: string;
  description: string;
  messages: Message[];
  createdAt: Date;
  metadata?: Record<string, any>;
}

// Initialize the agents store
export const agentsStore = atom<Agent[]>([]);

// Helper function to generate a unique ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Function to save a new agent
export const saveAgent = (
  name: string,
  description: string,
  messages: Message[],
  metadata?: Record<string, any>
) => {
  const newAgent: Agent = {
    id: generateId(),
    name,
    description,
    messages,
    createdAt: new Date(),
    metadata,
  };

  // Get current agents and add the new one
  const currentAgents = agentsStore.get();
  agentsStore.set([...currentAgents, newAgent]);

  // Save to localStorage for persistence
  try {
    const savedAgents = JSON.parse(localStorage.getItem('savedAgents') || '[]');
    savedAgents.push(newAgent);
    localStorage.setItem('savedAgents', JSON.stringify(savedAgents));
  } catch (error) {
    console.error('Error saving agent to localStorage:', error);
  }
};

// Function to delete an agent
export const deleteAgent = (agentId: string) => {
  const currentAgents = agentsStore.get();
  const updatedAgents = currentAgents.filter(agent => agent.id !== agentId);
  agentsStore.set(updatedAgents);

  // Update localStorage
  try {
    localStorage.setItem('savedAgents', JSON.stringify(updatedAgents));
  } catch (error) {
    console.error('Error updating localStorage:', error);
  }
};

// Function to load saved agents from localStorage
export const loadSavedAgents = () => {
  try {
    const savedAgents = JSON.parse(localStorage.getItem('savedAgents') || '[]');
    agentsStore.set(savedAgents);
  } catch (error) {
    console.error('Error loading saved agents:', error);
    agentsStore.set([]);
  }
};

// Initialize the store with saved agents when the app loads
if (typeof window !== 'undefined') {
  loadSavedAgents();
} 