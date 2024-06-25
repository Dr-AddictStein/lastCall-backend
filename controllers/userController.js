import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const singupUser = async (req, res) => {
  const { firstname, lastname, email, phone, password } = req.body;
  const role = "user";
  console.log("ZZZZZZZZZZZZ",req.body)
  try {
    const user = await userModel.signup(
        firstname,
        lastname,
        email,
        role,
        phone,
        password
    );

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
