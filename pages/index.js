import { useStateContext } from '../context/StateContext';
import CharityList from '../components/CharityList';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  padding: 2rem;
  text-align: center;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
`;

const ConnectButton = styled.button`
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: white;
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
`;

export default function Home() {
  return (
    <Container>
      <Navbar />
      <Main>
      </Main>
      <Footer />
    </Container>
  );
}
