const Job = require('../models/Job');

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private (Recruiter only)
exports.createJob = async (req, res) => {
    try {
        // In a real app, userId comes from middleware
        const { title, company, logo, location, type, salaryRange, description, requirements, recruiterId } = req.body;

        const job = new Job({
            title, company, logo, location, type, salaryRange, description, requirements, recruiterId
        });

        await job.save();

        // Emit real-time update
        const io = req.app.get('socketio');
        if (io) {
            io.emit('newJob', job);
        }

        res.status(201).json({ success: true, data: job });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get all jobs (with filters)
// @route   GET /api/jobs
// @access  Public
exports.getJobs = async (req, res) => {
    try {
        const { keyword, location, type, categories, experienceLevel, datePosted } = req.query;
        let query = { status: 'active' };

        if (keyword) {
            query.$text = { $search: keyword };
        }
        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }
        if (type) {
            query.type = type;
        }
        if (categories) {
            const catArray = Array.isArray(categories) ? categories : [categories];
            query.category = { $in: catArray };
        }
        if (experienceLevel) {
            query.experienceLevel = experienceLevel;
        }
        if (datePosted && datePosted !== 'All') {
            let dateThreshold = new Date();
            if (datePosted === 'Last Hour') dateThreshold.setHours(dateThreshold.getHours() - 1);
            else if (datePosted === 'Last 24 Hours') dateThreshold.setHours(dateThreshold.getHours() - 24);
            else if (datePosted === 'Last 7 Days') dateThreshold.setDate(dateThreshold.getDate() - 7);
            else if (datePosted === 'Last 30 Days') dateThreshold.setDate(dateThreshold.getDate() - 30);

            query.createdAt = { $gte: dateThreshold };
        }

        const { sortBy } = req.query;
        let sortOption = { createdAt: -1 };
        if (sortBy === 'oldest') sortOption = { createdAt: 1 };

        const jobs = await Job.find(query).sort(sortOption);
        res.status(200).json({ success: true, count: jobs.length, data: jobs });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ success: false, error: 'Job not found' });
        res.status(200).json({ success: true, data: job });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get jobs by recruiter
// @route   GET /api/jobs/recruiter/:recruiterId
exports.getRecruiterJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ recruiterId: req.params.recruiterId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: jobs });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
