import { Router } from "express";
import {
  getOpenRooms,
  handleToss,
  getTossResult
} from "../controllers/room.controller.js";


const router = Router();

router.route("/openRooms").get(getOpenRooms);
router.route("/toss").post(handleToss);
router.route("/tossResult").post(getTossResult);



export default router;
