// context/LoginContext.js

import React, { createContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: null,
    logged: false,
    uid: null,
    creacion: null,
  });

  const register = async (values) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const uid = userCredential.user.uid;
      console.log("Usuario creado con UID:", uid);
      
      await setDoc(doc(db, "score", uid), {  // Asegúrate de que la colección sea "score"
        name: values.name,
        age: values.age,
        dni: values.dni,
        email: values.email,
        creacion: new Date(),
      });
      console.log("Datos adicionales guardados en Firestore");
      
      setUser({
        email: values.email,
        logged: true,
        uid: uid,
        creacion: new Date(),
      });
    } catch (error) {
      console.error("Registration Error:", error);
      alert(`Error al registrar el usuario: ${error.message}`);
    }
  };

  const login = async (values) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      setUser({
        email: userCredential.user.email,
        logged: true,
        uid: userCredential.user.uid,
        creacion: userCredential.user.metadata.creationTime,
      });
    } catch (error) {
      console.error("Login Error:", error);
      alert("Error al iniciar sesión.");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser({
        email: null,
        logged: false,
        uid: null,
        creacion: null,
      });
    } catch (error) {
      console.error("Logout Error:", error);
      alert("Error al cerrar sesión.");
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          email: firebaseUser.email,
          logged: true,
          uid: firebaseUser.uid,
          creacion: firebaseUser.metadata.creationTime,
        });
      } else {
        setUser({
          email: null,
          logged: false,
          uid: null,
          creacion: null,
        });
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <LoginContext.Provider
      value={{ user, register, login, logout, googleLogin: () => {}, facebookLogin: () => {} }}
    >
      {children}
    </LoginContext.Provider>
  );
};