const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Checking Database...'))
  .catch(err => console.log(err));

const createAdmin = async () => {
  try {
    // 1. Check if admin already exists
    const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });
    
    if (existingAdmin) {
      console.log('⚠️ Admin already exists!');
      process.exit();
    }

    // 2. Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt); 

    // 3. Create the user
    await User.create({
      name: 'Moulvi Saab',
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      isAdmin: true
    });

    console.log('✅ Admin Account Created Successfully!');
    process.exit();

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

createAdmin();