const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: { type: String, required: true },
  memberStatus: { type: String, default: "Basic" },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
