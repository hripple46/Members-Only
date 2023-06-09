const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

router.get("/", indexController.index);

router.get("/user/create", indexController.create);

router.post("/user/create", indexController.createUser);

router.get("/user/login", indexController.login);

router.post("/user/login", indexController.loginAuth);

router.get("/user/logout", indexController.logout);

router.get("/user/:id/newmessage", indexController.newMessage);

router.post("/user/:id/newmessage", indexController.createMessage);

router.get("/user/:id/updateMembership", indexController.updateMembership);

router.post("/user/:id/updateMembership", indexController.updateMembershipPost);

module.exports = router;
