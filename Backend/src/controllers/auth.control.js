import express from 'express';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';
import { v2 as cloudinary } from 'cloudinary';

export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists with this email" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    generateToken(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      fullname: newUser.fullname,
      email: newUser.email,
      profile: newUser.profile,
    });
  } catch (error) {
    console.log("Error in signup controller:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const login = async(req, res) => {

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      profile: user.profile,
    });

  } catch (error) {
    console.log("Error in login controller:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const logout = (req, res) => {
  try {
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message: "Logged out successfully"});
  } catch (error) {
    console.log("Error in logout controller:", error);
    res.status(500).json({ message: "Server Error" });
  }

};


export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }
    // Ensure Cloudinary is configured using environment variables
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profile: uploadResponse.secure_url },
      { new: true }
    ).select("-password");

    res.status(200).json({
      _id: updatedUser._id,
      fullname: updatedUser.fullname,
      email: updatedUser.email,
      profile: updatedUser.profile,
    });
  } catch (error) {
    console.log("Error in updateProfile controller:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller:", error);
    res.status(500).json({ message: "Server Error" });
  }
}