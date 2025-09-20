import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";


// import authRouter from "./router/authRouter";
// import roomRouter from "./router/roomRouter";
// import bookingRouter from "./router/bookingRouter";
import {
  notFoundHandler,
  errorHandler,
} from "./middlewares/error.middleware";

dotenv.config();


const app: Express = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://hotel-management-frontend-fawn.vercel.app",
      "https://hotel-management-frontend-git-main-rorshachs-projects-9fee91c2.vercel.app",
    ],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from Hotel Management API" });
});

// app.use("/api/auth", authRouter);
// app.use("/api/rooms", roomRouter);
// app.use("/api/bookings", bookingRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
