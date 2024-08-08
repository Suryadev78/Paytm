import express from "express";
const app = express();
import cors from "cors";
app.use(cors());
app.use(express.json());
import mainrouter from "./routes/authenty.js";
import User from "./db/db.js";
import uerValidateSchema from "./zod/zod.js";
import zod from "zod";

app.use("/api/v1", mainrouter);

app.listen(3002);
