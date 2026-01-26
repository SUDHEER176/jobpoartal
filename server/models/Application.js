const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    applicantId: { type: String, required: true }, // Supabase User ID
    resumeUrl: String,
    status: {
        type: String,
        enum: ['applied', 'reviewed', 'interview', 'hired', 'rejected'],
        default: 'applied'
    },
    appliedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);
