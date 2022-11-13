import { useState, useEffect } from "react";
import "./ChangePhase.css";
import { ToastContainer, toast } from "react-toastify";
import { ethers } from "ethers";
import { contractAddressValue, myAccount } from "../../../constants/constants";
import { useNavigate } from "react-router-dom";
import electionAbi from "../../../Contracts/Election.json";
import AdminNavbar from "../../../components/AdminNavbar";
import { API } from "../../../constants/api";


const ChangePhase = () => {

  const navigate = useNavigate();
  const [currPhase, setcurrPhase] = useState("Registration");
  const [nextPhase, setNextPhase] = useState("Change Phase To Voting");
  const [electionState, setElectionState] = useState(-1);

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const ElectionContract = new ethers.Contract(
    contractAddressValue,
    electionAbi,
    provider
  );


  const signer = provider.getSigner();

  const retriveElectionResult = async () => {
    const datax = await ElectionContract.connect(
      signer
    ).addCandidateToResultList();
    console.log(datax);
    await checkState();
  };

  const resetAll = async () => {
    await ElectionContract.connect(signer).resetElection();
    await checkState();
    const response = await API.put('/resetUserIsVote');
    console.log(`Reset Response`);
    console.log(response.data);
  };

  const checkOwner = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        if (
          accounts[0].toString() != myAccount
        ) {
          navigate("/admin-welcome");
        }
      } catch (e) {
        navigate("/admin-welcome");
      }
    } else {
      navigate("/admin-welcome");
    }
  };

  const checkState = async () => {
    const StateOfCon = await ElectionContract.ElectionPhase();
    console.log(StateOfCon);
    setElectionState(StateOfCon);

    if (StateOfCon === 0) {
      setcurrPhase("Registration");
      setNextPhase("Change Phase To Voting");
    } else if (StateOfCon === 1) {
      setcurrPhase("Voting");
      setNextPhase("Change Phase To Result");
    } else if (StateOfCon === 2) {
      setcurrPhase("Result");
      setNextPhase("Change Phase To Reset All");
    } else if (StateOfCon === 3) {
      setcurrPhase("Reset All");
      setNextPhase("Change Phase To Registration");
    }
  }


  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", checkOwner);
      checkState();
      return () => {
        window.ethereum.removeListener("accountsChanged", checkOwner);
        checkState();
      };
    }
  },[]);

  const changePhaseFunc = async () => {

    const StateOfCon = await ElectionContract.ElectionPhase();
    if (StateOfCon === 0) {
      try {
        await ElectionContract.connect(signer).changeState(1);
        await checkState();
      } catch (e) {
        if (e.message.indexOf("user rejected transaction") > -1) {
          toast.error("Transaction Rejected", {
            style: {
              fontSize: "15px",
              letterSpacing: "1px",
            },
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error("Somthing went wrong !!", {
            style: {
              fontSize: "15px",
              letterSpacing: "1px",
            },
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
      }
    } else if (StateOfCon === 1) {
      try {
        await ElectionContract.connect(signer).changeState(2);
        await checkState();
      } catch (e) {
        if (e.message.indexOf("user rejected transaction") > -1) {
          toast.error("Transaction Rejected", {
            style: {
              fontSize: "15px",
              letterSpacing: "1px",
            },
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error("Somthing went wrong !!", {
            style: {
              fontSize: "15px",
              letterSpacing: "1px",
            },
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
      }
    } else if (StateOfCon === 2) {
      try {
        console.log("done");
        const tx = await ElectionContract.connect(signer).changeState(3);
        await checkState();
        console.log(tx);
        console.log(StateOfCon);
      } catch (e) {
        if (e.message.indexOf("user rejected transaction") > -1) {
          toast.error("Transaction Rejected", {
            style: {
              fontSize: "15px",
              letterSpacing: "1px",
            },
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error("Somthing went wrong !!", {
            style: {
              fontSize: "15px",
              letterSpacing: "1px",
            },
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
      }
    } else if (StateOfCon === 3) {
      try {
        console.log("done");
        const txs = await ElectionContract.connect(signer).changeState(0);
        console.log(txs);
        await checkState();
        console.log(StateOfCon);
      } catch (e) {
        if (e.message.indexOf("user rejected transaction") > -1) {
          toast.error("Transaction Rejected", {
            style: {
              fontSize: "15px",
              letterSpacing: "1px",
            },
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error("Somthing went wrong !!", {
            style: {
              fontSize: "15px",
              letterSpacing: "1px",
            },
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
      }
    }
  };

  return (
    <>
      <AdminNavbar />
      <ToastContainer theme="colored" />
      <div className="phaseContainer">
        <div className="mainPhase">
          <h1>Change Phase Of Election</h1>
          <div className="phaseInfo">
            <h2>Current Phase : {currPhase}</h2>
            <button className="phaseBtnChng" onClick={changePhaseFunc}>
              {nextPhase}
            </button>

            {electionState === 2 && (
              <>
                <button
                  onClick={retriveElectionResult}
                  className="updateResultBtn"
                >
                  Get Result
                </button>
              </>
            )}
            {electionState === 3 && (
              <>
                <button onClick={resetAll} className="updateResultBtn">
                  Reset All
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePhase;
