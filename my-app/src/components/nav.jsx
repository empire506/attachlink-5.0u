import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ThemeToggle } from "./theme-toggle";
import { BriefcaseIcon, GraduationCapIcon, MenuIcon } from "lucide-react";

export function Navigation({ activeTab, onTabChange, userType, onLogin, onLogout, theme, onThemeChange }) {
  const handleNavClick = (tab) => {
    // If user clicks on Companies or Students tab while not logged in, prompt to login
    if (tab === 'companies' && !userType) {
      onLogin('company');
    } else if (tab === 'students' && !userType) {
      onLogin('student');
    } else {
      onTabChange(tab);
    }
  };

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => onTabChange('home')}>
              <GraduationCapIcon className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-semibold text-foreground">AttachLink</span>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button
                onClick={() => handleNavClick('home')}
                className={`px-3 py-2 rounded-md transition-colors ${
                  activeTab === 'home' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('companies')}
                className={`px-3 py-2 rounded-md transition-colors ${
                  activeTab === 'companies' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                For Companies
              </button>
              <button
                onClick={() => handleNavClick('students')}
                className={`px-3 py-2 rounded-md transition-colors ${
                  activeTab === 'students' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                For Students
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle theme={theme} onThemeChange={onThemeChange} />
            {userType ? (
              <div className="flex items-center space-x-3">
                <Badge variant="secondary" className="flex items-center space-x-1">
                  {userType === 'company' ? (
                    <BriefcaseIcon className="h-3 w-3" />
                  ) : (
                    <GraduationCapIcon className="h-3 w-3" />
                  )}
                  <span>{userType === 'company' ? 'Company' : 'Student'}</span>
                </Badge>
                <Button variant="outline" size="sm" onClick={onLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => onLogin('student')}>
                  Student Login
                </Button>
                <Button size="sm" onClick={() => onLogin('company')}>
                  Company Login
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}