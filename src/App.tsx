import React, { useState, useEffect } from 'react';
import { PageRoute } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { QuoteModal } from './components/QuoteModal';
import { HomePage } from './pages/HomePage';
import { InternationalHolidaysPage } from './pages/InternationalHolidaysPage';
import { DomesticHolidaysPage } from './pages/DomesticHolidaysPage';
import { ServicesPage } from './pages/ServicesPage';
import { CustomTripPage } from './pages/CustomTripPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPortal } from './pages/admin/AdminPortal';

export default function App() {
  // Read initial route from URL path or hash fallback (e.g. /admin or #admin)
  const getInitialRoute = (): PageRoute => {
    if (typeof window === 'undefined') return '/';
    const path = window.location.pathname;
    const hash = window.location.hash.replace('#', '');
    
    if (path === '/admin' || hash === 'admin' || hash === '/admin') {
      return '/admin';
    }

    const validRoutes: PageRoute[] = [
      '/',
      '/international-holidays',
      '/domestic-holidays',
      '/services',
      '/custom-trip',
      '/about',
      '/contact',
      '/admin'
    ];
    return validRoutes.includes(path as PageRoute) ? (path as PageRoute) : '/';
  };

  const [currentRoute, setCurrentRoute] = useState<PageRoute>(getInitialRoute);
  
  // Quote modal state
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteModalInitialItem, setQuoteModalInitialItem] = useState<string>('');

  // Handle browser back/forward buttons and hash navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(getInitialRoute());
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Update URL and document title on route change
  const navigateTo = (route: PageRoute) => {
    if (route !== currentRoute) {
      window.history.pushState({}, '', route);
      setCurrentRoute(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Dynamic SEO title based on page
    let pageTitle = 'Happy Journey Holidays | Best Travel Agency in Coimbatore';
    switch (route) {
      case '/admin':
        pageTitle = 'Private Administrator Portal | Happy Journey Holidays';
        break;
      case '/international-holidays':
        pageTitle = 'International Holiday Packages | Singapore, Malaysia, Dubai, Bali, Europe | Happy Journey Holidays Coimbatore';
        break;
      case '/domestic-holidays':
        pageTitle = 'Domestic Tour Packages | Kerala, Munnar, Ooty, Kashmir, Goa | Happy Journey Holidays Coimbatore';
        break;
      case '/services':
        pageTitle = 'Travel Services | Flight Booking, Hotels, Visa Assistance, Cabs Coimbatore | Happy Journey Holidays';
        break;
      case '/custom-trip':
        pageTitle = 'Plan Custom Holiday Trip | Tailor-Made Tours from Coimbatore | Happy Journey Holidays';
        break;
      case '/about':
        pageTitle = 'About Us | Tour Operator in Neelambur, Coimbatore | Happy Journey Holidays';
        break;
      case '/contact':
        pageTitle = 'Contact Us | 6374509488 | Neelambur Office, Coimbatore | Happy Journey Holidays';
        break;
      default:
        pageTitle = 'Happy Journey Holidays | Best Travel Agency in Coimbatore | Holiday Packages & Visas';
    }
    document.title = pageTitle;
  };

  const handleOpenQuoteModal = (initialServiceOrDestination?: string) => {
    setQuoteModalInitialItem(initialServiceOrDestination || '');
    setQuoteModalOpen(true);
  };

  // If currently navigating the private admin portal, render dedicated Admin Portal
  if (currentRoute === '/admin') {
    return <AdminPortal onNavigateHome={() => navigateTo('/')} />;
  }

  // Determine current active public page component
  const renderCurrentPage = () => {
    switch (currentRoute) {
      case '/':
        return (
          <HomePage 
            onNavigate={navigateTo} 
            onOpenQuoteModal={handleOpenQuoteModal} 
          />
        );
      case '/international-holidays':
        return (
          <InternationalHolidaysPage 
            onNavigate={navigateTo} 
            onOpenQuoteModal={handleOpenQuoteModal} 
          />
        );
      case '/domestic-holidays':
        return (
          <DomesticHolidaysPage 
            onNavigate={navigateTo} 
            onOpenQuoteModal={handleOpenQuoteModal} 
          />
        );
      case '/services':
        return (
          <ServicesPage 
            onNavigate={navigateTo} 
            onOpenQuoteModal={handleOpenQuoteModal} 
          />
        );
      case '/custom-trip':
        return (
          <CustomTripPage 
            onNavigate={navigateTo} 
          />
        );
      case '/about':
        return (
          <AboutPage 
            onNavigate={navigateTo} 
            onOpenQuoteModal={handleOpenQuoteModal} 
          />
        );
      case '/contact':
        return (
          <ContactPage 
            onNavigate={navigateTo} 
          />
        );
      default:
        return (
          <HomePage 
            onNavigate={navigateTo} 
            onOpenQuoteModal={handleOpenQuoteModal} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#000B18] text-slate-100 selection:bg-[#F27D26] selection:text-white font-sans">
      {/* Global Header */}
      <Header
        currentRoute={currentRoute}
        onRouteChange={navigateTo}
        onOpenQuoteModal={handleOpenQuoteModal}
      />

      {/* Main Page Body */}
      <main className="flex-1 w-full">
        {renderCurrentPage()}
      </main>

      {/* Global Footer */}
      <Footer
        onRouteChange={navigateTo}
        onOpenQuoteModal={handleOpenQuoteModal}
      />

      {/* Persistent WhatsApp Floating Button */}
      <WhatsAppFloat 
        currentDestination={
          currentRoute === '/international-holidays' 
            ? 'International Holidays' 
            : currentRoute === '/domestic-holidays'
            ? 'Domestic Holidays'
            : currentRoute === '/services'
            ? 'Travel Services & Visas'
            : undefined
        } 
      />

      {/* Global Quote Request Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialDestinationOrService={quoteModalInitialItem}
      />
    </div>
  );
}
