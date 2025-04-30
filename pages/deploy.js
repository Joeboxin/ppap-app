import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styled from 'styled-components';
import { useState } from 'react';
import { useStateContext } from '../context/StateContext';

const Main = styled.main`
  padding: 4rem 2rem;
  text-align: center;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default function DeployPage() {
  const { address, connect, deployCharity, contractAddr } = useStateContext();
  const [loading, setLoading] = useState(false);

  const handleDeploy = async () => {
    if (!address) return connect();
    setLoading(true);
    try {
      const addr = await deployCharity([
        '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2',
        '0x4B0897b0513fdc7C541B6d9D7E929C4e5364D2dB',
      ]);
      alert('Contract deployed at ' + addr);
    } catch (e) {
      console.error(e);
      alert('Deploy failed: ' + e.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <Main>
        <h1>Deploy Charity Contract</h1>
        {contractAddr ? (
          <p>
            ✅ Already deployed at <code>{contractAddr}</code>
          </p>
        ) : (
          <Button onClick={handleDeploy} disabled={loading}>
            {loading ? 'Deploying…' : 'Deploy Contract'}
          </Button>
        )}
      </Main>
      <Footer />
    </>
  );
}
