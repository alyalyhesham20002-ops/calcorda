import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

const Dashboard = lazy(() => import('./components/Dashboard'));
const CalculatorPage = lazy(() => import('./components/CalculatorPage'));
const AboutUs = lazy(() => import('./components/pages/AboutUs'));
const ContactUs = lazy(() => import('./components/pages/ContactUs'));
const PrivacyPolicy = lazy(() => import('./components/pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./components/pages/TermsOfService'));
const AnalyticsDashboard = lazy(() => import('./components/pages/AnalyticsDashboard'));
const Help = lazy(() => import('./components/pages/Help'));
const SendFeedback = lazy(() => import('./components/pages/SendFeedback'));
const CookiePolicy = lazy(() => import('./components/pages/CookiePolicy'));
const CookieSettings = lazy(() => import('./components/pages/CookieSettings'));

function App(): JSX.Element {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-300">
        <Header />
        <main className="flex-grow">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/calculator/:calculatorId" element={<CalculatorPage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/analytics" element={<AnalyticsDashboard />} />
              <Route path="/help" element={<Help />} />
              <Route path="/feedback" element={<SendFeedback />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/cookie-settings" element={<CookieSettings />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
