import { Router } from "express";
import {
  getOpenRooms,
  handleToss,
} from "../controllers/room.controller.js";


const router = Router();

router.route("/openRooms").get(getOpenRooms);
router.route("/toss").post(handleToss);


export default router;
