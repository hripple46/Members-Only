const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  Date: Date,
  text: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Message", messageSchema);
