import { useStateContext } from '../context/StateContext';
import CharityList from '../components/CharityList';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HeroSection = styled.section`
  padding: 6rem 2rem;
  text-align: center;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.secondary} 100%);
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.1;
  }

  h1 {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    font-weight: 800;
    line-height: 1.2;
  }

  p {
    font-size: 1.4rem;
    max-width: 800px;
    margin: 0 auto 2rem auto;
    line-height: 1.6;
  }
`;

const ConnectButton = styled.button`
  margin-top: 1.5rem;
  padding: 1rem 2rem;
  background: white;
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 12px;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    background: ${({ theme }) => theme.colors.secondary};
    color: white;
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 4rem 2rem;
`;

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto 6rem;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;
    color: #666;
    max-width: 800px;
    margin: 0 auto;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const FeatureCard = styled.div`
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1rem;
  }
`;


const HowItWorks = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const Step = styled.div`
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;

  &::before {
    content: '${props => props.number}';
    position: absolute;
    top: -1.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 3rem;
    height: 3rem;
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }

  h3 {
    margin-top: 1rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CallToAction = styled.a`
  display: inline-block;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 12px;
  font-weight: bold;
  text-decoration: none;
  margin-top: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

export default function Home() {
  const { address, connect } = useStateContext();

  return (
    <Container>
      <Navbar />
      <HeroSection>
        <h1>Peer-to-Peer Aid Platform</h1>
        <p>
          Revolutionizing charitable giving through blockchain technology. Connect directly with causes you care about, track your impact, and make a difference with complete transparency.
        </p>
        {!address && (
          <ConnectButton onClick={connect}>
            Connect Wallet
          </ConnectButton>
        )}
        {address && (
          <p>Connected as: <strong>{address.slice(0, 6)}...{address.slice(-4)}</strong></p>
        )}
        
      </HeroSection>

      <Main>
        <Section>
          <h2>Why Choose PPAP?</h2>
          <FeaturesGrid>
            <FeatureCard>
              <h3>Complete Transparency</h3>
              <p>Every donation is recorded on the blockchain, ensuring full traceability and accountability.</p>
            </FeatureCard>
            <FeatureCard>
              <h3>Direct Impact</h3>
              <p>Connect directly with causes you care about, with no intermediaries taking a cut.</p>
            </FeatureCard>
            <FeatureCard>
              <h3>Smart Contracts</h3>
              <p>Automated, secure transactions that ensure your donations reach their intended recipients.</p>
            </FeatureCard>
          </FeaturesGrid>
        </Section>


        <Section>
          <h2>How It Works</h2>
          <img src="/laptop-money.webp" alt="Peer-to-Peer Aid Platform" />
          <HowItWorks>
            <Step number="1">
              <h3>Connect Your Wallet</h3>
              <p>Link your crypto wallet to start making donations</p>
            </Step>
            <Step number="2">
              <h3>Browse Causes</h3>
              <p>Explore verified charitable causes and initiatives</p>
            </Step>
            <Step number="3">
              <h3>Make a Donation</h3>
              <p>Contribute directly to causes you believe in</p>
            </Step>
            <Step number="4">
              <h3>Track Impact</h3>
              <p>Monitor how your donations are making a difference</p>
            </Step>
          </HowItWorks>
        </Section>

        <Section>
          <h2>Ready to Make a Difference?</h2>
          <p>Join our community of donors and start making an impact today.</p>
          <CallToAction href="/causes">Get Started</CallToAction>
        </Section>
      </Main>
      <Footer />
    </Container>
  );
}
