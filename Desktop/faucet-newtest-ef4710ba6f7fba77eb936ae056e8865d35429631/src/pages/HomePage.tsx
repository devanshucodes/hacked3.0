import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount, useDisconnect } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import axios from 'axios';

function HomePage() {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [timeLeft, setTimeLeft] = React.useState<string>('00:00:00');
  const [canClaim, setCanClaim] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // Check if device is mobile
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const checkClaimStatus = React.useCallback(async () => {
    if (!address) return;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/claims/check/${address}`
      );
      
      const { canClaim: canClaimNow, timeLeft: timeLeftMs } = response.data;
      setCanClaim(canClaimNow);

      if (!canClaimNow && timeLeftMs > 0) {
        const hours = Math.floor(timeLeftMs / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeftMs % (1000 * 60)) / 1000);

        setTimeLeft(
          `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
            seconds
          ).padStart(2, '0')}`
        );
      } else {
        setTimeLeft('00:00:00');
      }
    } catch (error) {
      console.error('Error checking claim status:', error);
    }
  }, [address]);

  // Check claim status when wallet connects and every second after
  React.useEffect(() => {
    if (!address) return;

    checkClaimStatus();
    const interval = setInterval(checkClaimStatus, 1000);
    return () => clearInterval(interval);
  }, [address, checkClaimStatus]);

  // Show mobile restriction message on small screens
  if (isMobile) {
    return (
      <div className="mobile-message">
        <div className="mobile-card">
          <h2 className="card-title">Mobile Access Restricted</h2>
          <p className="card-subtitle">
            Please open this application on a desktop browser for the best experience.
          </p>
        </div>
      </div>
    );
  }

  const handleGetTokens = async () => {
    if (!address || !canClaim || isLoading) return;
    
    setIsLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/claims/record`, {
        walletAddress: address
      });
      
      await checkClaimStatus(); // Update status immediately
      navigate('/success');
    } catch (error) {
      console.error('Error recording claim:', error);
      navigate('/unsuccessful');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <img src="/images/Logo.png" alt="Logo" className="logo-image" width="90px" height="28px"/>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="grid-container">
          {/* Left side - Image */}
          <div className='leftside'>
            <img
              src="/images/Group 1244829751 (3).png"
              alt="Ethereum"
              className="hero-image"
            />
          </div>

          {/* Right side - Content */}
          <div className={`card ${isConnected ? 'card-connected' : ''}`}>
            <div className='maincard'> 
              <div className="maincard-content">
                <div className="maincard-text">
                  {/* <h2 className="card-title">Get the testnet tokens</h2> */}
                  <p className="card-subtitle">
                  <span className='gettestnet'> Get the testnet tokens </span> to seamlessly test and develop your dApps on the <span className='capxchain'> Capx Chain </span>
                  </p>
                </div>
                <div className="maincard-logo">
                  <img src="/images/GG1.png" alt="Logo" width="200px" height="140px"/>
                </div>
              </div>
            </div>

            <div className="timer-section">
              <div className="timer-display">{timeLeft}</div>
              <p className="timer-message">
                {canClaim
                  ? 'You can claim 100 $gas tokens now'
                  : 'Time until next claim available'}
              </p>
            </div>

            <div className="info-list">
              <div className="info-item" id="network">
                <span className="info-label">
                  <img src="/images/fi-sr-network.png" alt="" width="20" height="20" />
                  Network
                </span>
                <span>CAPX Chain Testnet</span>
              </div>
              <div className="info-item">
                <span className="info-label">
                  <img src="/images/Vector.png" alt="" width="20" height="20" />
                  Token
                </span>
                <span>$GAS</span>
              </div>
            </div>

            {isConnected && (
              <div className="transfer-container">
                <div className="transfer-header">
                  <span className="transfer-label">Transfer to:</span>
                  <button 
                    className="disconnect-button" 
                    onClick={() => disconnect()}
                  >
                    Disconnect
                  </button>
                </div>
                <div className="address-container">
                  <span className="wallet-address">
                    {address?.slice(0, 35)}...
                  </span>
                </div>
              </div>
            )}

            {!isConnected ? (
              <ConnectButton.Custom>
                {({ openConnectModal }) => (
                  <center> <button
                    onClick={openConnectModal}
                    className="button button-primary"
                  >
                    Connect Wallet
                  </button> </center>
                )}
              </ConnectButton.Custom>
            ) : (
              <center> <button
                onClick={handleGetTokens}
                disabled={!canClaim || isLoading}
                className={`button ${canClaim && !isLoading ? 'button-primary' : 'button-disabled'}`}
              >
                {isLoading ? 'Processing...' : 'Get $GAS tokens'}
              </button>
              </center>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;