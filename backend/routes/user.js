import bodyParser from "body-parser";
import express from "express";
import jwt from "jsonwebtoken";
const app = express();
const router = express.Router();
app.use(bodyParser.json());
import userValidateSchema from "../zod/zod.js";
import User, { Account } from "../db/db.js";
import JWT_SECRET from "../config.js";
import authMiddleware from "../middlewares/usermiddle.js";

router.post("/signup", async function (req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userName = req.body.userName;
  const password = req.body.password;
  const validate = userValidateSchema.safeParse({
    firstName,
    lastName,
    userName,
    password,
  });
  if (validate) {
    const userExists = await User.findOne({
      userName: userName,
    });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      password: password,
    });
    const userId = user._id;

    // create a new Account

    await Account.create({
      userId,
      balance: 1 + Math.random() * 1000,
    });

    const token = jwt.sign({ userId }, JWT_SECRET);
    res.json({ message: "User created successfully", token });
  } else {
    res.status(403).json({ message: "Invalid Credentials" });
  }
});

router.post("/signin", async function (req, res) {
  const userBody = userValidateSchema.safeParse(req.body);
  if (!userBody) {
    res.json({ msg: "Invalid Inputs/UserName already in use" });
  }

  const user = await User.findOne({
    userName: req.body.userName,
    password: req.body.password,
  });
  if (!user) {
    res.status(400).json({ message: "Invalid user" });
  } else {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.status(200).json({ message: "User found", token });
  }
});
router.put("/update", authMiddleware, async function (req, res) {
  const userId = req.userId;
  const userInfo = userValidateSchema.safeParse(req.body);
  if (userInfo.success) {
    try {
      await User.findOneAndUpdate({ _id: userId }, req.body);
      res.status(200).json({ msg: "User updated successfully" });
    } catch (e) {
      res
        .status(403)
        .json({ msg: "Some error occured while updating userInfo" });
    }
  } else {
    res.status(403).json({ message: "Error while updating" });
  }
});

router.get("/bulk", async function (req, res) {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstName: { $regex: filter },
      },
      {
        lastName: { $regex: filter },
      },
    ],
  });
  res.json({
    user: users.map((user) => ({
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

router.get("/me", authMiddleware, async function (req, res) {
  const userId = req.userId;
  const user = await User.findOne({ _id: userId });
  if (user) {
    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      userId: user._id,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});
export default router;
