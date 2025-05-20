import { useEffect, useState } from "react";
import NavBar from "@/components/nav-bar";
import TournamentCard from "@/components/tournament-card";
import { useAuth } from "@/contexts/auth-context";
import { useLocation } from "wouter";
import { Tournament } from "@shared/schema";

// Mock data for the tournaments page
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
  },
  {
    id: 4,
    name: "Solo Showdown",
    description: "Test your skills in this solo competition",
    startDate: new Date(Date.now() + 86400000 * 7), // 7 days from now
    endDate: new Date(Date.now() + 86400000 * 8),
    registrationOpen: true,
    maxParticipants: 100,
    participantsCount: 45,
    prizePool: 25000,
    rules: "Solo players only, no teaming allowed",
    format: "Battle Royale - Solo",
    organizerId: 3,
    createdAt: new Date()
  },
  {
    id: 5,
    name: "Regional Clash",
    description: "Teams from the same region battle for supremacy",
    startDate: new Date(Date.now() + 86400000 * 14), // 14 days from now
    endDate: new Date(Date.now() + 86400000 * 15),
    registrationOpen: true,
    maxParticipants: 64,
    participantsCount: 30,
    prizePool: 75000,
    rules: "Teams must be from the same geographical region",
    format: "Battle Royale - Squad",
    organizerId: 2,
    createdAt: new Date()
  }
];

type FilterType = "all" | "upcoming" | "popular" | "featured";

export default function Tournaments() {
  const { currentUser } = useAuth();
  const [_, setLocation] = useLocation();
  const [filter, setFilter] = useState<FilterType>("all");
  
  useEffect(() => {
    if (!currentUser) {
      setLocation("/");
    }
  }, [currentUser, setLocation]);

  // Filter tournaments based on selected filter
  const filteredTournaments = () => {
    switch (filter) {
      case "upcoming":
        return [...mockTournaments].sort((a, b) => 
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
      case "popular":
        return [...mockTournaments].sort((a, b) => 
          (b.participantsCount / b.maxParticipants) - (a.participantsCount / a.maxParticipants)
        );
      case "featured":
        return mockTournaments.filter(t => t.prizePool >= 50000);
      default:
        return mockTournaments;
    }
  };

  if (!currentUser) return null;

  return (
    <div className="tournaments-page">
      <header className="bg-dark-surface p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white font-rajdhani">TOURNAMENTS</h1>
            <button className="bg-primary text-white p-2 rounded-full">
              <i className="ri-search-line"></i>
            </button>
          </div>
        </div>
      </header>

      <div className="p-4 container mx-auto mb-20">
        {/* Filter tabs */}
        <div className="flex space-x-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          <button 
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              filter === "all" 
                ? "bg-primary text-white" 
                : "bg-dark-surface text-text-secondary"
            }`}
          >
            All Tournaments
          </button>
          <button 
            onClick={() => setFilter("upcoming")}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              filter === "upcoming" 
                ? "bg-primary text-white" 
                : "bg-dark-surface text-text-secondary"
            }`}
          >
            Upcoming
          </button>
          <button 
            onClick={() => setFilter("popular")}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              filter === "popular" 
                ? "bg-primary text-white" 
                : "bg-dark-surface text-text-secondary"
            }`}
          >
            Popular
          </button>
          <button 
            onClick={() => setFilter("featured")}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              filter === "featured" 
                ? "bg-primary text-white" 
                : "bg-dark-surface text-text-secondary"
            }`}
          >
            Featured
          </button>
        </div>

        {/* Tournament list */}
        {filteredTournaments().length > 0 ? (
          filteredTournaments().map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))
        ) : (
          <div className="bg-dark-surface rounded-xl p-6 text-center">
            <p className="text-text-secondary">No tournaments found matching your filter.</p>
          </div>
        )}
      </div>

      <NavBar />
    </div>
  );
}