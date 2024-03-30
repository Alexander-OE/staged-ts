import express, { Application } from "express";
import dotenv from "dotenv";
import { authenticate } from "./middlewares/authenticate";
import { authorization } from "./middlewares/authorization";
import {validator } from "./middlewares/validator";
import roomTypesRouter from "./routes/room-types";
import roomRouter from "./routes/rooms";
import userRouter from "./routes/user";

// connect();

dotenv.config();
const app: Application = express();

const PORT = 4000;

app.use(express.json());
app.use(validator);

app.use("/api/v1/users", userRouter);
// app.use(authenticate);
// app.use(authorization);
app.use("/api/v1/rooms", roomRouter);
app.use("/api/v1/rooms-types", roomTypesRouter);

app.use("*", (req, res) => {
  res.status(404).json({ message: "This Route Not Found" });
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
