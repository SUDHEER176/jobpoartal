require('dotenv').config();
const mongoose = require('mongoose');

console.log('Testing MongoDB connection with URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('SUCCESS: MongoDB Connected');
        process.exit(0);
    })
    .catch(err => {
        console.error('FAILURE: MongoDB Connection Error:', err);
        process.exit(1);
    });
