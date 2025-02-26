import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SuccessPage from './pages/SuccessPage';
import UnsuccessPage from './pages/UnsuccessPage';
import { Helmet } from 'react-helmet-async';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <meta name="description" content="Use the testnet faucet to get $GAS token on Capx Chain Testnet" />
        <title>Capx Chain Testnet Faucet</title>
      </Helmet>
      
      <header className="p-4">
        <div className="container mx-auto flex justify-between items-center">
         
        </div>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/unsuccessful" element={<UnsuccessPage />} />
      </Routes>
    </div>
  );
}

export default App;