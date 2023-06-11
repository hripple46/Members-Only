const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const express = require("express");
const router = express.Router();

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
    username: req.body.username,
    password: req.body.password,
  });
  await user.save();
  res.redirect("/");
});

exports.login = async (req, res, next) => {
  res.render("login");
};
passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log("LocalStrategy");
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

exports.loginAuth = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  });
};

exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
