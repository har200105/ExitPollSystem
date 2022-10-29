import { useState, useEffect } from "react";
import "./Voters.css";
import VoterNavbar from "../../components/VoterNavbar";
import { ToastContainer, toast, Flip } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import electionAbi from "../../Contracts/Election.json";
import { contractAddressValue } from "../../constants/constants";
import { API } from "../../constants/api";

const contractAddress = contractAddressValue;

const Voters = () => {

  const navigate = useNavigate();
  const [Rendered, setRendered] = useState(true);
  const [TotalVotersCount, setTotalVotersCount] = useState(1);
  const [AllVoterList, setAllVoterList] = useState([]);
  const [voterIdList, setVoterIdList] = useState([]);

  const GetTotalVotersFromBlockchain = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const ElectionContarct = new ethers.Contract(
      contractAddress,
      electionAbi,
      provider
    );

    const TotalVoters = await ElectionContarct.votersCount();
    setTotalVotersCount(parseInt(TotalVoters));

    const voterIdLists = await ElectionContarct.getVoterIdList();
    setVoterIdList(voterIdLists);
  };

  const getAllVotersFromDB = async () => {
    try {
      const response = await API.get("/api/admin/allvoters");
      const data = response.data;
      if (response.status === 200) {
        setRendered(true);
        setAllVoterList(data);
      } else if (response.status === 401) {
        navigate("/admin");
      } else if (response.status === 400) {
        setRendered(true);
        setTotalVotersCount(0);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
      getAllVotersFromDB();
      GetTotalVotersFromBlockchain();
  }, []);

  const IdFindInList = (voterId) => {
    return voterIdList.includes(voterId.toString());
  };
  return (
    <>
      {Rendered && (
        <>
          <VoterNavbar />
          <ToastContainer theme="colored" />
          {TotalVotersCount !== 0 ? (
            <>
              <div className="allVotersContainer">
                <div className="allVotersMain">
                  <h1>Total Voters : {TotalVotersCount}</h1>
                  <div className="voterMainTable">
                    {AllVoterList.map((voter) => {
                      if (voter.voterId) {
                        if (IdFindInList(voter.voterId)) {
                          return (
                            <div className="voterOneBox" key={voter._id}>
                              <h3>
                                Name : {voter.firstname} {voter.lastname}
                              </h3>
                              <h3>Voted : {voter.isVoted ? "Yes" : "No"}</h3>
                              <h3>Age : {voter.age}</h3>
                              <h3>AdharCard Id : {voter.adharCard}</h3>
                              <h3>Voter Id : {voter.voterId}</h3>
                            </div>
                          );
                        }
                      }
                    })}
                    {AllVoterList.map((voter) => {
                          // if (blockchainData.some) {
                            if (voter.voterId) {
                              return (
                                <div className="voterOneBox" key={voter._id}>
                                  <h3>
                                    Name : {voter.firstname} {voter.lastname}
                                  </h3>
                                  <h3>
                                    Voted : {voter.isVoted ? "Yes" : "No"}
                                  </h3>
                                  {voter.isVoted && (
                                    <>
                                      <h3>Age : {voter.age}</h3>
                                      <h3>AdharCard Id : {voter.adharCard}</h3>
                                      <h3>Voter Id : {voter.voterId}</h3>
                                    </>
                                  )}
                                </div>
                              );
                            }
                          // }
                        })}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="ZeroVoterCountMain">
                <h1>Here No Voter Is Registerd !!</h1>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Voters;
