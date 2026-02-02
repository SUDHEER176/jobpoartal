# 🚀 CareerConnect | Full-Stack Job Recruitment Platform

A premium, high-performance job portal designed to bridge the gap between talented job seekers and top-tier recruiters. Built with a focus on **visual excellence**, **smooth interactions**, and **robust security**.

---

## ✨ Key Features

### 👤 For Job Seekers
- **Premium Onboarding:** A multi-step, animated onboarding flow to build a complete professional profile.
- **Advanced Job Discovery:** Filter jobs by category, location, and salary with real-time feedback.
- **Secure Applications:** Integrated resume management and one-click application process.
- **Dynamic Dashboard:** Track application statuses and personalized job recommendations.

### 🏢 For Recruiters
- **Intuitive Job Posting:** Streamlined interface for creating and managing job listings.
- **Applicant Tracking:** Manage incoming applications with detailed seeker profiles.
- **Company Branding:** Customizable company profiles with logo and culture displays.

### 🛠 Tech Highlights
- **Real-time Updates:** Powered by Socket.io for instant notifications and data syncing.
- **Vibrant UI:** Glassmorphism aesthetics, GSAP/Framer Motion animations, and a responsive dark/light theme.
- **Secure Auth:** Integrated Supabase & Google OAuth for industry-standard security.

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS 4, Framer Motion, GSAP |
| **Backend** | Node.js, Express.js, Socket.io |
| **Database** | MongoDB (Mongoose), Supabase |
| **UI Components** | Radix UI, Lucide Icons, Embla Carousel |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB account
- Supabase account (for Authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/job-portal.git
   cd job-portal
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   # Create a .env file and add your MONGO_URI and PORT
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd client
   npm install
   # Create a .env file for Supabase keys
   npm run dev
   ```

---

## 📘 Project Architecture & Design

### Technical Implementation
The project follows a **MERN** architecture, enhanced with **Supabase** for robust authentication. By leveraging a decoupled frontend and backend, the system ensures high scalability. I implemented **RESTful APIs** to manage complex data relations between users, jobs, and applications.

### UI/UX Design Philosophy
*   **Micro-interactions:** Used GSAP and Framer Motion to create smooth transitions.
*   **Aesthetics:** Modern Glassmorphism using semi-transparent layers for depth.
*   **Responsive:** Fully mobile-first design using Tailwind CSS.

---

## 🛡 License
Distributed under the ISC License.

---
**Developed with ❤️ by Sudheer**
