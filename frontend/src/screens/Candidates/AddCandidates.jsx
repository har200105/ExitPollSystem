import { useState, useEffect } from "react";
import "./AddCandidates.css";
import VoterNavbar from "../../components/VoterNavbar";
import { ToastContainer, toast } from "react-toastify";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { contractAddressValue } from "../../constants/constants";
import { API } from "../../constants/api";
import electionAbi from "../../Contracts/Election.json";
const contractAddress = contractAddressValue;

const AddCandidates = () => {

  const navigate = useNavigate();
  const [statusOfPage, setStatusOfPage] = useState(true);
  const checkOwner = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        if (
          accounts[0].toString() != "0x101a7331a6b9febe2e0eeb78c81709555600de95"
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
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const ElectionContract = new ethers.Contract(
      contractAddress,
      electionAbi,
      provider
    );
    const StateOfCon = await ElectionContract.ElectionState();
    console.log(StateOfCon);
    if (StateOfCon == 0) {
      setStatusOfPage(true);
    } else {
      setStatusOfPage(false);
    }
  };

  useEffect(() => {
      checkOwner();
      checkState();
  }, []);

  const [partyName, setPartyName] = useState("");
  const [partyImageFile, setPartyImageFile] = useState("");

  const addCandidateToBlockChain = async () => {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const ElectionContract = new ethers.Contract(
      contractAddress,
      electionAbi,
      provider
    );
    const signer = provider.getSigner();

    try {
      const transaction = await ElectionContract.connect(signer).addCandidate(
        partyName,
        partyName,
        partyImageFile.name.toString()
      );
      console.log(`Adding To Blockchain`);
      console.log(transaction);
      setPartyName("");
      setPartyImageFile("");
      toast.info(`Processing to Blockchain`, {
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
      });
    } catch (e) {
      console.log(e);
      if (e.message.indexOf("missing argument: passed to contract") > -1) {
        toast.error("Missing argument: passed to contract", {
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
  };

  

  const addPartyToDB = async (e) => {

    e.preventDefault();
    if(partyName !== ""){
      
      const formData = new FormData();
      formData.append("partyId", partyName);
      formData.append("partyName", partyName);
      formData.append("partyLogo", partyImageFile);

      const response = await API.post(`/api/addparty`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      const data = response.data;

      if (response.status === 201) {
        toast.success("Successfully Added Candidate To DB", {
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
        });
        addCandidateToBlockChain();
        setPartyName("");
        setPartyImageFile("");
      } else if (response.status === 409) {
        toast.error(data, {
          style: {
            fontSize: "18px",
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
      } else {
        toast.error("Somthing went wrong !!", {
          style: {
            fontSize: "18px",
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
    } else {
      toast.error("Fill All Details !!", {
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
  };
  return (
    <>
      <VoterNavbar />
      {statusOfPage ? (
        <>
          <div className="addCandidatesConatiner">
            <ToastContainer theme="colored" />
            <div className="addCandidateMain">
              <h1>Add Candidates</h1>
              <div className="addCandidateinputFormMain">
                <form
                  method="POST"
                  className="addCandidateForm"
                  encType="multipart/form-data"
                >
                  <div className="addCandidateInputBox">
                    <i className="fa-solid fa-user-large"></i>
                    <input
                      type="text"
                      name="candidatename"
                      placeholder="Enter Candidate Name"
                      autoComplete="off"
                      className="addCandidateInput"
                      onChange={(e)=>setPartyName(e.target.value)}
                      value={partyName}
                      required
                    />
                  </div>

                  <div className=" fileInputBox">
                    <i className="fa-solid fa-folder"></i>
                    <input
                      name="CandidateImage"
                      type="file"
                      placeholder="Upload Candidate Photo : "
                      className=" fileInput"
                      accept="image/*"
                      onChange={(e) => setPartyImageFile(e.target.files[0])}
                      required
                    />
                  </div>

                  <div className="canFormbtnGrp">
                    <input
                      type="submit"
                      className="regiterCanBtn"
                      onClick={addPartyToDB}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="MainStatusCandidate">
            <h1>Registration Phase Is Over !!</h1>
          </div>
        </>
      )}
    </>
  );
};

export default AddCandidates;
