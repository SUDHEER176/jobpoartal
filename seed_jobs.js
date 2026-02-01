
const mongoose = require('mongoose');
require('dotenv').config({ path: './server/.env' });
const Job = require('./server/models/Job');

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/jobportal';

const demoJobs = [
    {
        title: 'Senior Software Engineer',
        company: 'Google',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png',
        location: 'Mountain View, CA',
        type: 'Full-time',
        category: 'Development',
        experienceLevel: 'Senior',
        salaryRange: '$180k - $250k',
        description: 'Google is looking for a Senior Software Engineer to join our Core Search team. You will be helping to build the next generation of search.',
        requirements: ['5+ years of experience', 'Proficiency in C++ or Java', 'Strong algorithm skills', 'BS/MS in Computer Science'],
        recruiterId: 'demo_recruiter_id',
        status: 'active'
    },
    {
        title: 'Product Designer',
        company: 'Apple',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
        location: 'Cupertino, CA',
        type: 'Full-time',
        category: 'Design',
        experienceLevel: 'Mid-Level',
        salaryRange: '$140k - $200k',
        description: 'Design world-class experiences for Apple products. Join the team responsible for iOS UI design.',
        requirements: ['3+ years of product design experience', 'Strong portfolio', 'Experience with Figma/Sketch', 'Attention to detail'],
        recruiterId: 'demo_recruiter_id',
        status: 'active'
    },
    {
        title: 'Cloud Architect',
        company: 'Amazon',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2048px-Amazon_icon.svg.png',
        location: 'Seattle, WA',
        type: 'Full-time',
        category: 'Cloud',
        experienceLevel: 'Senior',
        salaryRange: '$160k - $230k',
        description: 'Architect scalable cloud solutions on AWS. Work with enterprise customers to migrate workloads to the cloud.',
        requirements: ['AWS Certified Solutions Architect', '5+ years cloud experience', 'Knowledge of Kubernetes', 'Strong communication skills'],
        recruiterId: 'demo_recruiter_id',
        status: 'active'
    },
    {
        title: 'Product Manager',
        company: 'Netflix',
        logo: 'https://cdn.iconscout.com/icon/free/png-256/free-netflix-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-4-pack-logos-icons-2944962.png',
        location: 'Los Gatos, CA',
        type: 'Full-time',
        category: 'Product',
        experienceLevel: 'Senior',
        salaryRange: '$250k - $400k',
        description: 'Lead product strategy for Netflix personalization algorithms. Improve content discovery for millions of users.',
        requirements: ['7+ years product experience', 'Data-driven mindset', 'Experience with ML products', 'Strong leadership skills'],
        recruiterId: 'demo_recruiter_id',
        status: 'active'
    },
    {
        title: 'Frontend Developer',
        company: 'Meta',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png',
        location: 'Menlo Park, CA',
        type: 'Full-time',
        category: 'Development',
        experienceLevel: 'Junior',
        salaryRange: '$120k - $160k',
        description: 'Build user interfaces for the Metaverse. Work on React and VR/AR experiences.',
        requirements: ['2+ years with React', 'Strong JS/TS skills', 'Interest in AR/VR', 'BS in Computer Science'],
        recruiterId: 'demo_recruiter_id',
        status: 'active'
    }
];

mongoose.connect(mongoURI)
    .then(async () => {
        console.log('Connected to MongoDB');
        try {
            await Job.insertMany(demoJobs);
            console.log('Demo jobs inserted successfully!');
        } catch (err) {
            console.error('Error inserting jobs:', err);
        } finally {
            mongoose.connection.close();
            process.exit(0);
        }
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });
