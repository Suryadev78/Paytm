// db.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); // Load .env variables

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  // console.error("❌ MONGO_URI is not defined in .env");
  process.exit(1);
}

// Function to connect to MongoDB
async function connectDB() {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // console.log("✅ Connected to cluster:", conn.connection.host);
    // console.log("✅ Database name:", conn.connection.name);
  } catch (err) {
    // console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}

// User schema
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

// Bank / Account schema
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

// Models
const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", bankSchema);

// Export
export default connectDB;
export { User, Account };
