require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Check if your file is named User.js or userModel.js

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to Cloud DB...");

        // 1. Check if user exists
        const existingUser = await User.findOne({ email: process.env.ADMIN_EMAIL });
        if (existingUser) {
            console.log("⚠️ User already exists in Cloud. Deleting it to start fresh...");
            await User.deleteOne({ email: process.env.ADMIN_EMAIL }); // This deletes the Cloud user so we can remake it
        }

        // 2. Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);

        // 3. Create the new Admin
        const adminUser = new User({
            name: "Super Admin",
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            isAdmin: true,
            phone: process.env.ADMIN_PHONE || "0000000000"
        });

        await adminUser.save();
        console.log("🎉 Admin User Created in Cloud!");
        process.exit();
    } catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
};

seedAdmin();