import express from "express";
const app = express();
const router = express.Router();
import bodyParser from "body-parser";
import userRouter from "./user.js";
import accountRouter from "./account.js";
app.use(express.json());
app.use(bodyParser.json());

router.use("/user", userRouter);
router.use("/account", accountRouter);

export default router;

// app.get("/", function (req, res) {
//   res.send("Hello World from akshay");
// });

// app.post("/signin", async function (req, res) {
//   const userPayload = req.body.userPayload;
//   const validate = userValidateSchema.safeParse(userPayload);
//   if (validate) {
//     const userExist = User.findOne({
//       userPayload: userPayload,
//     });
//     if (userExist) {
//       res.status(200).json({ message: "User already exist" });
//     } else {
//       const newUser = await User.create({
//         firstName: userPayload.firstName,
//         lastName: userPayload.lastName,
//         password: userPayload.password,
//       });
//       console.log("created succesfully");
//     }
//   } else {
//     res.status(400).json({ message: "Invalid payload" });
//   }
// });

// app.post("/signup", function (req, res) {});

// app.put("/");

// app.listen(3002);
