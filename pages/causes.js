import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CauseCard from '../components/CauseCard';
import styled from 'styled-components';

const causes = [
  {
    address: '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2',
    title:   'Clean Water Initiative',
    description: 'Bringing safe drinking water to remote villages.',
  },
  {
    address: '0x4B0897b0513fdc7C541B6d9D7E929C4e5364D2dB',
    title:   'Reforestation Project',
    description: 'Planting 10,000 trees across deforested areas.',
  },
  // …add more or fetch dynamically
];

const Grid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  padding: 2rem;
`;

export default function Causes() {
  return (
    <>
      <Navbar />
      <Grid>
        {causes.map((c) => (
          <CauseCard
            key={c.address}
            address={c.address}
            title={c.title}
            description={c.description}
          />
        ))}
      </Grid>
      <Footer />
    </>
  );
}
