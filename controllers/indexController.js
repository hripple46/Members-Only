const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

exports.index = asyncHandler(async (req, res, next) => {
  console.log("indexController.index");
  res.render("index", {
    title: "Message Board",
    body: "This is the home page",
    user: req.user,
  });
});

exports.create = asyncHandler(async (req, res) => {
  res.render("create");
});

exports.createUser = asyncHandler(async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    password: req.body.password,
  });
  await user.save();
  res.redirect("/");
});

exports.login = async (req, res, next) => {
  res.render("login");
};
