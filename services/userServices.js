const User = require("../schema/userSchema");
const bcrypt = require("bcrypt");
const utils = require("../utils/util");
const rateLimit = require("express-rate-limit");


const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: "Too many login attempts. Please try again later.",
  headers: true,
});


const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 10, 
  message: "Too many account creation attempts. Please try again later.",
  headers: true,
});

const getUsers = async (username, email, password) => {
  try {
    const users = await User.find();
    console.log(users, "helloo");
    return users;
  } catch (error) {
    throw Error("Error in Fetching Users");
  }
};

const createUser = async (username, email, password) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw Error("User already exists");
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: encryptedPassword });
    await newUser.save();
    return newUser;
  } catch (error) {
    console.log(error);
    throw Error("Error in creating user");
  }
};

const userLogin = async (email, password) => {
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new Error("User does not exist");
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      throw new Error("Invalid password");
    }

    const access_token = await utils.generateAccessToken(existingUser);
    const refresh_token = await utils.generateRefreshToken(existingUser);
    console.log(existingUser + "hello");

    return {
      access_token,
      refresh_token,
      username: existingUser.username,
      email: existingUser.email,
    };
  } catch (error) {
    console.error("Login Error:", error.message);
    throw new Error("Login failed. Please check your credentials.");
  }
};

module.exports = { getUsers, createUser, userLogin, loginLimiter, registerLimiter };
