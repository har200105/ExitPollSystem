import { useState, useEffect } from "react";
import "./Candidates.css";
import VoterNavbar from "../../components/VoterNavbar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ethers } from "ethers";
import { contractAddressValue } from "../../constants/constants";
import electionAbi from "../../Contracts/Election.json";
import { useSelector } from "react-redux";
import AdminNavbar from "../../components/AdminNavbar";


const Candidates = () => {

  const navigate = useNavigate();
  const { isAdmin } = useSelector((state) => state.user);
  const [Renderd, setRenderd] = useState(true);
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

    setNoCandidates(parseInt(candidateCount));
    setCandidates(data);
    } catch (e) {
      console.log("Error");
      console.log(e);
   }
  };


  useEffect(() => {
      getCandidatesDataFromBlockchain();
  }, []);

  return (
    <>
      {Renderd && (
        <>
          <ToastContainer theme="colored" />
         {isAdmin ? <AdminNavbar/> : <VoterNavbar/>}
          {noCandidates == 0 ? (
            <>
              <div className="AdminvotingAreaConatiner">
                <div className="AdminvotingAreaMain">
                  <h1>Candidates</h1>
                  <div className="Admincandidates">
                    {Candidates.map((can) => {
                      return (
                        <div
                          className="AdmincandidateBox"
                          key={can.candidate_id}
                        >
                          <div className="acandidateImg">
                            <img
                              src={`/uploads/${can.candidate_imageName}`}
                              alt="img"
                            />
                          </div>
                          <div className="acandidateName">
                            <h2>Name : ascsafaf</h2>
                            <h2>Party : afafaf</h2>
                            <h2>Age : sfasfaf</h2>
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
              <div className="noCandidatesMian">
                <h1>No Candidates !!</h1>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Candidates;
