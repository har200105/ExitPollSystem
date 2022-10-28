const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
require("dotenv").config();

const AdminSchema = new mongoose.Schema(
  {
    AdminName: {
      type: String,
      required: true,
    },
    AdminUserName: {
      type: String,
      required: true,
    },

    AdminPassword: {
      type: String,
      required: true,
    },
    AdminConfirmPassword: {
      type: String,
      required: true,
    },
    Tokens: [
      {
        token: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);


AdminSchema.methods.generateToken = async function () {
  let token = await jwt.sign({ id: this.id }, process.env.Token_Private_Key);
  this.Tokens = this.Tokens.concat({ token });
  await this.save();
  return token;
};

const Admin = new mongoose.model("Admin", AdminSchema);

module.exports = Admin;
