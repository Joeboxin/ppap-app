import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CauseCard from '../../components/CauseCard';

const mockCauses = [
  { title: 'Clean Water for All', description: 'Providing clean drinking water in remote villages.' },
  { title: 'Education for Every Child', description: 'Support underprivileged children with education supplies.' },
];

export default function Causes() {
  return (
    <>
      <Navbar />
      <div style={{ padding: '2rem' }}>
        <h1>Causes</h1>
        <p>Explore causes and help make a difference.</p>
        {mockCauses.map((cause, index) => (
          <CauseCard key={index} title={cause.title} description={cause.description} />
        ))}
      </div>
      <Footer />
    </>
  );
}