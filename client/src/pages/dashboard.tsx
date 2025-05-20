import { useEffect } from "react";
import NavBar from "@/components/nav-bar";
import TournamentCard from "@/components/tournament-card";
import MatchCard from "@/components/match-card";
import { useAuth } from "@/contexts/auth-context";
import { useLocation } from "wouter";
import { Tournament } from "@shared/schema";

// Mock data for the dashboard
const mockTournaments: (Tournament & { registrationOpen: boolean, maxParticipants: number, participantsCount: number, prizePool: number })[] = [
  {
    id: 1,
    name: "Free Fire Pro League",
    description: "Weekly professional tournament with top teams",
    startDate: new Date(Date.now() + 86400000 * 3), // 3 days from now
    endDate: new Date(Date.now() + 86400000 * 4),
    registrationOpen: true,
    maxParticipants: 100,
    participantsCount: 78,
    prizePool: 50000,
    rules: "Standard competitive rules apply",
    format: "Battle Royale - Squad",
    organizerId: 1,
    createdAt: new Date()
  },
  {
    id: 2,
    name: "Weekend Warriors Cup",
    description: "Weekend tournament for casual players",
    startDate: new Date(Date.now() + 86400000 * 5), // 5 days from now
    endDate: new Date(Date.now() + 86400000 * 6),
    registrationOpen: true,
    maxParticipants: 50,
    participantsCount: 22,
    prizePool: 10000,
    rules: "Standard rules with special weekend bonuses",
    format: "Battle Royale - Duo",
    organizerId: 2,
    createdAt: new Date()
  },
  {
    id: 3,
    name: "Elite Championship",
    description: "Invitation-only tournament for top players",
    startDate: new Date(Date.now() + 86400000 * 10), // 10 days from now
    endDate: new Date(Date.now() + 86400000 * 11),
    registrationOpen: false,
    maxParticipants: 32,
    participantsCount: 32,
    prizePool: 100000,
    rules: "Professional rules apply, strict enforcement",
    format: "Battle Royale - Squad",
    organizerId: 1,
    createdAt: new Date()
  }
];

// Mock recent matches data
const mockMatches = [
  {
    id: 1,
    tournamentName: "Free Fire Pro League",
    position: 1,
    pointsEarned: 25,
    date: new Date(Date.now() - 86400000 * 2) // 2 days ago
  },
  {
    id: 2,
    tournamentName: "Weekend Warriors Cup",
    position: 3,
    pointsEarned: 15,
    date: new Date(Date.now() - 86400000 * 5) // 5 days ago
  },
  {
    id: 3,
    tournamentName: "Daily Tournament",
    position: 5,
    pointsEarned: 7,
    date: new Date(Date.now() - 86400000 * 7) // 7 days ago
  }
];

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [_, setLocation] = useLocation();
  
  useEffect(() => {
    if (!currentUser) {
      setLocation("/");
    }
  }, [currentUser, setLocation]);

  // Stats for the dashboard
  const stats = {
    tournaments: mockTournaments.length,
    matches: mockMatches.length
  };

  if (!currentUser) return null;

  return (
    <div className="dashboard">
      <header className="bg-dark-surface p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-white font-rajdhani">DASHBOARD</h1>
              <span className="bg-primary text-xs px-2 py-1 rounded text-white">PRO</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative">
                <i className="ri-notification-3-line text-2xl text-white"></i>
                <span className="absolute -top-1 -right-1 bg-error w-4 h-4 rounded-full text-xs flex items-center justify-center">3</span>
              </button>
              <div className="w-8 h-8 rounded-full bg-dark-lighter flex items-center justify-center text-white">
                {currentUser.email?.charAt(0).toUpperCase() || 'U'}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 container mx-auto mb-20">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-dark-surface rounded-xl p-4 card-glow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-text-secondary text-sm">Tournaments</h3>
              <i className="ri-trophy-line text-primary"></i>
            </div>
            <p className="text-3xl font-bold text-white font-rajdhani">{stats.tournaments}</p>
            <p className="text-xs text-success flex items-center mt-1">
              <i className="ri-arrow-up-line mr-1"></i> +3 new this week
            </p>
          </div>
          
          <div className="bg-dark-surface rounded-xl p-4 card-glow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-text-secondary text-sm">Matches</h3>
              <i className="ri-sword-line text-primary"></i>
            </div>
            <p className="text-3xl font-bold text-white font-rajdhani">{stats.matches}</p>
            <p className="text-xs text-success flex items-center mt-1">
              <i className="ri-arrow-up-line mr-1"></i> +5 upcoming
            </p>
          </div>
        </div>

        {/* Upcoming Tournament */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white font-rajdhani">UPCOMING TOURNAMENTS</h2>
            <a href="#" className="text-primary text-sm">View All</a>
          </div>
          
          {mockTournaments && mockTournaments.length > 0 ? (
            <>
              {/* Featured tournament */}
              <TournamentCard tournament={mockTournaments[0]} mode="full" />
              
              {/* Other tournaments */}
              {mockTournaments.slice(1, 3).map((tournament) => (
                <TournamentCard key={tournament.id} tournament={tournament} />
              ))}
            </>
          ) : (
            <div className="bg-dark-surface rounded-xl p-6 text-center">
              <p className="text-text-secondary">No upcoming tournaments available.</p>
            </div>
          )}
        </div>
        
        {/* Your Recent Matches */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white font-rajdhani">YOUR RECENT MATCHES</h2>
            <a href="#" className="text-primary text-sm">History</a>
          </div>
          
          {mockMatches && mockMatches.length > 0 ? (
            mockMatches.map((match) => (
              <MatchCard 
                key={match.id} 
                match={{} as any} // Placeholder to match interface
                tournamentName={match.tournamentName}
                position={match.position}
                pointsEarned={match.pointsEarned}
                date={match.date}
              />
            ))
          ) : (
            <div className="bg-dark-surface rounded-xl p-6 text-center">
              <p className="text-text-secondary">No recent matches found.</p>
            </div>
          )}
        </div>
      </div>

      <NavBar />
    </div>
  );
}