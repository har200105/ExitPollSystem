import { useState, useEffect } from "react";
import "./Voting.css";
import VoterNavbar from "../../components/VoterNavbar";
import { ToastContainer, toast } from "react-toastify";
import { ethers } from "ethers";
import electionAbi from "../../Contracts/Election.json";
import { API } from "../../constants/api";
import { contractAddressValue } from "../../constants/constants";
import { useSelector } from "react-redux";
const contractAddress = contractAddressValue;

const VotingArea = () => {
  const [candidateCount, setCandidateCount] = useState(0);
  const [Candidates, setCandidates] = useState([]);
  const [PhaseOfElec, setPhaseOfElec] = useState(198);
  const { user } = useSelector((state) => state.user);

  const getCandidatesDataFromBlockchain = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const ElectionContract = new ethers.Contract(
      contractAddress,
      electionAbi,
      provider
    );

    const data = await ElectionContract.allCandidates();
    const phase = await ElectionContract.ElectionPhase();
    const CCount = await ElectionContract.candidatesCount();
    setPhaseOfElec(phase);
    setCandidates(data);
    console.log(parseInt(CCount));
    setCandidateCount(parseInt(CCount));
  };

  const countVoteInBlockchain = async (voterId, candidateId) => {
    console.log(voterId);
    console.log(candidateId);
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const ElectionContract = new ethers.Contract(
      contractAddress,
      electionAbi,
      provider
    );
    const signer = provider.getSigner();

    try {
      const tx = await ElectionContract.connect(signer).vote(
        voterId.toString(),
        candidateId.toString()
      );

      console.log(tx);
    } catch (e) {
      console.log(e.toString());
    }
  };

  useEffect(() => {
      getCandidatesDataFromBlockchain();
  }, []);

  const VoteCountFunc = async (e) => {
    try {
      const partyName = e.target.parentNode.parentNode
        .querySelector("#cparty")
        .innerHTML.toString();
      const response = await API.post("/api/countvotes", {
        partyName,
      });

      const data = response.data;

      if (response.status === 201) {
        toast.success(data.msg, {
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

        countVoteInBlockchain(user?.voterId, partyName);
      } else {
        toast.error("Somthing Went Wrong !!", {
          style: {
            fontSize: "18px",
            letterSpacing: "1px",
          },
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (e) {
        toast.error("You have already voted", {
          style: {
            fontSize: "18px",
            letterSpacing: "1px",
          },
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    }
  };

  return (
    <>
        <>
          <VoterNavbar />
          <ToastContainer theme="colored" />
          {PhaseOfElec === 1 ? (
            <>
              {candidateCount != 0 ? (
                <>
                  <div className="votingAreaConatiner">
                    <div className="votingAreaMain">
                      <h1>Candidates</h1>
                      <div className="candidates">
                        {Candidates.map((can) => {
                          return (
                            <div
                              className="candidateBox"
                              key={can.candidate_id}
                            >
                              <img
                                src={`/uploads/${can.partyImage}`}
                                alt="img"
                                id="candidateImg"
                              />
                              <div className="candidateName">
                                <h2>
                                  Party :
                                  <span id="cparty">
                                    {can?.partyName}
                                  </span>
                                </h2>
                              </div>
                              <div className="btnGroupCan">
                                <button
                                  className="voteCandidateBtn"
                                  onClick={VoteCountFunc}
                                >
                                  Vote
                                </button>
                              </div>
                            </div>
                          );
                         })} 
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="ZeroCountCandi">
                    <h1>No Parties Added !!</h1>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              {PhaseOfElec === 2 ? (
                <>
                  <div className="ElectionPhaseMain">
                    <h1> Voting is Over !!</h1>
                  </div>
                </>
              ) : (
                <>
                  <div className="ElectionPhaseMain">
                    <h1>Voting Not Started Yet !!</h1>
                  </div>
                </>
              )}
            </>
          )}
        </>
    </>
  );
};

export default VotingArea;
