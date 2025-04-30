import styled from 'styled-components';
import { useState } from 'react';
import { useStateContext } from '../context/StateContext';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.card};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const Desc = styled.p`
  flex-grow: 1;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default function CauseCard({ address, title, description }) {
  const { address: user, connect, donateTo } = useStateContext();
  const [loading, setLoading] = useState(false);

  const handleDonate = async () => {
    if (!user) return connect();
    const amt = prompt(`Enter tBNB amount to donate to "${title}"`);
    if (!amt) return;
    setLoading(true);
    try {
      await donateTo(address, amt);
      alert(`Thank you for donating Ξ${amt}!`);
    } catch (e) {
      console.error(e);
      alert('Donation failed: ' + e.message);
    }
    setLoading(false);
  };

  return (
    <Card>
      <Title>{title}</Title>
      <Desc>{description}</Desc>
      <Button onClick={handleDonate} disabled={loading}>
        {user ? (loading ? 'Processing…' : 'Donate') : 'Connect Wallet'}
      </Button>
    </Card>
  );
}
