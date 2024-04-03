import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateAccountDetails,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/logout").post(verifyJwt, logoutUser);
router.route("/getUser").post(verifyJwt, getUser);
router.route("/update-user").post(verifyJwt, updateAccountDetails);



export default router;
