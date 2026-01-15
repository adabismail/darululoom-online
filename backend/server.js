const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

// 1. Import Routes (All at the top)
const courseRoutes = require('./routes/courseRoutes');
const authRoutes = require('./routes/authRoutes');
const admissionRoutes = require('./routes/admissionRoutes');

// Load Config
dotenv.config();

const app = express();

// 2. Middleware
app.use(express.json()); // Allows server to read JSON
app.use(cors()); // Allows Frontend to talk to Backend

// 3. Connect to Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.log('❌ DB Error:', err));

// 4. Use Routes
app.get('/', (req, res) => res.send('Darul Uloom API is running...'));

app.use('/api/users', authRoutes);       // Login Routes
app.use('/api/courses', courseRoutes);   // Course Routes
app.use('/api/admissions', admissionRoutes); // Admission Routes

// 5. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
