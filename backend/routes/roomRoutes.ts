import express from "express";
import { getAll, getSingle, addRoom, updateRoom } from '../controllers/roomController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.route("/").get(getAll).post(protect, addRoom);
router.route("/:id").get(getSingle).put(protect, updateRoom);

export default router;