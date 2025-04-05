import express from "express";
import cors from "cors";
import adminRouter from "./routes/admin.routes.js";
import doctorRouter from "./routes/doctor.route.js";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());

//api endpoint
app.use("/api/admin", adminRouter);
//localhost:8000/api/admin/add-doctor

app.use("/api/doctor", doctorRouter);
//localhost:8000/api/doctor/list

export { app };
