import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import cors from "cors";
app.use(cors({
    origin: ["http://localhost:3000", "https://paytm-liard.vercel.app"],
    credentials: true
  }));
app.use(express.json());
import mainrouter from "./routes/authenty.js";
import User from "./db/db.js";
import uerValidateSchema from "./zod/zod.js";
import zod from "zod";

app.use("/api/v1", mainrouter);

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
