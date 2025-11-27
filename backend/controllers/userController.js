import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

// API , user register ke liye
const registerUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing details !" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid Email" });
    }

    if (password.length < 6) {
      return res.json({ success: false, message: "Enter a Strong Password" });
    }

    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.json({ success: false, message: "Email already registered" });
    }

    // password hash kr rhe hai bhai
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // use data save krenge , database me
    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    // database me save ho gya !! yeyyyyy
    const newUser = new userModel(userData);
    const user = await newUser.save();

    // ab banaenge token , _id ki help se , jo ki databse me save hai, mtlb user ka use krke

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API user login krne ke liye.
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user Profile Data
const getProfile = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update user Profile Data
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing!" });
    }

    // field update ho gai
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    // image update ho gyaaaa
    if (imageFile) {
      // cloudinary pe image upload krenge, agr image user ne daala tb
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
      console.log("Profle image url mil gya vai : ", imageUrl);
    }

    res.json({ success: true, message: "Profile Updated Successfully" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


export { registerUser, loginUser, getProfile, updateProfile };
