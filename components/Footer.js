import styled from 'styled-components';

const Foot = styled.footer`
  text-align: center;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.text};
`;

export default function Footer() {
  return <Foot>© 2025 PPAP. All rights reserved.</Foot>;
}