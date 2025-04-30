import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styled from 'styled-components';
import Link from 'next/link';

const Main = styled.main`
  padding: 4rem 2rem;
  text-align: center;
`;

const CTA = styled.a`
  display: inline-block;
  margin: 1rem;
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 0.5rem;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

export default function Home() {
  return (
    <>
      <Navbar />
      <Main>
        <h1>Welcome to PPAP</h1>
        <p>Donate crypto or NFTs to verified causes anonymously.</p>

        <Link href="/deploy" passHref legacyBehavior>
          <CTA>Deploy Contract</CTA>
        </Link>
        <Link href="/causes" passHref legacyBehavior>
          <CTA>Explore Causes</CTA>
        </Link>
      </Main>
      <Footer />
    </>
  );
}
