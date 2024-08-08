import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String
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
  },

  password: {
    type: String,
    // required: true,
  },
  image: {
    type: String
  },
  restaurant: {
    type: String,
  },
}, { timestamps: true });

userSchema.statics.signup = async function (
  firstname,
  lastname,
  email,
  role,
  phone,
  password,
  image
) {
  const exist = await this.findOne({ email });

  if (exist) {
    if (!password)
      return exist;
    throw Error("Email already exists.!.");
  }

  if (!email || !firstname) {
    throw Error("All fields must be filled...");
  }

  if (!validator.isEmail(email)) {
    throw Error("Not a valid email.!.");
  }
  if (password && !validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough.!.");
  }

  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({
      firstname,
      lastname,
      email,
      role,
      phone,
      password: hash,
      image
    });

    return user;
  }
  else {


    const user = await this.create({
      firstname,
      lastname,
      email,
      role,
      phone,
      image
    });

    return user;
  }

};

userSchema.statics.login = async function (email, password) {

  if (password) {
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
  }
  else {
    if (!email) {
      throw Error("All fields must be filled...");
    }

    const user = await this.findOne({ email });

    if (!user) {
      throw Error("Incorrect Email.!.");
    }

    return user;
  }

};

const user = mongoose.model("UserCollection", userSchema);

export default user;
