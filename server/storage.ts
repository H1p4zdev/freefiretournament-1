import { 
  users, 
  tournaments,
  teams,
  matches,
  notifications,
  type User, 
  type InsertUser,
  type Tournament,
  type InsertTournament,
  type Team,
  type InsertTeam,
  type Match,
  type InsertMatch,
  type Notification,
  type InsertNotification
} from "@shared/schema";

// Storage interface for all entities
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Tournament operations
  getTournament(id: number): Promise<Tournament | undefined>;
  getAllTournaments(): Promise<Tournament[]>;
  createTournament(tournament: InsertTournament): Promise<Tournament>;
  
  // Team operations
  getTeam(id: number): Promise<Team | undefined>;
  getAllTeams(): Promise<Team[]>;
  createTeam(team: InsertTeam): Promise<Team>;
  
  // Match operations
  getMatch(id: number): Promise<Match | undefined>;
  getMatchesByTournament(tournamentId: number): Promise<Match[]>;
  createMatch(match: InsertMatch): Promise<Match>;
  
  // Notification operations
  getNotificationsByUser(userId: number): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  markNotificationAsRead(id: number): Promise<Notification | undefined>;
}

export class MemStorage implements IStorage {
  private userStore: Map<number, User>;
  private tournamentStore: Map<number, Tournament>;
  private teamStore: Map<number, Team>;
  private matchStore: Map<number, Match>;
  private notificationStore: Map<number, Notification>;
  
  private userIdCounter: number;
  private tournamentIdCounter: number;
  private teamIdCounter: number;
  private matchIdCounter: number;
  private notificationIdCounter: number;

  constructor() {
    this.userStore = new Map();
    this.tournamentStore = new Map();
    this.teamStore = new Map();
    this.matchStore = new Map();
    this.notificationStore = new Map();
    
    this.userIdCounter = 1;
    this.tournamentIdCounter = 1;
    this.teamIdCounter = 1;
    this.matchIdCounter = 1;
    this.notificationIdCounter = 1;
    
    // Initialize with some sample data
    this.initSampleData();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.userStore.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.userStore.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id,
      displayName: insertUser.displayName || null,
      email: insertUser.email || null,
      avatarUrl: insertUser.avatarUrl || null,
      createdAt: now
    };
    this.userStore.set(id, user);
    return user;
  }

  // Tournament operations
  async getTournament(id: number): Promise<Tournament | undefined> {
    return this.tournamentStore.get(id);
  }

  async getAllTournaments(): Promise<Tournament[]> {
    return Array.from(this.tournamentStore.values());
  }

  async createTournament(insertTournament: InsertTournament): Promise<Tournament> {
    const id = this.tournamentIdCounter++;
    const now = new Date();
    const tournament: Tournament = {
      ...insertTournament,
      id,
      description: insertTournament.description || null,
      endDate: insertTournament.endDate || null,
      rules: insertTournament.rules || null,
      format: insertTournament.format || null,
      organizerId: insertTournament.organizerId || null,
      registrationOpen: insertTournament.registrationOpen !== undefined ? insertTournament.registrationOpen : true,
      maxParticipants: insertTournament.maxParticipants || 100,
      participantsCount: 0,
      prizePool: insertTournament.prizePool || 0,
      createdAt: now
    };
    this.tournamentStore.set(id, tournament);
    return tournament;
  }

  // Team operations
  async getTeam(id: number): Promise<Team | undefined> {
    return this.teamStore.get(id);
  }

  async getAllTeams(): Promise<Team[]> {
    return Array.from(this.teamStore.values());
  }

  async createTeam(insertTeam: InsertTeam): Promise<Team> {
    const id = this.teamIdCounter++;
    const now = new Date();
    const team: Team = {
      ...insertTeam,
      id,
      logoUrl: insertTeam.logoUrl || null,
      captainId: insertTeam.captainId || null,
      createdAt: now
    };
    this.teamStore.set(id, team);
    return team;
  }

  // Match operations
  async getMatch(id: number): Promise<Match | undefined> {
    return this.matchStore.get(id);
  }

  async getMatchesByTournament(tournamentId: number): Promise<Match[]> {
    return Array.from(this.matchStore.values()).filter(
      match => match.tournamentId === tournamentId
    );
  }

  async createMatch(insertMatch: InsertMatch): Promise<Match> {
    const id = this.matchIdCounter++;
    const now = new Date();
    const match: Match = {
      ...insertMatch,
      id,
      startTime: insertMatch.startTime || null,
      status: insertMatch.status || "scheduled",
      round: insertMatch.round || 1,
      results: insertMatch.results || null,
      tournamentId: insertMatch.tournamentId || null,
      createdAt: now
    };
    this.matchStore.set(id, match);
    return match;
  }

  // Notification operations
  async getNotificationsByUser(userId: number): Promise<Notification[]> {
    return Array.from(this.notificationStore.values()).filter(
      notification => notification.userId === userId
    );
  }

  async createNotification(insertNotification: InsertNotification): Promise<Notification> {
    const id = this.notificationIdCounter++;
    const now = new Date();
    const notification: Notification = {
      ...insertNotification,
      id,
      read: false,
      createdAt: now
    };
    this.notificationStore.set(id, notification);
    return notification;
  }

  async markNotificationAsRead(id: number): Promise<Notification | undefined> {
    const notification = this.notificationStore.get(id);
    if (notification) {
      notification.read = true;
      this.notificationStore.set(id, notification);
    }
    return notification;
  }

  // Initialize with sample data
  private initSampleData() {
    // Create a sample user
    const user: User = {
      id: this.userIdCounter++,
      username: "demo",
      password: "password123",
      displayName: "Demo User",
      email: "demo@example.com",
      avatarUrl: null,
      createdAt: new Date()
    };
    this.userStore.set(user.id, user);

    // Create sample tournaments
    const tournaments: Tournament[] = [
      {
        id: this.tournamentIdCounter++,
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
        organizerId: user.id,
        createdAt: new Date()
      },
      {
        id: this.tournamentIdCounter++,
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
        organizerId: user.id,
        createdAt: new Date()
      },
      {
        id: this.tournamentIdCounter++,
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
        organizerId: user.id,
        createdAt: new Date()
      }
    ];
    
    tournaments.forEach(tournament => {
      this.tournamentStore.set(tournament.id, tournament);
    });

    // Create sample teams
    const teams: Team[] = [
      {
        id: this.teamIdCounter++,
        name: "Phoenix Force",
        logoUrl: null,
        captainId: user.id,
        createdAt: new Date()
      },
      {
        id: this.teamIdCounter++,
        name: "Elite Warriors",
        logoUrl: null,
        captainId: user.id,
        createdAt: new Date()
      }
    ];
    
    teams.forEach(team => {
      this.teamStore.set(team.id, team);
    });

    // Create sample matches
    const matches: Match[] = [
      {
        id: this.matchIdCounter++,
        tournamentId: tournaments[0].id,
        startTime: new Date(Date.now() + 86400000 * 3 + 3600000), // 3 days + 1 hour from now
        status: "scheduled",
        round: 1,
        results: null,
        createdAt: new Date()
      },
      {
        id: this.matchIdCounter++,
        tournamentId: tournaments[1].id,
        startTime: new Date(Date.now() + 86400000 * 5 + 3600000), // 5 days + 1 hour from now
        status: "scheduled",
        round: 1,
        results: null,
        createdAt: new Date()
      }
    ];
    
    matches.forEach(match => {
      this.matchStore.set(match.id, match);
    });

    // Create sample notifications
    const notifications: Notification[] = [
      {
        id: this.notificationIdCounter++,
        userId: user.id,
        title: "Welcome to Free Fire Tournament",
        message: "Start competing in tournaments today!",
        read: false,
        createdAt: new Date()
      },
      {
        id: this.notificationIdCounter++,
        userId: user.id,
        title: "New Tournament Available",
        message: "Free Fire Pro League is now open for registration",
        read: false,
        createdAt: new Date(Date.now() - 86400000) // 1 day ago
      }
    ];
    
    notifications.forEach(notification => {
      this.notificationStore.set(notification.id, notification);
    });
  }
}

export const storage = new MemStorage();
