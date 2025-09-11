import express from "express";
import cors from "cors";
import connectDB from "./db/db.js";
import mainrouter from "./routes/authenty.js";

const app = express();
connectDB(); // Connect to MongoDB

app.use(cors({
  origin: ["http://localhost:3000", "https://paytm-liard.vercel.app","http://localhost:5173"],
  credentials: true
}));

app.use(express.json());
app.use("/api/v1", mainrouter);

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
