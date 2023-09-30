import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
// import JWT from "jsonwebtoken";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
      minLength: [8, "Minimum password 8 number"],
    },
  },
  { timestamp: true }
);

// bcrypt password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 6);
  }
  next();
});

const user = model("User", userSchema);

export default user;
