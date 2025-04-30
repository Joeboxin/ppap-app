import Link from 'next/link';
import styled from 'styled-components';
import { useStateContext } from '../context/StateContext';
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.primary};
`;

const Logo = styled.a`
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
`;

const Menu = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  a {
    color: #fff;
    font-weight: 600;
  }
`;

const Button = styled.button`
  background: #fff;
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
`;

export default function Navbar() {
  const { address, connect } = useStateContext();
  return (
    <Nav>
      <Link href="/" passHref legacyBehavior><Logo>PPAP</Logo></Link>
      <Menu>
        <Link href="/" passHref legacyBehavior><a>Home</a></Link>
        <Link href="/deploy" passHref legacyBehavior><a>Deploy</a></Link>
        <Link href="/causes" passHref legacyBehavior><a>Causes</a></Link>
        <Link href="/donate" passHref legacyBehavior><a>Donate</a></Link>
        {address ? (
          <span>{address.slice(0,6)}…{address.slice(-4)}</span>
        ) : (
          <ConnectWallet />
        )}
      </Menu>
    </Nav>
  );
}
