const mongoose = require('mongoose');
require('dotenv').config();

async function extremeCleansing() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for extreme cleansing...');

        const Job = mongoose.model('Job', new mongoose.Schema({
            logo: String,
            company: String
        }));

        // Find ALL jobs, check logos manually
        const jobs = await Job.find({});
        console.log(`Checking ${jobs.length} total jobs...`);

        let fixedCount = 0;
        for (const job of jobs) {
            if (job.logo && job.logo.includes('clearbit')) {
                const old = job.logo;
                job.logo = job.logo.replace('logo.clearbit.com', 'unavatar.io');
                await Job.updateOne({ _id: job._id }, { $set: { logo: job.logo } });
                console.log(`Fixed: ${job.company} | ${old} -> ${job.logo}`);
                fixedCount++;
            }
        }

        console.log(`Extreme cleansing complete. Fixed ${fixedCount} jobs.`);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

extremeCleansing();
