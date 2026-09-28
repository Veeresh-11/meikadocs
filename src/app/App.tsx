import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MeikaStorage, resetMeikaStorage } from './utils/cookies';
import { LandingPage } from './pages/LandingPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { PricingPage } from './pages/PricingPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { BlogPage } from './pages/BlogPage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { MeikaAuthenticatorPage } from './pages/MeikaAuthenticatorPage';
import { MeikaDocsPage } from './pages/MeikaDocsPage';
import { Navigation } from './components/Navigation';
import { DogScene } from './components/DogScene';
import { IraHelperDialog } from './components/IraHelperDialog';
import { FloatingElements, GridBackground } from './components/FloatingElements';
import { DataExposurePage } from './components/DataExposurePage';
import { AuthPage } from './components/AuthPage';
import { ExposureIntroPage } from './components/ExposureIntroPage';
import { DisclaimerModal } from './components/DisclaimerModal';
import { BackToTop } from './components/BackToTop';
import { ScrollProgress } from './components/ScrollProgress';
import { ToastContainer } from './components/Toast';
import { useToast } from './hooks/useToast';
import { CookieConsentBanner } from './components/CookieConsentBanner';

type Page = 'home' | 'features' | 'pricing' | 'about' | 'contact' | 
  'security' | 'roadmap' | 'blog' | 'careers' | 
  'documentation' | 'api-reference' | 'support' | 'status' |
  'privacy' | 'terms' | 'cookies' | 'gdpr' | 'meika-authenticator' | 'meika-docs';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [scrolled, setScrolled] = useState(false);
  const [isHelperOpen, setIsHelperOpen] = useState(false);
  const [showExposureIntro, setShowExposureIntro] = useState(true); // Always show intro first
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showExposurePage, setShowExposurePage] = useState(false);
  const [showAuthPage, setShowAuthPage] = useState(false);
  const [showDog, setShowDog] = useState(true);
  const [dogMinimised, setDogMinimised] = useState(false);
  const [cookieConsent, setCookieConsent] = useState<'all' | 'required' | 'rejected' | null>(
    () => MeikaStorage.cookieConsent.get()
  );
  const { toasts, removeToast } = useToast();

  // Check storage on mount to determine if we should skip intro
  useEffect(() => {
    const hasAcceptedPrivacy = MeikaStorage.privacyNotice.get();

    // Dev helper — call resetMeikaFlow() in the browser console
    (window as any).resetMeikaFlow = () => {
      resetMeikaStorage();
      setShowExposureIntro(true);
      setShowExposurePage(false);
      setShowDisclaimer(false);
      setCookieConsent(null);
      console.log('✅ Meika flow reset! You should see the intro page again.');
    };
    
    console.log('💡 Dev tip: Call resetMeikaFlow() to reset the user flow for testing');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSkipExposure = () => {
    setShowExposurePage(false);
  };
  
  const handleShowExposure = () => {
    // When clicking from homepage banner, show the intro page
    setShowExposureIntro(true);
  };

  const handleShowAuth = () => {
    setShowAuthPage(true);
  };

  const handleHideAuth = () => {
    setShowAuthPage(false);
  };

  // Handler for "FIND OUT" button on intro page
  const handleFindOut = () => {
    setShowDisclaimer(true);
  };

  // Handler for agreeing to disclaimer
  const handleAgreeDisclaimer = () => {
    setShowDisclaimer(false);
    setShowExposureIntro(false);
    setShowExposurePage(true);
  };

  // Handler for skipping disclaimer
  const handleSkipDisclaimer = () => {
    setShowDisclaimer(false);
    setShowExposureIntro(false);
    // Goes to main home page
  };

  // Handler for skipping intro entirely
  const handleSkipIntro = () => {
    setShowExposureIntro(false);
    // Goes to main home page
  };

  // Show disclaimer as a full page when triggered
  if (showDisclaimer) {
    return <DisclaimerModal onAgree={handleAgreeDisclaimer} onSkip={handleSkipDisclaimer} />;
  }

  // Show exposure intro page on first load
  if (showExposureIntro) {
    return <ExposureIntroPage onFindOut={handleFindOut} onSkip={handleSkipIntro} />;
  }

  // Show data exposure page when requested
  if (showExposurePage) {
    return <DataExposurePage onSkip={handleSkipExposure} />;
  }

  // Show authentication page when requested
  if (showAuthPage) {
    return <AuthPage onHide={handleHideAuth} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage onShowExposure={handleShowExposure} onShowAuth={handleShowAuth} setCurrentPage={setCurrentPage} />;
      case 'features':
        return <FeaturesPage setCurrentPage={setCurrentPage} />;
      case 'pricing':
        return <PricingPage setCurrentPage={setCurrentPage} />;
      case 'about':
        return <AboutPage setCurrentPage={setCurrentPage} />;
      case 'contact':
        return <ContactPage setCurrentPage={setCurrentPage} />;
      case 'security':
        return <PlaceholderPage 
          title="Security" 
          description="Enterprise-grade security measures and compliance certifications to protect your data."
          setCurrentPage={setCurrentPage}
        />;
      case 'roadmap':
        return <PlaceholderPage 
          title="Product Roadmap" 
          description="Explore our vision for the future of secure document management."
          setCurrentPage={setCurrentPage}
        />;
      case 'blog':
        return <BlogPage setCurrentPage={setCurrentPage} />;
      case 'careers':
        return <PlaceholderPage 
          title="Careers" 
          description="Join our mission to make document security accessible to everyone."
          setCurrentPage={setCurrentPage}
        />;
      case 'documentation':
        return <PlaceholderPage 
          title="Documentation" 
          description="Comprehensive guides and API references for developers and users."
          setCurrentPage={setCurrentPage}
        />;
      case 'api-reference':
        return <PlaceholderPage 
          title="API Reference" 
          description="Complete API documentation with code examples and best practices."
          setCurrentPage={setCurrentPage}
        />;
      case 'support':
        return <PlaceholderPage 
          title="Support" 
          description="Get help from our team and explore our knowledge base."
          setCurrentPage={setCurrentPage}
        />;
      case 'status':
        return <PlaceholderPage 
          title="System Status" 
          description="Real-time monitoring of all Meika services and infrastructure."
          setCurrentPage={setCurrentPage}
        />;
      case 'privacy':
        return <PlaceholderPage 
          title="Privacy Policy" 
          description="How we collect, use, and protect your personal information."
          setCurrentPage={setCurrentPage}
        />;
      case 'terms':
        return <PlaceholderPage 
          title="Terms of Service" 
          description="Legal terms and conditions for using Meika services."
          setCurrentPage={setCurrentPage}
        />;
      case 'cookies':
        return <CookiePolicyPage setCurrentPage={setCurrentPage} />;
      case 'gdpr':
        return <PlaceholderPage 
          title="GDPR Compliance" 
          description="Our commitment to European data protection regulations."
          setCurrentPage={setCurrentPage}
        />;
      case 'meika-authenticator':
        return <MeikaAuthenticatorPage setCurrentPage={setCurrentPage} />;
      case 'meika-docs':
        return <MeikaDocsPage setCurrentPage={setCurrentPage} />;
      default:
        return <LandingPage onShowExposure={handleShowExposure} onShowAuth={handleShowAuth} setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] text-white relative overflow-x-hidden">
      {/* Animated grid background - Hidden on Authenticator page */}
      {currentPage !== 'meika-authenticator' && currentPage !== 'meika-docs' && <GridBackground />}
      
      {/* Floating security icons - Hidden on Authenticator page */}
      {currentPage !== 'meika-authenticator' && currentPage !== 'meika-docs' && <FloatingElements />}
      
      {/* Ira the Dog - Hidden on pricing page; minimised when user closes dog */}
      {currentPage !== 'pricing' && currentPage !== 'meika-docs' && showDog && !dogMinimised && (
        <DogScene
          interactive
          onDogClick={() => setIsHelperOpen(true)}
          isActive={isHelperOpen}
          theme={currentPage === 'meika-authenticator' ? 'blue-green' : 'yellow'}
          onClose={() => { setIsHelperOpen(false); setDogMinimised(true); }}
        />
      )}

      {/* Reopen Ira button — shown when dog is minimised */}
      {currentPage !== 'pricing' && currentPage !== 'meika-docs' && showDog && dogMinimised && (
        <motion.button
          className={`fixed bottom-6 right-6 z-30 flex items-center gap-2 px-4 py-3 rounded-full backdrop-blur-sm border shadow-lg text-sm font-medium transition-all ${
            currentPage === 'meika-authenticator'
              ? 'bg-blue-900/60 border-blue-500/40 text-blue-300 hover:bg-blue-800/70 shadow-blue-500/20'
              : 'bg-amber-900/60 border-amber-500/40 text-amber-300 hover:bg-amber-800/70 shadow-amber-500/20'
          }`}
          onClick={() => { setDogMinimised(false); setIsHelperOpen(true); }}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className={`w-2 h-2 rounded-full animate-pulse ${currentPage === 'meika-authenticator' ? 'bg-blue-400' : 'bg-amber-400'}`} />
          Ask Ira
        </motion.button>
      )}

      {/* Ira Helper Dialog */}
      <IraHelperDialog
        isOpen={isHelperOpen}
        onClose={() => setIsHelperOpen(false)}
        theme={currentPage === 'meika-authenticator' ? 'blue-green' : 'yellow'}
      />
      
      {/* Only show main navigation when NOT on Meika Authenticator page */}
      {currentPage !== 'meika-authenticator' && currentPage !== 'meika-docs' && (
        <Navigation
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          scrolled={scrolled}
          onSignInClick={handleShowAuth}
        />
      )}
      <main className="relative z-10">
        {renderPage()}
      </main>
      <BackToTop theme={currentPage === 'meika-authenticator' ? 'blue-green' : 'yellow'} />
      <ScrollProgress theme={currentPage === 'meika-authenticator' ? 'blue-green' : 'yellow'} />
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Cookie consent banner — shown until the user makes a choice */}
      {cookieConsent === null && (
        <CookieConsentBanner
          onDecision={(choice) => setCookieConsent(choice)}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}