import styled from 'styled-components';
import { useState } from 'react';
import { useStateContext } from '../context/StateContext';

const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.card};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Button = styled.button`
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default function DonateForm() {
  const { address, connect, contractAddr, donateTo } = useStateContext();
  const [charity, setCharity] = useState('');
  const [amount, setAmount]   = useState('');
  const [busy, setBusy]       = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!address) return connect();
    if (!contractAddr) {
      alert('Contract not deployed yet!');
      return;
    }
    setBusy(true);
    try {
      await donateTo(charity, amount);
      alert(`Thanks for donating Ξ${amount}!`);
      setCharity('');
      setAmount('');
    } catch (err) {
      console.error(err);
      alert('Error: ' + err.message);
    }
    setBusy(false);
  };

  return (
    <Form onSubmit={onSubmit}>
      {!address && (
        <Button type="button" onClick={connect}>
          Connect Wallet
        </Button>
      )}
      <Input
        type="text"
        placeholder="Charity address"
        value={charity}
        onChange={(e) => setCharity(e.target.value)}
        required
      />
      <Input
        type="number"
        step="0.001"
        placeholder="Amount in tBNB"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <Button type="submit" disabled={busy || !charity || !amount}>
        {busy ? 'Sending…' : 'Donate'}
      </Button>
    </Form>
  );
}
