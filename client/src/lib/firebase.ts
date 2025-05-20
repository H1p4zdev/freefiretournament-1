// This is a mock Firebase implementation since we don't have actual Firebase credentials
// In a real app, this would connect to Firebase services

// Mock Firebase Auth types
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
}

class Auth {
  private user: User | null = null;
  private listeners: Array<(user: User | null) => void> = [];

  // Helper to notify all listeners
  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.user));
  }

  // Sign in with email/password
  async signInWithEmailAndPassword(email: string, password: string) {
    // Simulate successful login
    this.user = {
      uid: Math.random().toString(36).substring(2),
      email,
      displayName: email.split('@')[0],
    };
    this.notifyListeners();
    return { user: this.user };
  }

  // Create new user
  async createUserWithEmailAndPassword(email: string, password: string) {
    // Simulate user creation
    this.user = {
      uid: Math.random().toString(36).substring(2),
      email,
      displayName: email.split('@')[0],
    };
    this.notifyListeners();
    return { user: this.user };
  }

  // Sign out
  async signOut() {
    this.user = null;
    this.notifyListeners();
  }

  // Auth state observer
  onAuthStateChanged(callback: (user: User | null) => void) {
    this.listeners.push(callback);
    // Initial callback
    callback(this.user);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  // Social sign-in methods
  async signInWithPopup(provider: any) {
    const providerName = provider.constructor.name;
    this.user = {
      uid: Math.random().toString(36).substring(2),
      email: `user@${providerName.toLowerCase()}.com`,
      displayName: `${providerName} User`,
    };
    this.notifyListeners();
    return { user: this.user };
  }
}

// Mock Firebase providers
export class GoogleAuthProvider {}
export class FacebookAuthProvider {}
export class TwitterAuthProvider {}

// Expose the auth instance
export const auth = new Auth();

// Mock Firestore database
class Database {
  private data: Record<string, any> = {
    tournaments: {},
    users: {},
    teams: {},
    matches: {}
  };

  ref(path: string) {
    return {
      get: async () => {
        const pathParts = path.split('/');
        let current = this.data;
        
        for (const part of pathParts) {
          if (!current[part]) {
            return { exists: () => false, val: () => null };
          }
          current = current[part];
        }
        
        return {
          exists: () => true,
          val: () => current
        };
      }
    };
  }
}

export const db = new Database();