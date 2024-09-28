import React, { useEffect, useState } from 'react'

export const useWallet = () => {
    const [account, setAccount] = useState("")
    const [chainId, setChainId] = useState("")
    const [balance, setBalance] = useState(null);
    const ethereum = window.ethereum;

    const handleWalletConnect = async() => {
        if(ethereum) {
            try {
                const accounts = await ethereum.request({
                    method: "eth_requestAccounts"
                })
                setAccount(accounts)

                const accountBalance = await ethereum.request({
                    method: "eth_getBalance",
                    params: [accounts[0], 'latest'],
                })
                setBalance(ethers.utils.formatEther(accountBalance))
                console.log(`chainId: ${parseInt(chainId, 16)}`)

                const chainId = await ethereum.request({
                    method: "eth_chainId"
                })
                setChainId(chainId);
            } catch (error) {
                console.error('Error connecting to wallet:', error);
            }
        } else {
            alert('Please install MetaMask or another Ethereum wallet!');
          }
    }

    const getUserBalance = async (userAddress) => {
        if(ethereum) {
            try {
                const accountBalance = await ethereum.request({
                    method: "eth_getBalance",
                    params: [userAddress, 'latest'],
                })
                return ethers.utils.formatEther(accountBalance);
            } catch (error) {
                console.error('Error fetching balance', error);
                return 'Something went wrong';
            }
        } else {
            return 'Please connect your wallet';
        }
    }

    const handleChainChanged = (chainId) => {
        // window.location.reload();
        setChainId(`${parseInt(chainId, 16)}`)
        console.log({chainId})
    }

    const handleAccountChanged = (accounts) => {
        if (accounts.length > 0) {
            setAccount(accounts[0]);
          } else {
            setAccount('');
          }
    }

    useEffect(() => {
        if (ethereum) {
            ethereum.on("accountsChanged", handleAccountChanged)
            ethereum.on("chainChanged", handleChainChanged)
        }

        return () => {
            if (ethereum) {
                ethereum.removeListener("accountsChanged", handleAccountChanged)
                ethereum.removeListener("chainChanged", handleChainChanged)
            }
        }
    })
  return {
    account,
    balance,
    chainId,
    handleWalletConnect,
    getUserBalance
  }
}
