import { useState, useEffect } from "react";
import { Navigation } from "./components/nav.jsx";
import { LandingPage } from "./components/landingPage.jsx";
import { CompanyDashboard } from "./components/company.jsx";
import { StudentDashboard } from "./components/StudentDashboard.jsx";
import { LoginPage } from "./components/login-page";
import { Chatbot } from "./components/chatbot";

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [userType, setUserType] = useState(null);
  const [theme, setTheme] = useState('light');
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = (type) => {
    setUserType(type);
    setShowLogin(false);
    if (type === 'company') {
      setActiveTab('companies');
    } else {
      setActiveTab('students');
    }
  };

  const handleLogout = () => {
    setUserType(null);
    setActiveTab('home');
  };

  const handleGetStarted = (type) => {
    // Show login page instead of auto-login
    setShowLogin(true);
  };

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  const handleBackToHome = () => {
    setShowLogin(false);
    setActiveTab('home');
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  // Apply theme class to document root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const renderContent = () => {
    // Show login page if showLogin is true
    if (showLogin) {
      return <LoginPage onLogin={handleLogin} onBack={handleBackToHome} />;
    }

    if (userType === 'company' && activeTab === 'companies') {
      return <CompanyDashboard />;
    }
    
    if (userType === 'student' && activeTab === 'students') {
      return <StudentDashboard />;
    }
    
    // Show landing page for home tab or when not logged in
    return <LandingPage onGetStarted={handleGetStarted} />;
  };

  return (
    <div className="min-h-screen bg-background">
      {!showLogin && (
        <Navigation 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          userType={userType}
          onLogin={handleShowLogin}
          onLogout={handleLogout}
          theme={theme}
          onThemeChange={handleThemeChange}
        />
      )}
      <main>
        {renderContent()}
      </main>
      {/* Show chatbot only on landing page when not logged in */}
      {!userType && !showLogin && activeTab === 'home' && <Chatbot />}
    </div>
  );
}