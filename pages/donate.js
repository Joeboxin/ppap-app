import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styled from 'styled-components';
import { useStateContext } from '../context/StateContext';

const Main = styled.main`
  padding: 4rem 2rem;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
`;

export default function DonatePage() {
  const { address, connect } = useStateContext();
  return (
    <>
      <Navbar />
      <Main>
        <h1>Who We Are</h1>
        <p>
          <b>PPAP</b> is a decentralized platform empowering anyone to support verified charities using crypto.
        </p>
        <h2>What We Do</h2>
        <p>
          We connect donors and charities transparently, allowing donations in crypto and NFTs, and ensuring all causes are verified on-chain.
        </p>
        <h2>How We Support Charities</h2>
        <p>
          - Anyone can add a new cause (if approved by the contract owner).<br/>
          - All donations are recorded on the blockchain.<br/>
          - We provide a simple, anonymous, and secure way to give.
        </p>
        <h2>Get Involved</h2>
        <p>
          Connect your wallet, explore causes, and make a difference today!
        </p>
      
        {!address && (
          <p>
            <button onClick={connect} style={{
              background: '#2563eb',
              color: 'white',
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '1rem'
            }}>
              Connect Wallet
            </button>
          </p>
        )}

      </Main>
      <Footer />
    </>
  );
}