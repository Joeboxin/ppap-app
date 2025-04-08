import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DonateForm from '../components/DonateForm';

export default function Donate() {
  return (
    <>
      <Navbar />
      <div style={{ padding: '2rem' }}>
        <h1>Donate</h1>
        <p>Choose a cause and donate using crypto or NFTs.</p>
        <DonateForm />
      </div>
      <Footer />
    </>
  );
}