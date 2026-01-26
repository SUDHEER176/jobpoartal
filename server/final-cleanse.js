const mongoose = require('mongoose');
require('dotenv').config();

async function cleanseDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for final cleansing...');

        const Job = mongoose.model('Job', new mongoose.Schema({
            company: String,
            logo: String
        }));

        // Find ALL jobs with clearbit anywhere in the logo field
        const jobs = await Job.find({ logo: /clearbit/i });
        console.log(`Found ${jobs.length} total jobs with Clearbit logos.`);

        let cleanedCount = 0;
        for (const job of jobs) {
            const oldLogo = job.logo;
            job.logo = job.logo.replace(/logo\.clearbit\.com/i, 'unavatar.io');
            await job.save();
            console.log(`Cleaned: [${job.company}] ${oldLogo} -> ${job.logo}`);
            cleanedCount++;
        }

        console.log(`Successfully cleansed ${cleanedCount} jobs.`);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

cleanseDB();
