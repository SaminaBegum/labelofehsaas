// import { createContext, useContext, useState, ReactNode } from "react";

// interface User {
//   id: string;
//   name: string;
//   email: string;
// }

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   login: (email: string, password: string) => Promise<boolean>;
//   signup: (name: string, email: string, password: string) => Promise<boolean>;
//   logout: () => void;
//   showAuthModal: boolean;
//   setShowAuthModal: (show: boolean) => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [showAuthModal, setShowAuthModal] = useState(false);

//   const login = async (email: string, _password: string): Promise<boolean> => {
//     // Simulated login
//     setUser({ id: "1", name: email.split("@")[0], email });
//     return true;
//   };

//   const signup = async (name: string, email: string, _password: string): Promise<boolean> => {
//     setUser({ id: "1", name, email });
//     return true;
//   };

//   const logout = () => setUser(null);

//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, showAuthModal, setShowAuthModal }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within AuthProvider");
//   return context;
// };
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { auth, db } from "@/services/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { doc, setDoc, getDoc } from "firebase/firestore";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;

  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // ---------------------------
  // 🔥 Listen to Firebase Login State
  // ---------------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        return;
      }

      // Fetch user profile from Firestore
      const docRef = doc(db, "users", firebaseUser.uid);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        const data = snap.data();
        setUser({
          id: firebaseUser.uid,
          name: data.name,
          email: firebaseUser.email!,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  // ---------------------------
  // 🔥 Signup
  // ---------------------------
  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", res.user.uid), {
        name,
        email,
      });

      return true;
    } catch (error) {
      console.error("Signup Error:", error);
      return false;
    }
  };

  // ---------------------------
  // 🔥 Login
  // ---------------------------
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      console.error("Login Error:", error);
      return false;
    }
  };

  // ---------------------------
  // 🔥 Logout
  // ---------------------------
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        showAuthModal,
        setShowAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used within AuthProvider");
  return context;
};