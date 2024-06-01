import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  role: {
    type: String,
  },

  phone: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
},{timestamps:true});

userSchema.statics.signup = async function (
  firstname,
  lastname,
  email,
  role,
  phone,
  password
) {
  const exist = await this.findOne({ email });

  if (exist) {
    throw Error("Email already exists.!.");
  }

  if (!email || !password || !firstname || !lastname) {
    throw Error("All fields must be filled...");
  }

  if (!validator.isEmail(email)) {
    throw Error("Not a valid email.!.");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough.!.");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    firstname,
    lastname,
    email,
    role,
    phone,
    password: hash,
  });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!password || !email) {
    throw Error("All fields must be filled...");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect Email.!.");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password.!.");
  }

  return user;
};

const user = mongoose.model("UserCollection", userSchema);

export default user;
