import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useWallet } from './hooks/useWallet';


function App() {
  const {
    account,
    balance,
    chainId,
    handleWalletConnect,
    getUserBalance
  } = useWallet();
  const [inputAddress, setInputAddress] = useState('');
  const [inputBalance, setInputBalance] = useState('');

  const handleInputChange = (e) => {
    setInputAddress(e.target.value);
  }

  const getBalance = async () => {
    const balance = await getUserBalance(inputAddress);
    setInputBalance(balance);
  }
  

  return (
    <div className="App">
        <div style={{ padding: '20px' }}>
      <h1>Wallet Connection & Balance Checker</h1>

      <button onClick={handleWalletConnect} style={{ marginBottom: '20px' }}>
        Connect Wallet
      </button>

      {account && (
        <div>
          <p><strong>Connected Address:</strong> {account}</p>
          <p><strong>Network:</strong> {chainId}</p>
          <p><strong>Your Balance:</strong> {balance} ETH</p>
        </div>
      )}

      <div style={{ marginTop: '30px' }}>
        <h3>Check Balance of Any Address</h3>
        <input
          type="text"
          value={inputAddress}
          onChange={handleInputChange}
          placeholder="Enter address"
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <button onClick={getBalance} style={{ padding: '8px' }}>
          Get Balance
        </button>
        {inputBalance && (
          <p>
            <strong>Balance of {inputAddress}:</strong> {inputBalance} ETH
          </p>
        )}
      </div>
    </div>
    </div>
  );
}

export default App;
