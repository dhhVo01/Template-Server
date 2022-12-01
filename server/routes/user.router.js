import express from "express";
import auth from "../middleware/auth.js";
import * as controller from "../controllers/user.controller.js";
const router = express.Router();

router.post("/login", controller.login);
router.post("/signup", controller.signup);
router.post("/auth", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  });
  
//router.post("/logout", logout);

export default router;