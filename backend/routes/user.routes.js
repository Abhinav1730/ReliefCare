import express from "express";
import {
  bookAppointment,
  cancelAppointment,
  getProfile,
  listAppointments,
  loginUser,
  paymentOfAppointmentsUsingRazorpay,
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
userRouter.post("/cancel-appointment", authUser, cancelAppointment);
userRouter.post(
  "/payment-razorpay",
  authUser,
  paymentOfAppointmentsUsingRazorpay
);

export default userRouter;
