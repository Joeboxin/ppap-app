import React, { createContext, useContext, useState } from "react";
import {
  useConnect,
  useAddress,
  useContract,
  useContractWrite,
  useSDK,
} from "@thirdweb-dev/react";
import artifact from "../artifacts/contracts/CharityDonations.sol/CharityDonations.json";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const connect = useConnect();
  const address = useAddress();
  const sdk     = useSDK();
  const [contractAddr, setContractAddr] = useState("");

  // Load the deployed contract (once contractAddr is set)
  const { contract } = useContract(contractAddr);
  const { mutateAsync: donateContract } = useContractWrite(contract, "donate");

  // 1) Deploy function
  const deployCharity = async (initialList) => {
    if (!address) {
      await connect();
    }
    if (!sdk) {
      throw new Error("SDK not ready yet");
    }

    const deployment = await sdk.deployer.deployContract({
      abi:      artifact.abi,
      bytecode: artifact.bytecode,
      args:     [initialList],
    });

    const newAddr = deployment.receipt.contractAddress;
    setContractAddr(newAddr);
    return newAddr;
  };

  // 2) Donate function
  const donateTo = async (charity, amount) => {
    if (!contract) {
      throw new Error("Contract not loaded");
    }
    return await donateContract({
      args:      [charity],
      overrides: { value: ethers.utils.parseEther(amount) },
    });
  };

  return (
    <StateContext.Provider
      value={{
        address,
        connect,
        contractAddr,
        deployCharity,
        donateTo,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
