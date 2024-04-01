import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/logout").post(verifyJwt, logoutUser);
router.route("/logout").post(verifyJwt, getUser);


export default router;
