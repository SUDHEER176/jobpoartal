const User = require('../models/User');

// @desc    Sync Supabase user to MongoDB
// @route   POST /api/auth/sync
// @access  Private (Called after Supabase Auth on client)
exports.syncUser = async (req, res) => {
    const { userId, email, role, profile } = req.body;

    try {
        let user = await User.findOne({ userId });

        if (!user) {
            user = new User({
                userId,
                email,
                role: role || 'seeker',
                profile: profile || {}
            });
            await user.save();
            return res.status(201).json({ success: true, data: user, isNew: true });
        }

        // Update existing user profile if data is provided
        if (profile) {
            user.profile = { ...user.profile, ...profile };
        }
        if (role) {
            user.role = role;
        }
        await user.save();

        res.status(200).json({ success: true, data: user, isNew: false });
    } catch (error) {
        console.error('Sync Error:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get current user profile
// @route   GET /api/auth/me/:userId
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });
        if (!user) return res.status(404).json({ success: false, error: 'User not found' });
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
// @desc    Update onboarding progress
// @route   PUT /api/auth/onboarding
exports.updateOnboarding = async (req, res) => {
    const { userId, step, onboardingStatus, profile, preferences, culture, resume } = req.body;

    try {
        let user = await User.findOne({ userId });
        if (!user) return res.status(404).json({ success: false, error: 'User not found' });

        if (step) user.onboardingStep = step;
        if (onboardingStatus) user.onboardingStatus = onboardingStatus;
        if (profile) user.profile = { ...user.profile, ...profile };
        if (preferences) user.preferences = { ...user.preferences, ...preferences };
        if (culture) user.culture = { ...user.culture, ...culture };
        if (resume) {
            user.profile = { ...user.profile, resume };
        }

        await user.save();
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error('Onboarding Update Error:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
