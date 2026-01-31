import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import AuthPage from './pages/Auth'
import AuthCallback from './pages/AuthCallback'
import Dashboard from './pages/Dashboard'
import PostJob from './pages/PostJob'
import ProtectedRoute from './components/ProtectedRoute'

import JobList from './pages/JobList'
import JobDetails from './pages/JobDetails'

import JobApplications from './pages/JobApplications'
import MyApplications from './pages/MyApplications'
import MyJobs from './pages/MyJobs'
import Onboarding from './pages/Onboarding'

import AdminDashboard from './pages/AdminDashboard'
import RecruiterLanding from './pages/RecruiterLanding'
import SeekerLanding from './pages/SeekerLanding'
import Preloader from './components/Preloader'

import About from './pages/About'
import SuccessStories from './pages/SuccessStories'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import HelpCenter from './pages/HelpCenter'
import Integrations from './pages/Integrations'

function App() {
  const [isBackendReady, setIsBackendReady] = useState(false);

  useEffect(() => {
    let timeoutId;
    const startTime = Date.now();
    const MIN_LOADING_TIME = 1000; // 1 second minimum for premium feel

    const checkBackend = async () => {
      try {
        const response = await fetch('/api/health');
        if (response.ok) {
          const elapsed = Date.now() - startTime;
          const remainingDelay = Math.max(0, MIN_LOADING_TIME - elapsed);

          setTimeout(() => {
            setIsBackendReady(true);
          }, remainingDelay);
        } else {
          timeoutId = setTimeout(checkBackend, 1500);
        }
      } catch (error) {
        timeoutId = setTimeout(checkBackend, 1500);
      }
    };

    checkBackend();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider>
        {!isBackendReady ? (
          <Preloader />
        ) : (
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="post-job" element={<ProtectedRoute allowedRoles={['recruiter']}><PostJob /></ProtectedRoute>} />
                <Route path="jobs" element={<JobList />} />
                <Route path="jobs/:id" element={<JobDetails />} />
                <Route path="job-applications/:jobId" element={<ProtectedRoute allowedRoles={['recruiter']}><JobApplications /></ProtectedRoute>} />
                <Route path="my-applications" element={<ProtectedRoute allowedRoles={['seeker']}><MyApplications /></ProtectedRoute>} />
                <Route path="my-jobs" element={<ProtectedRoute allowedRoles={['recruiter']}><MyJobs /></ProtectedRoute>} />
                <Route path="onboarding" element={<ProtectedRoute allowedRoles={['seeker']}><Onboarding /></ProtectedRoute>} />
                <Route path="for-recruiters" element={<RecruiterLanding />} />
                <Route path="for-jobseekers" element={<SeekerLanding />} />
                <Route path="admin" element={<AdminDashboard />} />

                {/* Informational Pages */}
                <Route path="about" element={<About />} />
                <Route path="success-stories" element={<SuccessStories />} />
                <Route path="terms" element={<Terms />} />
                <Route path="privacy" element={<Privacy />} />
                <Route path="help-center" element={<HelpCenter />} />
                <Route path="integrations" element={<Integrations />} />
              </Route>
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
            </Routes>
          </AuthProvider>
        )}
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
