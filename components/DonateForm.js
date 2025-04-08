import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.secondary};
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    opacity: 0.9;
  }
`;

export default function DonateForm() {
  return (
    <Form>
      <Input type="text" placeholder="Your wallet address" />
      <Input type="number" placeholder="Amount in ETH" />
      <Button type="submit">Donate</Button>
    </Form>
  );
}