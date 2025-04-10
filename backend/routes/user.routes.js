import express from "express";
import {
  bookAppointment,
  getProfile,
  listAppointments,
  loginUser,
  registerUser,
  updateProfile,
} from "../controllers/user.controller.js";
import authUser from "../middlewares/authUser.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authUser, getProfile);
userRouter.post(
  "/update-profile",
  upload.single("image"),
  authUser,
  updateProfile
);
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/appointments", authUser, listAppointments);

export default userRouter;
