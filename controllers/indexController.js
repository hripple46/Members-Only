const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res) => {
  console.log("indexController.index");
  res.render("index", {
    title: "Message Board",
    body: "This is the home page",
  });
});
