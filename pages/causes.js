import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CauseCard from '../components/CauseCard';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useStateContext } from '../context/StateContext';

const Grid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  padding: 2rem;
`;

const Form = styled.form`
  max-width: 400px;
  margin: 2rem auto;
  padding: 1.5rem;
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
  transition: background 0.2s, color 0.2s;
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export default function Causes() {
  const { address, connect, deployCharity, getAllCharities } = useStateContext();
  const [causes, setCauses] = useState([]);
  const [form, setForm] = useState({ address: '', title: '', description: '', image: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllCharities();
        console.log('Fetched causes:', data);
        setCauses(data);
      } catch (err) {
        console.warn("Contract not ready yet:", err.message);
      }
    };
    load();
  }, [getAllCharities]);
  

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address) return connect();
    setLoading(true);
    try {
      await deployCharity(form.title, form.description, form.address);
      await fetch('/api/causes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setCauses([...causes, { ...form }]);
      setForm({ address: '', title: '', description: '', image: '' });
      alert('Charity added!');
    } catch (err) {
      alert('Error adding charity: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <Form onSubmit={handleSubmit}>
        <h2>Add a New Cause</h2>
        <Input
          name="address"
          type="text"
          placeholder="Charity Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <Input
          name="title"
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <Input
          name="description"
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <Input
          name="image"
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Cause'}
        </Button>
      </Form>
      <Grid>
      {causes.map((c) => (
        <CauseCard
  key={c.wallet || c.id}
  id={c.id}
  title={c.name}
  address={c.wallet}
  description={c.description}
  image={c.logoUrl || c.image}
  totalDonations={c.totalDonations}
  donationCount={c.donationCount}
  highestDonation={c.highestDonation}
/>

    ))}
      </Grid>
      <Footer />
    </>
  );
}