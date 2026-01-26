const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // Supabase Auth ID
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['seeker', 'recruiter', 'admin'], default: 'seeker' },
  profile: {
    name: String,
    avatar: String,
    resume: String,
    skills: [String],
    experience: String,
    company: String,
    bio: String,
    title: String, // e.g. "Senior Software Engineer"
    location: String
  },
  onboardingStatus: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  onboardingStep: { type: Number, default: 1 },
  preferences: {
    jobTypes: [String],
    salaryExpectation: String,
    locations: [String],
    roles: [String]
  },
  culture: {
    values: [String],
    workStyle: String,
    environment: String
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
