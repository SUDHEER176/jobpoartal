const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true, index: true },
    company: { type: String, required: true },
    logo: String, // Added company logo field
    location: { type: String, required: true },
    type: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance', 'Seasonal', 'Fixed-Price'], default: 'Full-time' },
    category: String,
    experienceLevel: String,
    salaryRange: String,
    description: String,
    requirements: [String],
    recruiterId: { type: String, required: true }, // Links to User.userId (Supabase ID)
    status: { type: String, enum: ['active', 'closed'], default: 'active' },
    createdAt: { type: Date, default: Date.now }
});

jobSchema.index({ title: 'text', company: 'text', description: 'text', requirements: 'text' });

module.exports = mongoose.model('Job', jobSchema);
