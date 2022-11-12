import { useEffect, useState } from "react";
import VoterNavbar from "../../components/VoterNavbar";
import AdminNavbar  from "../../components/AdminNavbar";
import "./Result.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ethers } from "ethers";
import electionAbi from "../../Contracts/Election.json";
import { contractAddressValue } from "../../constants/constants";
import { useSelector } from "react-redux";
import { API } from "../../constants/api";
const contractAddress = contractAddressValue;

const Result = () => {
  const navigate = useNavigate();
  const [Renderd, setRenderd] = useState(true);
  const [winnerHeading, setwinnerHeading] = useState("Election Winner is");
  const [PhaseOfElection, setPhaseOfElection] = useState(198);
  const [resultCandidates, setResultCandidates] = useState([]);
  const [winnerDetails, setwinnerDetails] = useState([]);

  const { isAdmin } = useSelector((state) => state.user);

  const getCandidatesDataFromBlockchain = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const ElectionContarct = new ethers.Contract(
      contractAddress,
      electionAbi,
      provider
    );
    const signer = provider.getSigner();

    const phaseStatus = await ElectionContarct.ElectionPhase();
    setPhaseOfElection(phaseStatus);

    if (phaseStatus === 2) {
      const resultList = await ElectionContarct.connect(
        signer
      ).getUpdatedCandidateList();
      console.log(resultList);

      const winnerId = await ElectionContarct.getWinner();
      const winnerDetails = await ElectionContarct.candidates(winnerId);

      const ans = [...resultList];
     
      ans.sort((a, b) => {
        return parseInt(a.partyVotes) < parseInt(b.partyVotes)
          ? 1
          : -1;
      });

      setwinnerDetails(winnerDetails);
      setResultCandidates(ans);
      console.log(ans);
    }
  };

  const getCandidatesData = async () => {
    const response = await API.get("/api/resultparties");

    const data = response.data;
    if (response.status === 200) {
      setRenderd(true);
      getCandidatesDataFromBlockchain();
      if (data[0].TotalVotes === data[1].TotalVotes) {
        setwinnerHeading("Election Is Draw");
      }
    } else if (response.status === 401) {
      navigate("/login");
      setTimeout(function () {
        toast.error("Please Login First", {
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
      }, 1000);
    } else {
      setRenderd(true);
    }
  };
  useEffect(() => {
      getCandidatesData();
  }, []);

  var CandidatePostionId = 1;
  return (
    <>
         {isAdmin ? <AdminNavbar/> : <VoterNavbar />}
          <ToastContainer theme="colored" />
          {PhaseOfElection === 2 ? (
            <>
              {resultCandidates.length !== 0 ? (
                <>
                  <div className="resultConatiner">
                    <div className="resultMain">
                      {resultCandidates[0] && (
                        <div className="renderCondition">
                          <h1>Result Area</h1>
                          <div className="winnerInfo">
                            <div className="winnerImg">
                              <img
                                src={`/uploads/${winnerDetails.partyImage}`}
                                alt="winner"
                              />
                            </div>
                            <div className="winnerName">
                              <h3 id="winnerHead">
                                <span id="PopperDiv">
                                {winnerHeading} {winnerDetails?.partyName}
                                </span>
                              </h3>
                              <h2>
                                Party : {winnerDetails.partyName}
                              </h2>
                              <h2>
                               
                                Total Votes :
                                {parseInt(winnerDetails.partyVotes)}
                              </h2>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="runnerUpTableConatiner">
                        <table className="runnerUpTable">
                          <thead className="table-heading">
                            <tr>
                              <th>Position</th>
                              <th>Name</th>
                              <th>Votes</th>
                            </tr>
                          </thead>

                          <tbody className="runnerUpTableBody">
                            {resultCandidates.map((can) => {
                              return (
                                <tr key={can.candidate_id}>
                                  <td>{CandidatePostionId++}</td>
                                  <td>{can.partyName}</td>
                                  <td>{parseInt(can.partyVotes)}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="ResultWait">
                    <h1>Wait For Result ...</h1>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div className="StatusOfResultVote">
                <h1>Currently Election Result Is Not Declared !!</h1>
              </div>
            </>
          )}
        </>
  );
};

export default Result;
