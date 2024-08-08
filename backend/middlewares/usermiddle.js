import JWT_SECRET from "../config.js";
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(403).json({ message: "Invalid token" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    } else {
      return res.status(403).json({ msg: "Invalid inputs" });
    }
  } catch (e) {
    console.log(e);
    return res
      .status(403)
      .json({
        message: "Some error occurred while verifying / token got expired",
      });
  }
};

export default authMiddleware;
