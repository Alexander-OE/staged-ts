import express from "express";
import {
  createRoomHandler,
  deleteRoomHandler,
  getOneRoomHandler,
  getRoomHandler,
  updateRoomHandler,
} from "../controllers/rooms";

const router = express.Router();

router.route("/").get(getRoomHandler);
router.route("/").post(createRoomHandler);
router.route("/:roommid").get(getOneRoomHandler);
router.route("/:roommid").patch(updateRoomHandler);
router.route("/:roommid").delete(deleteRoomHandler);

export default router;
