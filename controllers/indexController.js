const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const session = require("express-session");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const express = require("express");
const router = express.Router();
const Message = require("../models/message");

exports.index = asyncHandler(async (req, res, next) => {
  console.log("indexController.index");
  const messages = await Message.find();
  for (let message of messages) {
    console.log(message);
  }
  res.render("index", {
    title: "Message Board",
    body: "This is the home page",
    user: req.user,
    messages: messages,
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
  })(req, res, next);
};

exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

exports.newMessage = asyncHandler(async (req, res, next) => {
  res.render("newMessage", { user: req.user });
});

exports.createMessage = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  let newDate = new Date();
  const message = new Message({
    text: req.body.text,
    user: user,
    Date: newDate,
  });
  await message.save();
  res.redirect("/");
});
