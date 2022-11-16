import { useState, useEffect } from "react";
import "./Candidates.css";
import VoterNavbar from "../../components/VoterNavbar";
import { ToastContainer } from "react-toastify";
import { ethers } from "ethers";
import { contractAddressValue } from "../../constants/constants";
import electionAbi from "../../Contracts/Election.json";
import { useSelector } from "react-redux";
import AdminNavbar from "../../components/AdminNavbar";


const Candidates = () => {

  const { isAdmin } = useSelector((state) => state.user);
  const [Candidates, setCandidates] = useState([]);
  const [noCandidates, setNoCandidates] = useState(0);

  const getCandidatesDataFromBlockchain = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const ElectionContarct = new ethers.Contract(
      contractAddressValue,
      electionAbi,
      provider
    );
      console.log(`Election Contract`);
      console.log(ElectionContarct);

    const data = await ElectionContarct.allCandidates();
      const candidateCount = await ElectionContarct.candidatesCount();
      console.log(`Candidate Count`);
      console.log(parseInt(candidateCount));

    setNoCandidates(parseInt(candidateCount));
    setCandidates(data);
    } catch (error) {
      console.log("Error");
      console.log(error);
   }
  };


  useEffect(() => {
      getCandidatesDataFromBlockchain();
  }, []);

  return (
    <>
          <ToastContainer theme="colored" />
         {isAdmin ? <AdminNavbar/> : <VoterNavbar/>}
          {noCandidates != 0 ? (
            <>
              <div className="AdminvotingAreaConatiner">
                <div className="AdminvotingAreaMain">
                  <h1>Parties</h1>
                  <div className="Admincandidates">
                    {Candidates.map((can) => {
                      return (
                        <div
                          className="AdmincandidateBox"
                          key={can.candidate_id}
                        >
                          <div className="acandidateImg">
                            <img
                              src={`/uploads/${can.partyImage}`}
                              alt="img"
                            />
                          </div>
                          <div className="acandidateName">
                            <h2>Party : {can.partyName}</h2>
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
              <div className="noCandidatesMain">
                <h1>No Parties !!</h1>
              </div>
            </>
          )}
        </>
  );
};

export default Candidates;
