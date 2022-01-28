import express from 'express';
import { register, login, updateProfile, updatePassword } from '../controllers/userController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update").put(protect, updateProfile);
router.route("/update/password").put(protect, updatePassword);

export default router;