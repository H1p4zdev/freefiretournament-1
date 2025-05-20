import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

// Mock User type for development
interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signInWithTwitter: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // For demo purposes, we'll use a simulated authentication
  useEffect(() => {
    // Simulate checking if user is already logged in
    const savedUser = localStorage.getItem('freefire_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Simulate authentication
      // In a real app, this would call Firebase or your auth service
      if (email && password) {
        // For demo, we'll accept any email/password combo
        const user: User = {
          uid: Math.random().toString(36).substring(2),
          email: email,
          displayName: email.split('@')[0]
        };
        setCurrentUser(user);
        localStorage.setItem('freefire_user', JSON.stringify(user));
      } else {
        throw new Error("Email and password required");
      }
    } catch (error: any) {
      toast({
        title: "Error signing in",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      // Simulate registration
      if (email && password) {
        const user: User = {
          uid: Math.random().toString(36).substring(2),
          email: email,
          displayName: email.split('@')[0]
        };
        setCurrentUser(user);
        localStorage.setItem('freefire_user', JSON.stringify(user));
      } else {
        throw new Error("Email and password required");
      }
    } catch (error: any) {
      toast({
        title: "Error signing up",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const logOut = async () => {
    try {
      setCurrentUser(null);
      localStorage.removeItem('freefire_user');
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      // Simulate Google sign in
      const user: User = {
        uid: Math.random().toString(36).substring(2),
        email: 'user@gmail.com',
        displayName: 'Google User'
      };
      setCurrentUser(user);
      localStorage.setItem('freefire_user', JSON.stringify(user));
    } catch (error: any) {
      toast({
        title: "Error signing in with Google",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signInWithFacebook = async () => {
    try {
      // Simulate Facebook sign in
      const user: User = {
        uid: Math.random().toString(36).substring(2),
        email: 'user@facebook.com',
        displayName: 'Facebook User'
      };
      setCurrentUser(user);
      localStorage.setItem('freefire_user', JSON.stringify(user));
    } catch (error: any) {
      toast({
        title: "Error signing in with Facebook",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signInWithTwitter = async () => {
    try {
      // Simulate Twitter sign in
      const user: User = {
        uid: Math.random().toString(36).substring(2),
        email: 'user@twitter.com',
        displayName: 'Twitter User'
      };
      setCurrentUser(user);
      localStorage.setItem('freefire_user', JSON.stringify(user));
    } catch (error: any) {
      toast({
        title: "Error signing in with Twitter",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const value = {
    currentUser,
    loading,
    signIn,
    signUp,
    logOut,
    signInWithGoogle,
    signInWithFacebook,
    signInWithTwitter
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};