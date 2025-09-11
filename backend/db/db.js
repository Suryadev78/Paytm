import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

async function connectDB() {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Extract safe info from URI
    if (MONGO_URI) {
      try {
        const url = new URL(MONGO_URI);
        console.log("✅ Connected to cluster:", url.hostname);
        console.log("✅ Database name:", url.pathname.replace("/", ""));
      } catch (e) {
        console.log("⚠️ Could not parse MONGO_URI");
      }
    }

    console.log(`🚀 MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}

connectDB();

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
