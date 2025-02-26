import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';

function SuccessPage() {
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
              alt="Success"
              className="hero-image"
            />
          </div>

          {/* Right side - Card */}
          <div className="card" id="successcard">
            <div className="maincard">
              <div className="maincard-content">
                <div className="image-stack">
                  <img 
                    src="/images/Subtract.png" 
                    alt="Background" 
                    className="subtract"
                  />
                  <img 
                    src="/images/Group 1244829749.png" 
                    alt="Success" 
                    className="success-logo"
                  />
                </div>
              </div>
            </div>

            <div className="success-message">
              <h2 className="success-title">Transfer Successful</h2>
              <p className="success-subtitle">
                Congratulations! you just deposited<br />
                0.1 $GAS on Capx Chain
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
                className="button button-secondary" id='button-sec'
                onClick={() => window.open('https://capxscan.com', '_blank')}
              >
                View on Explorer <img src="/images/icon2.png" alt="" className="external-link-icon" />
              </button>
              <button 
                className="button button-primary" id="button-pri"
                onClick={() => navigate('/')}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SuccessPage;