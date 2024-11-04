import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
dotenv.config();
import listsRouters from "./routers/listsRouters";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);

// app.use("/", (req: Request, res: Response) => {
//   res.status(200).json({ message: "Hello developer!" });
// });

app.use("/api/lists", listsRouters);

mongoose
  .connect(process.env.MONGODB_STRING || "mongodb://localhost:27017")
  .then((res) => {
    app.listen(process.env.PORT || 4050, () => {
      console.log(
        `Server running at http://localhost:${process.env.PORT || 4050}`
      );
    });
  })
  .catch((err: unknown) => {
    console.log(err);
  });
