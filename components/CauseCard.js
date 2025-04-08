import styled from 'styled-components';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.bold};
`;

const Description = styled.p`
  margin: 1rem 0;
`;

const DonateButton = styled.button`
  background: ${({ theme }) => theme.colors.secondary};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    opacity: 0.9;
  }
`;

export default function CauseCard({ title, description }) {
  return (
    <Card>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <DonateButton>Donate</DonateButton>
    </Card>
  );
}