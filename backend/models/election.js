const mongoose = require("mongoose");
const electionSchema = mongoose.Schema({
    
    electionType: {
        type: String,
        enum:["State","Country"]
    },

    electionDate: {
        type: Date,
        required:true
    },

    partiesContesting: {
        type: Array,
    }

});

const Election = mongoose.model("Election", electionSchema);
module.exports = Election;