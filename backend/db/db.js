import mongoose from "mongoose";
mongoose.connect("your mongoDb URL");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  lastName: { type: String },
  userName: {
    type: String,
    unique: true,
    required: [true, "Path `userName` is required."],
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: { type: String, minLength: 3, required: true },
});

const bankSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});
const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", bankSchema);

export default User;
export { Account };
