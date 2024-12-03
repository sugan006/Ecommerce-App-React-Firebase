import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; // Modular imports

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth(); 

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setCurrentUser);
    return () => unsubscribe();
  }, [auth]);

  const signUp = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password); 
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  };

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password); 
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, signUp, signIn, signOut: signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
};