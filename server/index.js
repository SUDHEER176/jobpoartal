require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// Standard console logging
console.log('Starting Job Portal Server...');

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

// Database Readiness check
app.use((req, res, next) => {
    if (mongoose.connection.readyState !== 1 && req.path.startsWith('/api')) {
        console.error(`Database not ready for ${req.method} ${req.path}. State: ${mongoose.connection.readyState}`);
        return res.status(503).json({
            success: false,
            error: 'Database not ready',
            details: 'The server is currently unable to connect to MongoDB. Please check your connection string and IP whitelisting.'
        });
    }
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
const maskedURI = MONGODB_URI ? MONGODB_URI.replace(/:([^@]+)@/, ':****@') : 'MISSING';

console.log(`Attempting to connect to MongoDB: ${maskedURI}`);

mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => {
        console.error('MongoDB Connection FAILURE:');
        console.error(err);
    });

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { io };


