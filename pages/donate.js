import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styled from 'styled-components';
import { useStateContext } from '../context/StateContext';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  padding: 4rem 2rem;
`;

const Section = styled.section`
  max-width: 1000px;
  margin: 0 auto 2rem auto;
  text-align: center;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const Paragraph = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #555;
  max-width: 800px;
  margin: 0 auto 1.5rem auto;
`;

const BulletList = styled.ul`
  list-style: disc inside;
  max-width: 700px;
  margin: 0 auto 2rem auto;
  color: #444;
  text-align: left;
  font-size: 1.1rem;
  line-height: 1.7;
`;

const ConnectButton = styled.button`
  margin-top: 1rem;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;
const Card = styled.div`
  padding: 2rem 1.25rem; /* reduced vertical & horizontal padding */
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease;
  margin-bottom: 2rem; /* optional: add space between cards */

  &:hover {
    transform: translateY(-3px);
  }

  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1rem;
  }
`;

export default function DonatePage() {
  const { address, connect } = useStateContext();

  return (
    <Container>
      <Navbar />
      <Main>
        
        <Section>
        <Card>
          <Title>Who We Are</Title>
          <Paragraph>
            <strong>PPAP</strong> is a decentralized peer-to-peer aid platform that empowers donors to support verified causes using cryptocurrency.
          </Paragraph>
          </Card>
        </Section>
        
        <Section>
        <Card>
          <Title>What We Do</Title>
          <Paragraph>
            We eliminate intermediaries and use blockchain technology to create a transparent, impactful giving experience.
          </Paragraph>
        </Card>
        </Section>
          
        <Section>
        <Card>
          <Title>How We Support Charities</Title>
          <BulletList>
            <li>Causes must be verified and approved by the platform owner.</li>
            <li>All donations are tracked and visible on-chain.</li>
            <li>Donations are fast, secure, and anonymous via smart contracts.</li>
          </BulletList>
        </Card> 
        </Section>
        <Section>
        <Card>
          <Title>Get Involved</Title>
          <Paragraph>
            Connect your wallet to browse causes, donate securely, and track your impact—all from one place.
          </Paragraph>

          {!address && (
            <ConnectButton onClick={connect}>
              Connect Wallet
            </ConnectButton>
          )}
        </Card>
        </Section>
      </Main>
      <Footer />
    </Container>
  );
}
