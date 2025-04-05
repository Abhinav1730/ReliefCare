import express from "express";
import cors from "cors";
import adminRouter from "./routes/admin.routes.js";

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
//localhost:3000/api/admin/add-doctor

export { app };
