const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  userName: String,
  memberStatus: String,
});

module.exports = mongoose.model("User", userSchema);
