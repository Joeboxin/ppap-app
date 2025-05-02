import React, { createContext, useContext } from "react";
import {
  useConnect,
  useAddress,
  useContract,
  useContractWrite,
  metamaskWallet,
  useSDK,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { CHARITY_MANAGER_ADDRESS } from "../constants/contractInfo";
import ABI from "../constants/CharityManagerABI.json";


const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  
  const connect = useConnect();
  const connectWithMetamask = () => connect(metamaskWallet());

  const address = useAddress();
  const sdk = useSDK();
  const { contract, isLoading: isContractLoading } = useContract(CHARITY_MANAGER_ADDRESS, ABI);
  const { mutateAsync: addCharityContract } = useContractWrite(contract, "addCharity");
  const { mutateAsync: donateWrite } = useContractWrite(contract, "donate");
  console.log("Contract loaded?", !!contract, "Loading:", isContractLoading);

  const createCharity = async (name, description, wallet) => {
    if (!contract) throw new Error("Contract not loaded");
    const tx = await contract.call("createCharity", [name, description, wallet]);
    await tx.wait();
  };

  const donateTo = async (charityId, amount) => {
    if (!contract) throw new Error("Contract not loaded");
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      throw new Error("Invalid donation amount");
    }
  
    const value = ethers.utils.parseEther(amount.toString());
    console.log("Sending donation to:", charityId, "amount:", value.toString());
  
    try {
      const tx = await donateWrite({
        args: [charityId],
        overrides: { value },
      });
  
      await tx.wait?.(); // if tx is not undefined
      console.log("Donation successful");
    } catch (err) {
      console.error("Donation failed:", err);
      throw err;
    }
  };
  
  
  

  const addCharity = async (charityAddr) => {
    if (!contract) throw new Error("Contract not loaded");
    return await addCharityContract({ args: [charityAddr] });
  };

  const getAllCharities = async () => {
    if (isContractLoading || !contract) throw new Error("Contract not loaded");
    const count = await contract.call("charityCount");
    const list = [];

    for (let i = 0; i < count; i++) {
      const c = await contract.call("charities", [i]);
      list.push({
        id: i,
        name: c.name,
        description: c.description,
        wallet: c.wallet,
        logoUrl: c.logoUrl,
        totalDonations: c.totalDonations,
        donationCount: c.donationCount,
        highestDonation: c.highestDonation,
        isActive: c.isActive,
      });      
    }

    return list;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        connect: connectWithMetamask,
        createCharity,
        donateTo,
        addCharity,
        getAllCharities,
        contract,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);