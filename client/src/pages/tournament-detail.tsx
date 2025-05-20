import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { Tournament } from "@shared/schema";

// Mock data for the tournament details
const getMockTournament = (id: number): (Tournament & { 
  registrationOpen: boolean, 
  maxParticipants: number, 
  participantsCount: number, 
  prizePool: number,
  teams?: { id: number, name: string, memberCount: number }[] 
}) => {
  return {
    id,
    name: "Free Fire Pro League",
    description: "Join the biggest professional tournament with top teams from around the world. Showcase your skills and compete for the championship title and a massive prize pool.",
    startDate: new Date(Date.now() + 86400000 * 3), // 3 days from now
    endDate: new Date(Date.now() + 86400000 * 4),
    registrationOpen: true,
    maxParticipants: 100,
    participantsCount: 78,
    prizePool: 50000,
    rules: "1. Teams must have 4 members\n2. All players must be at least level 30\n3. No cheating or teaming with other squads\n4. Each match will be scored based on placement and eliminations\n5. The team with the highest cumulative score across all matches wins",
    format: "Battle Royale - Squad",
    organizerId: 1,
    createdAt: new Date(),
    teams: [
      { id: 1, name: "Phoenix Force", memberCount: 4 },
      { id: 2, name: "Elite Warriors", memberCount: 4 },
      { id: 3, name: "Midnight Snipers", memberCount: 4 },
      { id: 4, name: "Cobra Squad", memberCount: 4 },
      { id: 5, name: "Dragon Fighters", memberCount: 4 }
    ]
  };
};

export default function TournamentDetail() {
  const [match, params] = useRoute<{ id: string }>('/tournament/:id');
  const [_, setLocation] = useLocation();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [tournament, setTournament] = useState<ReturnType<typeof getMockTournament> | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setLocation("/");
      return;
    }

    if (match && params?.id) {
      // In a real app, we would fetch the tournament data from an API
      setTournament(getMockTournament(parseInt(params.id)));
    }
  }, [match, params?.id, currentUser, setLocation]);

  if (!tournament) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Calculate time until tournament starts
  const timeUntilStart = () => {
    const now = new Date();
    const start = new Date(tournament.startDate);
    const diffTime = Math.abs(start.getTime() - now.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `${diffDays}d ${diffHours}h`;
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    }).format(new Date(date));
  };

  const handleRegister = () => {
    setIsRegistering(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRegistering(false);
      toast({
        title: "Registration successful!",
        description: "You have been registered for the tournament.",
        variant: "default",
      });
    }, 1500);
  };

  return (
    <div className="bg-dark min-h-screen pb-20">
      {/* Hero banner */}
      <div className="relative h-48">
        <svg viewBox="0 0 400 150" className="w-full h-full absolute inset-0">
          <rect width="400" height="150" fill="#1E1E1E" />
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2D2D2D" strokeWidth="1" />
          </pattern>
          <rect width="400" height="150" fill="url(#grid)" />
          <circle cx="50" cy="50" r="30" fill="#FF5500" fillOpacity="0.2" />
          <circle cx="350" cy="100" r="40" fill="#9147FF" fillOpacity="0.2" />
        </svg>
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark flex items-end">
          <div className="container mx-auto px-4 pb-4">
            <button 
              onClick={() => setLocation("/tournaments")}
              className="mb-2 flex items-center text-text-secondary"
            >
              <i className="ri-arrow-left-line mr-1"></i> Back
            </button>
            <h1 className="text-3xl font-bold text-white font-rajdhani">{tournament.name}</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Tournament stats */}
        <div className="bg-dark-surface rounded-xl p-4 -mt-6 mb-6 grid grid-cols-3 gap-2">
          <div className="text-center">
            <p className="text-text-secondary text-xs">Prize Pool</p>
            <p className="text-primary text-xl font-bold font-rajdhani">₹{tournament.prizePool.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-text-secondary text-xs">Starts In</p>
            <p className="text-white text-xl font-bold font-rajdhani">{timeUntilStart()}</p>
          </div>
          <div className="text-center">
            <p className="text-text-secondary text-xs">Format</p>
            <p className="text-white text-xl font-bold font-rajdhani">{tournament.format.split(' - ')[1]}</p>
          </div>
        </div>

        {/* Registration button */}
        {tournament.registrationOpen ? (
          <Button 
            onClick={handleRegister}
            disabled={isRegistering}
            className="w-full gaming-btn bg-primary hover:bg-primary/90 text-white font-rajdhani mb-6 py-6 text-lg"
          >
            {isRegistering ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                REGISTERING...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <i className="ri-trophy-line mr-2 text-xl"></i> REGISTER NOW
              </span>
            )}
          </Button>
        ) : (
          <Button 
            disabled
            className="w-full bg-dark-lighter text-text-secondary font-rajdhani mb-6 py-6 text-lg"
          >
            REGISTRATION CLOSED
          </Button>
        )}
        
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-text-secondary">Participants</span>
            <span className="text-white">{tournament.participantsCount}/{tournament.maxParticipants}</span>
          </div>
          <div className="w-full bg-dark-lighter rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full"
              style={{ width: `${(tournament.participantsCount / tournament.maxParticipants) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Tabs for details */}
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="w-full grid grid-cols-3 bg-dark-surface mb-4">
            <TabsTrigger value="info" className="font-rajdhani">INFO</TabsTrigger>
            <TabsTrigger value="teams" className="font-rajdhani">TEAMS</TabsTrigger>
            <TabsTrigger value="schedule" className="font-rajdhani">SCHEDULE</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="space-y-4">
            <div>
              <h3 className="text-white font-rajdhani font-bold mb-2">DESCRIPTION</h3>
              <p className="text-text-secondary">{tournament.description}</p>
            </div>
            
            <div>
              <h3 className="text-white font-rajdhani font-bold mb-2">DATE & TIME</h3>
              <p className="text-text-secondary">
                Start: {formatDate(tournament.startDate)}<br />
                End: {formatDate(tournament.endDate)}
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-rajdhani font-bold mb-2">RULES</h3>
              <div className="text-text-secondary whitespace-pre-line">
                {tournament.rules}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="teams">
            <h3 className="text-white font-rajdhani font-bold mb-2">REGISTERED TEAMS</h3>
            <div className="space-y-2">
              {tournament.teams?.map((team) => (
                <div key={team.id} className="bg-dark-surface rounded-lg p-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-dark-lighter flex items-center justify-center mr-3">
                      <span className="text-xs text-text-primary">{team.name.substring(0, 2).toUpperCase()}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{team.name}</h4>
                      <p className="text-xs text-text-secondary">{team.memberCount} members</p>
                    </div>
                  </div>
                  <i className="ri-more-2-fill text-text-secondary"></i>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="schedule">
            <h3 className="text-white font-rajdhani font-bold mb-2">TOURNAMENT SCHEDULE</h3>
            <div className="space-y-4">
              <div className="bg-dark-surface rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <h4 className="text-white font-medium">Qualification Round</h4>
                  <span className="text-primary">{formatDate(tournament.startDate)}</span>
                </div>
                <p className="text-text-secondary text-sm">Top 50 teams advance to semifinals</p>
              </div>
              
              <div className="bg-dark-surface rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <h4 className="text-white font-medium">Semifinals</h4>
                  <span className="text-primary">
                    {formatDate(new Date(tournament.startDate.getTime() + 86400000))}
                  </span>
                </div>
                <p className="text-text-secondary text-sm">Top 10 teams advance to finals</p>
              </div>
              
              <div className="bg-dark-surface rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <h4 className="text-white font-medium">Finals</h4>
                  <span className="text-primary">{formatDate(tournament.endDate)}</span>
                </div>
                <p className="text-text-secondary text-sm">Championship match with prize distribution</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}