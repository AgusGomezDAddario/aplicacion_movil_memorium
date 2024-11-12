import firebase from 'firebase/app';
import React, { createContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: null,
    logged: false,
    uid: null,
    creacion: null,
    name: null,
  });

  const [logueo, setLogueo] = useState(true);

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
        name: values.name,
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
  
      // Fetch scoreData from Firestore using modular syntax
      const userDocRef = doc(db, "users", userCredential.user.uid);
      const userDoc = await getDoc(userDocRef);
      const scoreData = userDoc.exists() ? userDoc.data() : null;
      setLogueo(true);
  
      setUser({
        email: userCredential.user.email,
        name: scoreData ? scoreData.name : null,
        logged: true,
        uid: userCredential.user.uid,
        creacion: userCredential.user.metadata.creationTime,
      });
    } catch (error) {
      console.error("Login Error:", error);
      setLogueo(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser({
        email: null,
        name: null,
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
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        // Obtener datos adicionales desde Firestore
        const scoreDoc = await getDoc(doc(db, "score", firebaseUser.uid));
        const scoreData = scoreDoc.exists() ? scoreDoc.data() : {};

        setUser({
          email: firebaseUser.email,
          name: scoreData.name || null, // Establecer name desde Firestore
          logged: true,
          uid: firebaseUser.uid,
          creacion: firebaseUser.metadata.creationTime, // Usar cadena de texto
        });
      } else {
        setUser({
          email: null,
          name: null, // Reiniciar name
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
      value={{ user, register, login, logout, googleLogin: () => {}, facebookLogin: () => {}, logueo }}
    >
      {children}
    </LoginContext.Provider>
  );
};