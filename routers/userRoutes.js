const express = require("express");
const {
  registerControllers,
  loginControllers,
} = require("../controllers/userControllers");
const router = express.Router();

router.post("/register", registerControllers);

router.post("/login", loginControllers);

module.exports = router;
