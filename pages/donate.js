import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DonateForm from '../components/DonateForm';
import styled from 'styled-components';

const Main = styled.main`
  padding: 4rem 2rem;
  text-align: center;
`;

export default function DonatePage() {
  return (
    <>
      <Navbar />
      <Main>
        <h1>Donate to a Charity</h1>
        <p>Your contributions make a difference. Donate tBNB securely.</p>
        <DonateForm />
      </Main>
      <Footer />
    </>
  );
}
