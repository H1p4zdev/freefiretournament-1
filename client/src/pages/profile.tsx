import { useEffect } from "react";
import NavBar from "@/components/nav-bar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useLocation } from "wouter";

export default function Profile() {
  const { currentUser, logOut } = useAuth();
  const [_, setLocation] = useLocation();
  
  useEffect(() => {
    if (!currentUser) {
      setLocation("/");
    }
  }, [currentUser, setLocation]);

  const handleLogout = async () => {
    try {
      await logOut();
      setLocation("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="profile-page">
      <header className="bg-dark-surface p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white font-rajdhani">PROFILE</h1>
          </div>
        </div>
      </header>

      <div className="p-4 container mx-auto mb-20">
        {/* Profile header */}
        <div className="bg-dark-surface rounded-xl p-6 mb-6 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-dark-lighter flex items-center justify-center mb-4">
            <span className="text-2xl text-white">
              {currentUser.displayName?.charAt(0) || currentUser.email?.charAt(0) || 'U'}
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mb-1">{currentUser.displayName || currentUser.email?.split('@')[0]}</h2>
          <p className="text-text-secondary">{currentUser.email}</p>
          
          <div className="flex justify-center mt-4 space-x-2">
            <span className="bg-primary text-white text-xs px-2 py-1 rounded">PRO PLAYER</span>
            <span className="bg-secondary text-white text-xs px-2 py-1 rounded">LEVEL 42</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-dark-surface rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-white font-rajdhani">12</p>
            <p className="text-text-secondary text-sm">Tournaments</p>
          </div>
          <div className="bg-dark-surface rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-white font-rajdhani">35</p>
            <p className="text-text-secondary text-sm">Matches</p>
          </div>
          <div className="bg-dark-surface rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-primary font-rajdhani">8</p>
            <p className="text-text-secondary text-sm">Wins</p>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full justify-between text-white py-6 bg-dark-surface border-dark-lighter hover:bg-dark-lighter"
            onClick={() => setLocation("/settings")}
          >
            <span className="flex items-center">
              <i className="ri-settings-3-line mr-3 text-xl"></i>
              Settings
            </span>
            <i className="ri-arrow-right-s-line"></i>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-between text-white py-6 bg-dark-surface border-dark-lighter hover:bg-dark-lighter"
          >
            <span className="flex items-center">
              <i className="ri-team-line mr-3 text-xl"></i>
              My Team
            </span>
            <i className="ri-arrow-right-s-line"></i>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-between text-white py-6 bg-dark-surface border-dark-lighter hover:bg-dark-lighter"
          >
            <span className="flex items-center">
              <i className="ri-history-line mr-3 text-xl"></i>
              Match History
            </span>
            <i className="ri-arrow-right-s-line"></i>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-between text-white py-6 bg-dark-surface border-dark-lighter hover:bg-dark-lighter"
          >
            <span className="flex items-center">
              <i className="ri-trophy-line mr-3 text-xl"></i>
              Achievements
            </span>
            <i className="ri-arrow-right-s-line"></i>
          </Button>
          
          <Button 
            onClick={handleLogout}
            className="w-full text-white py-6 gaming-btn bg-error hover:bg-error/90 mt-8"
          >
            <span className="flex items-center justify-center">
              <i className="ri-logout-box-line mr-2 text-xl"></i>
              LOGOUT
            </span>
          </Button>
        </div>
      </div>

      <NavBar />
    </div>
  );
}