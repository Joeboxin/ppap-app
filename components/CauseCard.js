import React, { useState } from "react";
import styled from "styled-components";
import { useStateContext } from "../context/StateContext";

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1rem;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const Stats = styled.div`
  margin-top: 1rem;
  background: #f9f9f9;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
`;

const Toggle = styled.button`
  margin-top: 0.75rem;
  padding: 0.4rem 0.75rem;
  background: #eee;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
`;

export default function CauseCard({
  id,
  title,
  description,
  image,
  address,
  totalDonations = "0",
  numberOfDonations = 0,
  highestDonation = "0"
}) {
  const { donateTo } = useStateContext();
  const [donationAmount, setDonationAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const handleDonate = async () => {
    if (!donationAmount || isNaN(donationAmount) || Number(donationAmount) <= 0) {
      return alert("Please enter a valid donation amount");
    }

    setLoading(true);
    try {
      await donateTo(id, donationAmount);
      alert(`Thank you for donating ${donationAmount} tBNB to ${title}`);
      setDonationAmount("");
    } catch (err) {
      alert("Donation failed: " + err.message);
    }
    setLoading(false);
  };

  return (
    <Card>
      <img src={image} alt={title} style={{ width: "100%", borderRadius: "10px" }} />
      <h3>{title}</h3>
      <p>{description}</p>

      <input
        type="number"
        placeholder="Amount in tBNB"
        value={donationAmount}
        onChange={(e) => setDonationAmount(e.target.value)}
        disabled={loading}
        style={{ padding: "0.5rem", marginTop: "0.5rem", width: "100%" }}
      />

      <button
        onClick={handleDonate}
        disabled={loading}
        style={{
          marginTop: "0.5rem",
          padding: "0.5rem",
          width: "100%",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "6px"
        }}
      >
        {loading ? "Donating..." : "Donate"}
      </button>

      <Toggle onClick={() => setShowStats((s) => !s)}>
        {showStats ? "Hide Stats" : "Show Donation Stats"}
      </Toggle>

      {showStats && (
        <Stats>
          <div><strong>Total Donated:</strong> {Number(totalDonations).toFixed(4)} tBNB</div>
          <div><strong># of Donations:</strong> {numberOfDonations}</div>
          <div><strong>Highest Donation:</strong> {Number(highestDonation).toFixed(4)} tBNB</div>
        </Stats>
      )}
    </Card>
  );
}
