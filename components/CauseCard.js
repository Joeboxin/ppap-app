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
  transition: box-shadow 0.2s, transform 0.2s;
  &:hover {
    box-shadow: 0 8px 24px rgba(134, 19, 136, 0.15);
    transform: translateY(-4px) scale(1.02);
  }
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
  transition: background 0.2s, color 0.2s;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
`;


export default function CauseCard({ address, title, description, image }) {
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
      {image && <Image src={image} alt={title} />}
      <Title>{title}</Title>
      <Desc>{description}</Desc>
      <Button onClick={handleDonate} disabled={loading}>
        {user ? (loading ? 'Processing…' : 'Donate') : 'Connect Wallet'}
      </Button>
    </Card>
  );
}
