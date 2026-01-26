const mongoose = require('mongoose');
require('dotenv').config();

async function dumpLogos() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const Job = mongoose.model('Job', new mongoose.Schema({
            company: String,
            logo: String
        }));

        const jobs = await Job.find({ logo: { $exists: true, $ne: "" } });
        console.log(`Checking ${jobs.length} jobs with logos:`);

        jobs.forEach(j => {
            console.log(`[${j.company}] -> ${j.logo}`);
        });

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

dumpLogos();
