import React, { useEffect, useState } from "react";
import "./Welcome.css";
import VoterNavbar from "../../components/VoterNavbar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ethers } from "ethers";

const Welcome = () => {
  
  const navigate = useNavigate();

  const [currentVoter, setCurrentVoter] = useState("");
  const [BtnStateMsg, setBtnStateMsg] = useState("Connect To Metamask");
  const [CurrentAccount, setCurrentAccount] = useState(
    "0x00000000000000000000000000000000"
  );
  const [CurrentAccountBalance, setCurrentAccountBalance] = useState(0.0);

  const connectToMetamask = async (e) => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setCurrentAccount(accounts[0]);
      let balance = await provider.getBalance(accounts[0]);
      balance = ethers.utils.formatEther(balance);
      setCurrentAccountBalance(balance);

      if (accounts && accounts.length > 0) {
        setBtnStateMsg(`Connected To Metamask`);
        if (CurrentAccount === "0x00000000000000000000000000000000") {
          toast.success("Connected To Metamask", {
            style: {
              fontSize: "15px",
              letterSpacing: "1px",
            },
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    } else {
      toast.error("Please Install Metamask", {
        style: {
          fontSize: "15px",
          letterSpacing: "1px",
        },
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleAccountChange = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setCurrentAccount(accounts[0]);
    var balance = await provider.getBalance(accounts[0]);
    balance = ethers.utils.formatEther(balance);
    setCurrentAccountBalance(balance);
    toast.info(`Connected To ${accounts[0]}`, {
      style: {
        fontSize: "13px",
        letterSpacing: "1px",
      },
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChange);
      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountChange);
      };
    }
  });



  return (
    <>
        <VoterNavbar/>
          <div className="welcomeContainer">
            <ToastContainer theme="colored" />
            <div className="topWlcomePart">
              <button
                onClick={connectToMetamask}
                id={
                  BtnStateMsg === "Connect To Metamask"
                    ? "metaBtn"
                    : "connected"
                }
              >
                {BtnStateMsg}
              </button>
            </div>

            <div className="accountDetails">
              <h2> - Account Details</h2>
              <div className="accountAddress">
                <h3>Account Address : {CurrentAccount}</h3>
                <h3>Account Balance : {CurrentAccountBalance} ETH</h3>
              </div>
            </div>
          </div>
        </>
  );
};

export default Welcome;
