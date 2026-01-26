const mongoose = require('mongoose');
const Job = require('./models/Job');
require('dotenv').config();

const sampleJobs = [
    {
        title: "Senior Frontend Engineer",
        company: "Google",
        logo: "https://unavatar.io/google.com",
        location: "Mountain View, CA",
        type: "Full-time",
        category: "Frontend",
        experienceLevel: "Senior",
        salaryRange: "$150k - $200k",
        description: "Join Google's Core UI team to build the next generation of web interfaces. You will work with React, TypeScript, and cutting-edge web technologies.",
        requirements: ["5+ years React experience", "Expert TypeScript skills", "Deep understanding of web performance"],
        recruiterId: "seed-recruiter-id-1",
        status: "active"
    },
    {
        title: "Backend Developer",
        company: "Microsoft",
        logo: "https://unavatar.io/microsoft.com",
        location: "Redmond, WA",
        type: "Full-time",
        category: "Backend",
        experienceLevel: "Mid-level",
        salaryRange: "$130k - $170k",
        description: "We are looking for a C# / .NET expert to join the Azure Cloud Services team. You will be responsible for building scalable microservices.",
        requirements: ["3+ years .NET/C#", "Experience with Azure or AWS", "Microservices architecture"],
        recruiterId: "seed-recruiter-id-1",
        status: "active"
    },
    {
        title: "Full Stack Developer",
        company: "Amazon",
        logo: "https://unavatar.io/amazon.com",
        location: "Seattle, WA",
        type: "Contract",
        category: "Full Stack",
        experienceLevel: "Mid-level",
        salaryRange: "$80 - $120 / hr",
        description: "Help us build the future of e-commerce. You will work on both the customer-facing frontend and the robust backend services that power Amazon.",
        requirements: ["React and Node.js proficiency", "AWS experience", "Problem-solving mindset"],
        recruiterId: "seed-recruiter-id-1",
        status: "active"
    },
    {
        title: "UI/UX Designer",
        company: "Netflix",
        logo: "https://unavatar.io/netflix.com",
        location: "Los Gatos, CA",
        type: "Full-time",
        category: "Design",
        experienceLevel: "Senior",
        salaryRange: "$160k - $220k",
        description: "Design the user experiences that entertain millions. You will be responsible for creating intuitive and beautiful interfaces for our streaming service.",
        requirements: ["Portfolio of world-class design", "Expert in Figma", "Experience with motion design"],
        recruiterId: "seed-recruiter-id-1",
        status: "active"
    },
    {
        title: "Product Manager",
        company: "Meta",
        logo: "https://unavatar.io/meta.com",
        location: "Menlo Park, CA",
        type: "Full-time",
        category: "Product",
        experienceLevel: "Lead",
        salaryRange: "$180k - $250k",
        description: "Meta is seeking a Product Manager to lead development in our VR/AR division. You will define the product roadmap and work with engineering teams.",
        requirements: ["5+ years product management", "Experience in VR/AR preferred", "Strong analytical skills"],
        recruiterId: "seed-recruiter-id-1",
        status: "active"
    },
    {
        title: "Data Scientist",
        company: "Spotify",
        logo: "https://unavatar.io/spotify.com",
        location: "New York, NY",
        type: "Full-time",
        category: "Data Science",
        experienceLevel: "Mid-level",
        salaryRange: "$140k - $190k",
        description: "Use data to help discover the next hit song. You will analyze user behavior and build recommendation algorithms.",
        requirements: ["Master's in Math/Stats or CS", "Python and SQL expertise", "ML Frameworks like PyTorch or TensorFlow"],
        recruiterId: "seed-recruiter-id-1",
        status: "active"
    },
    {
        title: "iOS Developer",
        company: "Apple",
        logo: "https://unavatar.io/apple.com",
        location: "Cupertino, CA",
        type: "Full-time",
        category: "Mobile",
        experienceLevel: "Senior",
        salaryRange: "$170k - $230k",
        description: "Build the next generation of iOS applications. You will work on core system features and ensure the highest level of performance and quality.",
        requirements: ["Expert Swift developer", "Strong knowledge of iOS SDK", "Attention to UI detail"],
        recruiterId: "seed-recruiter-id-1",
        status: "active"
    },
    {
        title: "DevOps Engineer",
        company: "GitHub",
        logo: "https://unavatar.io/github.com",
        location: "Remote",
        type: "Full-time",
        category: "Infrastructure",
        experienceLevel: "Senior",
        salaryRange: "$150k - $210k",
        description: "Help scale the platform that developers love. You will manage our CI/CD pipelines and ensure the reliability of our infrastructure.",
        requirements: ["Strong Kubernetes experience", "Terraform and Ansible", "Golang or Ruby knowledge"],
        recruiterId: "seed-recruiter-id-1",
        status: "active"
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing seeded jobs to avoid duplicates and update URLs
        await Job.deleteMany({ recruiterId: "seed-recruiter-id-1" });
        console.log('Cleared existing seeded jobs.');

        await Job.insertMany(sampleJobs);
        console.log('Successfully seeded sample jobs with Unavatar logos!');

        process.exit();
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};

seedDB();
