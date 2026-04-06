import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './index.css'

import LoginPage from './pages/login'
import ServiceContactPage from './pages/ServiceContact'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import PortfolioPage from './pages/PortfolioPage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailWebPage from './pages/ServiceDetailWebDev'

// --- Admin Imports ---
import AdminLayout from './layouts/AdminLayout'
import AdminPortfolioList from './pages/admin/AdminPortfolioList'
import AdminPortfolioForm from './pages/admin/AdminPortfolioForm'
import AdminUsers from './pages/admin/UserManagement'

import AdminAddService from './pages/admin/services/AdminAddService'
import AdminServicesList from './pages/admin/services/AdminServicesList'

import AdminInquiries from './pages/admin/AdminInquiries'
import AdminEditService from './pages/admin/services/AdminEditService'
import AdminMedia from './pages/admin/AdminMedia'

import AdminServicePlansList from "./pages/admin/services/AdminServicePlansList";
import AdminServicePlansForm from "./pages/admin/services/AdminServicePlansForm";

// Analytics
import AnalyticsDashboard from './pages/admin/AnalyticsDashboard';

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/services/consultation" element={<ServiceContactPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/services" element={<ServicesPage />} />

        {/* Dynamic service detail route */}
        <Route path="/services/:slug" element={<ServiceDetailWebPage />} />

        {/* --- Admin Routes --- */}
        <Route path="/admin/portfolio" element={<AdminLayout><AdminPortfolioList /></AdminLayout>} />
        <Route path="/admin/portfolio/create" element={<AdminLayout><AdminPortfolioForm /></AdminLayout>} />
        <Route path="/admin/portfolio/edit/:id" element={<AdminLayout><AdminPortfolioForm isEdit /></AdminLayout>} />

        <Route path="/admin/services" element={<AdminLayout><AdminServicesList /></AdminLayout>} />
        <Route path="/admin/services/add" element={<AdminLayout><AdminAddService /></AdminLayout>} />
        <Route path="/admin/services/edit/:id" element={<AdminLayout><AdminEditService /></AdminLayout>} />

        <Route path="/admin/inquiries" element={<AdminLayout><AdminInquiries /></AdminLayout>} />
        <Route path="/admin/users" element={<AdminLayout><AdminUsers /></AdminLayout>} />
        <Route path="/admin/media" element={<AdminLayout><AdminMedia /></AdminLayout>} />+

        <Route path="/admin/services/:serviceId/plans/add" element={<AdminLayout><AdminServicePlansForm /></AdminLayout>} />
        <Route
          path="/admin/services/:serviceId/plans/edit/:planId"
          element={<AdminLayout><AdminServicePlansForm /></AdminLayout>}
        />
        <Route path="/admin/services/:serviceId/plans" element={<AdminLayout><AdminServicePlansList /></AdminLayout>} />
        <Route path="/admin/analytics" element={<AdminLayout><AnalyticsDashboard /></AdminLayout>} />
      </Routes>
    </>
  )
}