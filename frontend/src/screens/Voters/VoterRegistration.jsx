import { useState, useEffect } from "react";
import VoterNavbar from "../../components/VoterNavbar";
import "./VoterRegistration.css";
import { ToastContainer, toast, Flip } from "react-toastify";
import { ethers } from "ethers";
import { contractAddressValue } from "../../constants/constants";
import electionAbi from "../../Contracts/Election.json";
import { API } from "../../constants/api";
import { useSelector } from "react-redux";


const contractAddress = contractAddressValue;

const VoteRegistration = () => {

  const [voterDetails, setVoterDetails] = useState({
    adharCard: "",
    voterno: "",
    birthdate: "",
    age: "",
    city: "",
    rstate: "",
    address: "",
  });

  const [statusOfPage, setStatusOfPage] = useState(true);

  const { user } = useSelector((state) => state.user);

  const checkState = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const ElectionContract = new ethers.Contract(
      contractAddress,
      electionAbi,
      provider
    );
    const StateOfCon = await ElectionContract.ElectionPhase();
    if (StateOfCon == 0) {
      setStatusOfPage(true);
    } else {
      setStatusOfPage(false);
    }
  };

  const addVoterToBlockchain = async (currentVotervoterId) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const ElectionContract = new ethers.Contract(
      contractAddress,
      electionAbi,
      provider
    );
    const signer = provider.getSigner();
    try {
      if (currentVotervoterId !== "") {
        const transaction = await ElectionContract.connect(signer).voterRegisteration(
          currentVotervoterId.toString()
        );
        console.log(transaction);
        toast.info("Processing to Blockchain", {
          style: {
            fontSize: "15px",
            letterSpacing: "1px",
          },
          position: "bottom-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Flip,
        });
      } else {
        toast.error("ID Required !!", {
          style: {
            fontSize: "18px",
            letterSpacing: "1px",
          },
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Flip,
        });
      }
    } catch (e) {
      console.log(e);
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
  };

  useEffect(() => {
      checkState();
  }, []);

  const HandleVoterDetailsChanges = (e) => {
    setVoterDetails({ ...voterDetails, [e.target.name]: e.target.value });
  };
  const RegisterVoter = async (e) => {
    
    e.preventDefault();
    const { adharCard, voterno, birthdate, age, city, rstate, address } = voterDetails;
    
      const response = await API.post('/api/voteregistration',{
          cid: user?._id,
          adharCard,
          voterno,
          birthdate,
          age,
          city,
          rstate,
          address,
        })
      const data = response.data;

      if (response.status === 201) {
        toast.success("Successfully registered to Db", {
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
        setTimeout(function () {
          addVoterToBlockchain(voterDetails.voterno);
        }, 1500);

      } else if (response.status === 409) {
        toast.error(data, {
          style: {
            fontSize: "15px",
            letterSpacing: "1px",
          },
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error(data, {
          style: {
            fontSize: "15px",
            letterSpacing: "1px",
          },
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      } 
  }

  return (
    <>
         <VoterNavbar/>
          {statusOfPage ? (
            <>
              <div className="voteRegistrationMain">
                <ToastContainer theme="colored" />
                <h1 id="headingForRegistration">Fill The Details before Voting</h1>
                <div className="formMain">
                  <div className="rightSideRegistrationPart">
                    <form>
                      <div className="inputVoteBox">
                        <i className="fa-solid fa-address-card"></i>
                        <input
                          type="text"
                          name="adharCard"
                          placeholder="Enter your Aadhar Card"
                          id="adharCard"
                          className="VotingRegisterInputField"
                          onChange={HandleVoterDetailsChanges}
                          value={voterDetails.adharCard}
                          required
                        />
                      </div>

                      <div className="inputVoteBox">
                        <i className="fa-solid fa-calendar"></i>
                        <input
                          type="number"
                          name="voterno"
                          placeholder="Enter your Voter Card No "
                          id="voterno"
                          className="VotingRegisterInputField"
                          onChange={HandleVoterDetailsChanges}
                          value={voterDetails.voterno}
                          required
                        />
                      </div>

                      <div className="inputVoteBox">
                        <i className="fa-solid fa-calendar"></i>
                        
                        <input
                          type="date"
                          name="birthdate"
                          placeholder="Enter your Birth Date : "
                          id="birthdate"
                          className="VotingRegisterInputField"
                          onChange={HandleVoterDetailsChanges}
                          value={voterDetails.birthdate}
                          required
                        />
                      </div>

                      <div className="inputVoteBox">
                        <i className="fa-solid fa-universal-access"></i>
                        <input
                          type="number"
                          name="age"
                          placeholder="Enter your Age"
                          id="age"
                          className="VotingRegisterInputField"
                          min={18}
                          onChange={HandleVoterDetailsChanges}
                          value={voterDetails.age}
                          required
                        />
                      </div>

                      <div className="inputVoteBoxGroup">
                        <div className="inputVoteBox">
                          <i className="fa-solid fa-city"></i>
                          <input
                            type="text"
                            name="rstate"
                            placeholder="Enter your State "
                            id="state"
                            className="VotingRegisterInputField"
                            onChange={HandleVoterDetailsChanges}
                            value={voterDetails.rstate}   
                            required
                          />
                        </div>

                        <div className="inputVoteBox">
                          <i className="fa-solid fa-earth-asia"></i>
                          <input
                            type="text"
                            name="city"
                            placeholder="Enter your City "
                            id="city"
                            className="VotingRegisterInputField"
                            onChange={HandleVoterDetailsChanges}
                            value={voterDetails.city}
                            required
                          />
                        </div>
                      </div>
                      <div className="inputVoteBox">
                        <i className="fa-solid fa-at"></i>
                        <input
                          type="text"
                          name="address"
                          placeholder="Enter your address "
                          id="address"
                          className="VotingRegisterInputField"
                          onChange={HandleVoterDetailsChanges}
                          required
                        />
                      </div>

                      <div className="btnGroupVoteRegister">
                        <input
                          type="submit"
                          className="regiterVotebumtBtn"
                          onClick={RegisterVoter}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </>
          ) : (
          <div className="MainStatusVoter">
                <h1>Registration phase has not been started yet !!</h1>
              </div>
          )}
        </>
  );
};

export default VoteRegistration;
