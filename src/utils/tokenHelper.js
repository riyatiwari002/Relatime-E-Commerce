import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "newtoken";
const JWT_EXPIREIN = "1d";
const generateToken = (user) => {
  try {
    return jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIREIN }
    );
  } catch (error) {
    console.log(error);
  }
};
export { generateToken };
