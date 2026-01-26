const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.status(200).json({ status: 'ok', timestamp: new Date() });
});

const { syncUser, getProfile, updateOnboarding } = require('../controllers/authController');
const { createJob, getJobs, getJobById, getRecruiterJobs } = require('../controllers/jobController');
const { applyForJob, getJobApplications, getUserApplications, updateStatus } = require('../controllers/applicationController');

// Auth Routes
router.post('/auth/sync', syncUser);
router.get('/auth/me/:userId', getProfile);
router.put('/auth/onboarding', updateOnboarding);

// Job Routes
router.post('/jobs', createJob);
router.get('/jobs', getJobs);
router.get('/jobs/:id', getJobById);
router.get('/jobs/recruiter/:recruiterId', getRecruiterJobs);

// Application Routes
router.post('/applications', applyForJob);
router.get('/applications/job/:jobId', getJobApplications);
router.get('/applications/user/:userId', getUserApplications);
router.put('/applications/:id/status', updateStatus);

module.exports = router;
