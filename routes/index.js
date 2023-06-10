const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");

router.get("/", indexController.index);

router.get("/user/create", indexController.create);

router.post("/user/create", indexController.createUser);

router.get("/user/login", indexController.login);

router.post("/user/login", indexController.login);

module.exports = router;
