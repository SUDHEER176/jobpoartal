const mongoose = require('mongoose');
require('dotenv').config();

async function migrateLogos() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for logo migration...');

        const Job = mongoose.model('Job', new mongoose.Schema({
            logo: String
        }));

        const jobs = await Job.find({ logo: { $regex: 'logo.clearbit.com', $options: 'i' } });
        console.log(`Found ${jobs.length} jobs with Clearbit logos.`);

        let updatedCount = 0;
        for (const job of jobs) {
            job.logo = job.logo.replace('logo.clearbit.com', 'unavatar.io');
            await job.save();
            updatedCount++;
        }

        console.log(`Successfully migrated ${updatedCount} logos manually.`);
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
}

migrateLogos();
