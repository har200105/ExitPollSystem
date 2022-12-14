import { useEffect, useState } from "react";
import "./AdminWelcome.css";
import { ToastContainer, toast, Flip } from "react-toastify";
import { ethers } from "ethers";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminNavbar from "../../../components/AdminNavbar";
import { myAccount } from "../../../constants/constants";

const AdminWelcome = () => {
  const [BtnStateMsg, setBtnStateMsg] = useState("Connect To Metamask");
  const [CurrentAccount, setCurrentAccount] = useState(
    "0x00000000000000000000000000000000"
  );
  const [CurrentAccountBalance, setCurrentAccountBalance] = useState(0.0);
  const [OnlyOwner, setOnlyOwner] = useState(false);

  const connectToMetamask = async (e) => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setCurrentAccount(accounts[0]);
      var balance = await provider.getBalance(accounts[0]);
      balance = ethers.utils.formatEther(balance);
      setCurrentAccountBalance(balance);
      if (
        accounts[0].toString() == myAccount
      ) {
        setOnlyOwner(true);
      } else {
        setOnlyOwner(false);
      }

      if (accounts.length > 0) {
        setBtnStateMsg("Connected To Metamask");
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
    if (
      accounts[0].toString() == myAccount
    ) {
      setOnlyOwner(true);
    } else {
      setOnlyOwner(false);
    }
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
  },[]);

  return (
    <>
      <AdminNavbar/>
          <div className="AinformationMain">
            <ToastContainer theme="colored" />
            <div className="AtopWlcomePart">
              <button
                onClick={connectToMetamask}
                id={
                  BtnStateMsg === "Connect To Metamask"
                    ? "ametaBtn"
                    : "aconnected"
                }
              >
                {BtnStateMsg}
              </button>
            </div>
            <div className="AccountDetails">
              <h2> - Account Details</h2>
              <div className="AccountAddress">
                <h3>Account Address : {CurrentAccount}</h3>
                <h3>Account Balance : {CurrentAccountBalance} ETH</h3>
              </div>
            </div>

            <div className="adminPower">
              <h2> - Admin Access</h2>
              <div className="addCandidate">
                {OnlyOwner ? (
                  <>
                    <NavLink to="/add-candidates" id="addCanBtn">
                  <i className="fa-solid fa-circle-plus">
                  </i>Add New Party
                    </NavLink>
                    <NavLink to="/change-phase" id="phaseBtn">
                      <i className="fa-solid fa-file-pen"></i>Change Phase
                    </NavLink>
                  </>
                ) : (
                  <h3>You Dont Have Permission rmTo Add New Party !!</h3>
                )}
              </div>
            </div>
          </div>
        </>
  );
}

export default AdminWelcome;
