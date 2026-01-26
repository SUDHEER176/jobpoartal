require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Logging to file
const logFile = fs.createWriteStream(path.join(__dirname, 'server.log'), { flags: 'a' });
const logStdout = process.stdout;

console.log = function (d) {
    logFile.write(new Date().toISOString() + ': ' + d + '\n');
    logStdout.write(new Date().toISOString() + ': ' + d + '\n');
};
console.error = console.log;

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*", // Adjust in production
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 5000;

// Make io accessible in requests
app.set('socketio', io);

// Middleware
app.use(cors());
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    });
    next();
});


// Routes
app.use('/api', require('./routes/api'));

// Root
app.get('/', (req, res) => res.send('Job Portal API Running'));

// Socket.io Connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI;

// Cached connection for Serverless
let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;
    try {
        await mongoose.connect(MONGODB_URI);
        isConnected = true;
        console.log('MongoDB Connected Successfully');
    } catch (err) {
        console.error('MongoDB Connection FAILURE:', err);
    }
};

// Database Readiness check
app.use(async (req, res, next) => {
    await connectDB();
    if (mongoose.connection.readyState !== 1 && req.path.startsWith('/api')) {
        return res.status(503).json({
            success: false,
            error: 'Database not ready',
        });
    }
    next();
});

// Start server only if not in Vercel
if (process.env.NODE_ENV !== 'production') {
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;


