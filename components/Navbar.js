import Link from 'next/link';
import styled from 'styled-components';
import { useState } from 'react';

const Nav = styled.nav`
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.accent};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  a {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const WalletButton = styled.button`
  background: ${({ theme }) => theme.colors.secondary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    opacity: 0.9;
  }
`;

export default function Navbar() {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error('Wallet connection failed:', error);
      }
    } else {
      alert('Please install MetaMask to connect your wallet.');
    }
  };

  return (
    <Nav>
      <Link href="/">PPAP</Link>
      <NavLinks>
        <Link href="/donate">Donate</Link>
        <Link href="/causes">Causes</Link>
        <WalletButton onClick={connectWallet}>
          {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
        </WalletButton>
      </NavLinks>
    </Nav>
  );
}