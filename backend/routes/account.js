import express from "express";
const app = express();
const router2 = express.Router();
import User, { Account } from "../db/db.js";
// import bodyParser from "body-parser";
// app.use(bodyParser.json());
import authMiddleware from "../middlewares/usermiddle.js";
import { moneySendingSchema } from "../zod/zod.js";
import mongoose from "mongoose";

router2.get("/balance", authMiddleware, async function (req, res) {
  const userId = req.userId;
  const findUser = await Account.findOne({ userId: userId });
  if (!findUser) {
    res.json({ msg: "User or Account not found" });
  }
  res.json({ balance: findUser.balance });
});

router2.post("/transfer", authMiddleware, async function (req, res) {
  const session = await mongoose.startSession();

  session.startTransaction();
  const toSchema = moneySendingSchema.safeParse(req.body);
  if (!toSchema) {
    session.abortTransaction();
    res.json({ msg: "Invalid Shema/Format" });
  }
  const { to, amount } = req.body;

  try {
    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );
    if (!account) {
      session.abortTransaction();
      res.json({ msg: "User or Account not found" });
    }
    if (account.balance < amount) {
      session.abortTransaction();
      res.json({ msg: "Insufficient balance to transfer" });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
      session.abortTransaction();
      res.json({ msg: "Invalid account" });
    }
  } catch (e) {
    console.log(e);
    session.abortTransaction();
    res.json({ msg: "Error in transaction" });
  }
  // Performing the transfer
  try {
    await Account.updateOne(
      { userId: req.userId },
      {
        $inc: { balance: -amount },
      }
    ).session(session);
  } catch (e) {
    console.log(e);
    session.abortTransaction();
    res.json({ msg: "Error in transfer" });
  }
  try {
    await Account.updateOne(
      { userId: to },
      {
        $inc: { balance: amount },
      }
    ).session(session);
  } catch (e) {
    console.log(e);
    session.abortTransaction();
    res.json({ msg: "Error in transfer" });
  }
  session.commitTransaction();
  res.json({ msg: "Transfer successfully" });

  // let { toSchema, amountSchema } = moneySendingSchema.safeParse(req.body);
  // let { to, amount } = req.body;
  // if (!{ toSchema, amountSchema }) {
  //   res.send({ msg: "Invalid Shema/Format" });
  // }
  // const senderAccount = await Account.findOne({ userId: req.userId });
  // if (!senderAccount) {
  //   res.json({ msg: "User or Account not found"y
});
// }
// if (senderAccount.balance < req.body.amount) {
//   res.json({ msg: "Insufficient balance" });
// }
// try {
//   await Account.updateOne(
//     { userId: req.userId },
//     {
//       $inc: {
//         balance: -amount,
//       },
//     }
//   );
//   res.json({ msg: "transfer successfully" });
// } catch (e) {
//   res.json({ msg: "Error in transfer" });
// }
// const findAccount = await Account.findOne({ userId: req.body.to });
// if (!findAccount) {
//   res.json({ msg: "User or Account not found" });
// }
// try {
//   await Account.updateOne(
//     { userId: req.body.to },
//     {
//       $inc: {
//         balance: req.body.amount,
//       },
//     }
//   );
//   res.json({ msg: "transfer successfully", findAccount });
// } catch (e) {
//   res.json({ msg: "Error in transfer" });
// }

export default router2;
