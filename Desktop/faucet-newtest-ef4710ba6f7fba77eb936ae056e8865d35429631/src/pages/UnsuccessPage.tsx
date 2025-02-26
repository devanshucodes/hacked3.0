import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';

function UnsuccessPage() {
  const navigate = useNavigate();
  const { address } = useAccount();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  return (
    <div className="container">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <img src="/images/Logo.png" alt="Logo" width="90px" height="28px"/>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="grid-container">
          {/* Left side - Image */}
          <div className="leftside">
            <img
              src="/images/Group 1244829751 (3).png"
              alt="Unsuccessful"
              className="hero-image"
            />
          </div>

          {/* Right side - Card */}
          <div className="card" id="unsuccesscard">
            <div className="maincard">
              <div className="maincard-content">
                <div className="image-stack">
                  <img 
                    src="/images/Subtract.png" 
                    alt="Background" 
                    className="subtract"
                  />
                  <img 
                    src="/images/unsuccess.png" 
                    alt="Unsuccessful" 
                    className="success-logo"
                  />
                </div>
              </div>
            </div>

            <div className="success-message">
              <h2 className="success-title">
                <img 
                  src="/images/Property 26.png" 
                  alt="" 
                  className="error-icon" 
                />
                Transfer Unsuccessful
              </h2>
              <p className="success-subtitle">
                Sorry! your transaction has failed<br />
                Please try again
              </p>
            </div>

            <div className="info-list">
              <div className="info-item">
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
              <div className="info-item">
                <span className="info-label">
                  <img src="/images/fi-sr-wallet.png" alt="" width="20" height="20" />
                  Wallet Address
                </span>
                <span>{address?.slice(0, 6)}...{address?.slice(-4)}</span>
              </div>
             
            </div>

            <div className="button-group">
              <button 
                className="button button-primary"
                id="unsuccess-button"
                onClick={() => navigate('/')}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default UnsuccessPage; 