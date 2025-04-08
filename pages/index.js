import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styled from 'styled-components';

export default function Home() {
  return (
    <>
      <Navbar />
      <Main>
        <h1>Welcome to PPAP</h1>
        <p>Donate crypto or NFTs to causes anonymously. Be the change you want to see.</p>
      </Main>
      <Footer />
    </>
  );
}

const Main = styled.main`
  padding: 4rem 2rem;
  text-align: center;
`;