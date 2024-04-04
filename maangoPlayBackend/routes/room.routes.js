import { Router } from "express";
import {
  getOpenRooms,
} from "../controllers/room.controller.js";


const router = Router();

router.route("/openRooms").get(getOpenRooms);


export default router;
