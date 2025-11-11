import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.name || !this.email || !this.password || this.address) {
      const error = new Error("all fields are required");
      return next(error);
    }

    if (this.isNew) {
      const existingUser = await mongoose.models.users.findOne({
        email: this.email,
      });
      if (existingUser) {
        const error = new Error("Email already exists");
        return next(error);
      }
    }

    if (this.isModified("password")) {
      const saltRound = 12;
      const hashedPassword = await bcrypt.hash(this.password, saltRound);
      this.password = hashedPassword;
    }
    
    next();
  } catch (error) {
    return next(error);
  }
});

const userModel = mongoose.model("users", userSchema);
export default userModel;
