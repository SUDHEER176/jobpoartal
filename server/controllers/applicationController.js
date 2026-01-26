const Application = require('../models/Application');
const Job = require('../models/Job');

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private (Seeker)
exports.applyForJob = async (req, res) => {
    const { jobId, applicantId, resumeUrl } = req.body;

    try {
        // Check if already applied
        const existing = await Application.findOne({ jobId, applicantId });
        if (existing) {
            return res.status(400).json({ success: false, error: 'Already applied to this job' });
        }

        const application = new Application({
            jobId,
            applicantId,
            resumeUrl
        });

        await application.save();
        res.status(201).json({ success: true, data: application });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get applications for a job (Recruiter ATS)
// @route   GET /api/applications/job/:jobId
exports.getJobApplications = async (req, res) => {
    try {
        const applications = await Application.find({ jobId: req.params.jobId }).sort({ appliedAt: -1 });
        // In real app, we would populate applicant details from User model using `applicantId`
        // Since applicantId is string (supbase ID), we might need a separate lookup or store ref if we change User schema to ObjectId
        // For now, let's assume we fetch user details on client or adjust schema.
        // Let's rely on client fetching user profile by ID for now to keep it simple with Sync.
        res.status(200).json({ success: true, data: applications });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get my applications (Seeker)
// @route   GET /api/applications/user/:userId
exports.getUserApplications = async (req, res) => {
    try {
        const applications = await Application.find({ applicantId: req.params.userId }).populate('jobId');
        res.status(200).json({ success: true, data: applications });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Update application status
// @route   PUT /api/applications/:id/status
// @access  Private (Recruiter)
exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.status(200).json({ success: true, data: application });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
