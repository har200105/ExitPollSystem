const { addElection, getElections } = require("../controllers/electionController");

const router = require("express").Router();

router.post("/addElection",addElection);
router.get("/getElections",getElections);

module.exports = router;