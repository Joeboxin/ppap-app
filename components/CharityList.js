import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ethers } from 'ethers';

const Container = styled.div`
  padding: 2rem;
`;

const CauseFilter = styled.div`
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: ${({ active, theme }) => active ? theme.colors.primary : 'transparent'};
  color: ${({ active, theme }) => active ? 'white' : theme.colors.primary};
  border-radius: 0.5rem;
  cursor: pointer;
`;

const CharityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const CharityCard = styled.div`
  border: 1px solid #eee;
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CharityLogo = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 0.5rem;
`;

const DonateButton = styled.button`
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: bold;
`;

const DonationInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #eee;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
`;

export default function CharityList({ contract, account }) {
  const [causes, setCauses] = useState([]);
  const [charities, setCharities] = useState([]);
  const [selectedCause, setSelectedCause] = useState(null);
  const [donationAmounts, setDonationAmounts] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCauses();
    loadCharities();
  }, [contract]);

  const loadCauses = async () => {
    if (!contract) return;
    try {
      const causeCount = await contract.causeCount();
      const causes = [];
      for (let i = 0; i < causeCount; i++) {
        const cause = await contract.getCause(i);
        causes.push({
          id: i,
          name: cause.name,
          description: cause.description,
          charityIds: cause.charityIds
        });
      }
      setCauses(causes);
    } catch (error) {
      console.error('Error loading causes:', error);
    }
  };

  const loadCharities = async () => {
    if (!contract) return;
    try {
      const charityCount = await contract.charityCount();
      const charities = [];
      for (let i = 0; i < charityCount; i++) {
        const charity = await contract.getCharity(i);
        charities.push({
          id: i,
          name: charity.name,
          description: charity.description,
          website: charity.website,
          logoUrl: charity.logoUrl,
          totalDonations: charity.totalDonations,
          causeIds: charity.causeIds,
          isActive: charity.isActive
        });
      }
      setCharities(charities);
    } catch (error) {
      console.error('Error loading charities:', error);
    }
  };

  const handleDonate = async (charityId) => {
    if (!contract || !account) return;
    const amount = donationAmounts[charityId];
    if (!amount || amount <= 0) return;

    setLoading(true);
    try {
      const tx = await contract.donate(charityId, {
        value: ethers.utils.parseEther(amount.toString())
      });
      await tx.wait();
      await loadCharities();
      setDonationAmounts({ ...donationAmounts, [charityId]: '' });
    } catch (error) {
      console.error('Error donating:', error);
    }
    setLoading(false);
  };

  const filteredCharities = selectedCause
    ? charities.filter(charity => charity.causeIds.includes(selectedCause))
    : charities;

  return (
    <Container>
      <CauseFilter>
        <FilterButton
          active={selectedCause === null}
          onClick={() => setSelectedCause(null)}
        >
          All Causes
        </FilterButton>
        {causes.map(cause => (
          <FilterButton
            key={cause.id}
            active={selectedCause === cause.id}
            onClick={() => setSelectedCause(cause.id)}
          >
            {cause.name}
          </FilterButton>
        ))}
      </CauseFilter>

      <CharityGrid>
        {filteredCharities.map(charity => (
          <CharityCard key={charity.id}>
            <CharityLogo src={charity.logoUrl} alt={charity.name} />
            <h3>{charity.name}</h3>
            <p>{charity.description}</p>
            <p>Total Donations: {ethers.utils.formatEther(charity.totalDonations)} BNB</p>
            <a href={charity.website} target="_blank" rel="noopener noreferrer">
              Visit Website
            </a>
            {account && (
              <>
                <DonationInput
                  type="number"
                  placeholder="Amount in BNB"
                  value={donationAmounts[charity.id] || ''}
                  onChange={(e) => setDonationAmounts({
                    ...donationAmounts,
                    [charity.id]: e.target.value
                  })}
                />
                <DonateButton
                  onClick={() => handleDonate(charity.id)}
                  disabled={loading}
                >
                  {loading ? 'Donating...' : 'Donate'}
                </DonateButton>
              </>
            )}
          </CharityCard>
        ))}
      </CharityGrid>
    </Container>
  );
} 