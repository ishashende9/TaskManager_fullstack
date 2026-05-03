import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import User from "./models/User.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const seedUsers = async () => {
  try {
    await User.deleteMany();

    const users = [
      {
        name: "Admin",
        email: "admin@gmail.com",
        password: await bcrypt.hash("123456", 10),
        role: "admin"
      },
      {
        name: "User",
        email: "user@gmail.com",
        password: await bcrypt.hash("123456", 10),
        role: "user"
      },
      {
        name: "User1",
        email: "user1@gmail.com",
        password: await bcrypt.hash("pass_user1", 10),
        role: "user"
      },
      {
        name: "User2",
        email: "user2@gmail.com",
        password: await bcrypt.hash("pass_user2", 10),
        role: "user"
      }
    ];

    await User.insertMany(users);

    console.log("Users Seeded Successfully ✅");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedUsers();