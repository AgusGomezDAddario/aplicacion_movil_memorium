import React, { createContext, useEffect, useState } from "react";
import { db } from "./../firebase/config";
import {
  collection,
  query,
  where,
  addDoc,
  writeBatch,
  documentId,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { LoginContext } from "./LoginContext";
import { useContext } from "react";
import { number } from "yup";

export const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState({
    correct: 0,
    incorrect: 0,
    scoreToday: 0,
    fecha: "",
    racha: 0,
    name: "",
    achievements: [""],
    gonoGo: [],
    orderium: [],
    abecedarium: [],
    numerium: [],
    memoryGame: [],
  });

  const [currentScore, setCurrentScore] = useState([0]);

  const { user } = useContext(LoginContext);

  useEffect(() => {
    const fechaActual = new Date();

    // Obtener el día, el mes y el año actual
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1; // Suma 1 porque enero es 0
    const anio = fechaActual.getFullYear();

    setScore((prevScore) => ({
      ...prevScore,
      fecha: fechaActual,
    }));

    const fetchScores = async (fecha) => {
      if (user.uid) {
        const scoreRef = collection(db, "score");
        const itemsRef = query(scoreRef, where(documentId(), "==", user.uid));
        const response = await getDocs(itemsRef);
        if (response.size > 0) {
          const data = response.docs[0].data();
          const doc = response.docs[0];
          const batch = writeBatch(db);
          console.log("data");
          console.log(data);
          setScore((prevScore) => ({
            ...prevScore,
            correct: data.scorecorrect,
            incorrect: data.scoreincorrect,
            scoreToday: data.scoreToday,
            racha: data.racha,
            name: data.name,
            achievements: data.achievements,
            gonoGo: data.gonoGo || [],
            orderium: data.orderium || [],
            abecedarium: data.abecedarium || [],
            numerium: data.numerium || [],
            memoryGame: data.memoryGame || [],
          }));
          if (data.fecha) {
            if (
              data.fecha.toDate().getFullYear() !== score.fecha.getFullYear() ||
              data.fecha.toDate().getDate() !== score.fecha.getDate() ||
              data.fecha.toDate().getMonth() !== score.fecha.getMonth()
            ) {
              if (score.fecha.getDate() == data.fecha.toDate().getDate() + 1) {
                batch.update(doc.ref, {
                  fecha: fecha,
                  racha: data.racha + 1,
                  scoreToday: 0,
                });
                setScore((prevScore) => ({
                  ...prevScore,
                  fecha: score.fecha,
                  racha: data.racha + 1,
                  scoreToday: 0,
                }));
                console.log("Entraste ayer, tu racha sube en 1");
              } else {
                batch.update(doc.ref, {
                  fecha: fecha,
                  racha: 0,
                  scoreToday: 0,
                });
                setScore((prevScore) => ({
                  ...prevScore,
                  fecha: score.fecha,
                  racha: 0,
                  scoreToday: 0,
                }));
                console.log("No entraste ayer, tu racha vuelve a 0");
              }
            } else {
              batch.update(doc.ref, { fecha: fecha });
              setScore((prevScore) => ({
                ...prevScore,
                fecha: score.fecha,
              }));
              console.log("ya entraste hoy");
            }
          } else {
            console.log("Sos un usuario antiguo, tu racha comienza en 0");
            setScore((prevScore) => ({
              ...prevScore,
              fecha: score.fecha,
              racha: 0,
              achievements: [],
            }));
            batch.update(doc.ref, { fecha: fecha, racha: 0 });
          }
          await batch.commit();
        } else {
          console.log("Sos un usuario nuevo, tus datos se inicializan en 0");
          setScore({
            correct: 0,
            incorrect: 0,
            fecha: new Date(),
            racha: 0,
            name: data.name,
            achievements: [],
            scoreToday: 0,
            gonoGo: [],
            orderium: [],
            abecedarium: [],
            numerium: [],
            memoryGame: [],
          });
          const scoreDocRef = doc(scoreRef, user.uid);
          await setDoc(scoreDocRef, {
            scorecorrect: 0,
            scoreincorrect: 0,
            scoreToday: 0,
            fecha: score.fecha,
            racha: 0,
            name:score.name,
            email: user.email,
            achievements: [],
            gonoGo: [],
            orderium: [],
            abecedarium: [],
            numerium: [],
            memoryGame: [],
          });
        }
      }
    };

    fetchScores(fechaActual);
  }, [user.uid]);

  const updateScore = async (correct, incorrect, achievements, scoreToday, attempts, facilitations, time) => {    // 1. Validar y preparar datos
    const currentGonoGo = score.gonoGo || [];
    const updatedGonoGo = attempts !== null && facilitations !== null && time != null
        ? [...currentGonoGo, { attempts, facilitations, time }]
        : currentGonoGo;

    // 2. Preparar datos validados para Firestore
    const updateData = {
        scorecorrect: correct || 0,
        scoreincorrect: incorrect || 0,
        achievements: achievements || [],
        scoreToday: scoreToday || 0,
        gonoGo: updatedGonoGo
    };

    // 3. Remover campos undefined
    Object.keys(updateData).forEach(key => 
        updateData[key] === undefined && delete updateData[key]
    );

    try {
        const scoreRef = collection(db, "score");
        const itemsRef = query(scoreRef, where(documentId(), "==", user.uid));
        const response = await getDocs(itemsRef);

        if (response.size > 0) {
            const docRef = response.docs[0];
            const batch = writeBatch(db);
            
            batch.update(docRef.ref, updateData);
            await batch.commit();

            setScore(prevScore => ({
                ...prevScore,
                ...updateData
            }));
        } else {
            const scoreDocRef = doc(scoreRef, user.uid);
            await setDoc(scoreDocRef, {
                ...updateData,
                email: user.email
            });
        }
    } catch (error) {
        console.error("Error updating score:", error);
        throw error;
    }
};

  const updateOrderiumScore = async (attempts, facilitations, timeSpent) => {
    const newOrderiumData = { attempts, facilitations, timeSpent };
    const updatedOrderium = [...score.orderium, newOrderiumData];

    console.log("estoy aca el user es: "+user.uid)

    const scoreRef = collection(db, "score");
    const itemsRef = query(scoreRef, where(documentId(), "==", user.uid));
    const response = await getDocs(itemsRef);

    if (response.size > 0) {
      const docRef = response.docs[0];
      const batch = writeBatch(db);

      batch.update(docRef.ref, {
        orderium: updatedOrderium,
      });
      await batch.commit();

      setScore((prevScore) => ({
        ...prevScore,
        orderium: updatedOrderium,
      }));
    } else {
      const scoreDocRef = doc(scoreRef, user.uid);
      await setDoc(scoreDocRef, {
        email: user.email,
        orderium: [newOrderiumData],
      });
    }
  };

  const updateAbecedariumScore = async (
    palabra,
    tiempo,
    vecesJugadas,
    equivocaciones
  ) => {
    const newAbecedariumData = {
      palabra,
      tiempo,
      vecesJugadas,
      equivocaciones,
    };
    const updatedAbecedarium = [...score.abecedarium, newAbecedariumData];

    const scoreRef = collection(db, "score");
    const itemsRef = query(scoreRef, where(documentId(), "==", user.uid));
    const response = await getDocs(itemsRef);

    if (response.size > 0) {
      const docRef = response.docs[0];
      const batch = writeBatch(db);

      batch.update(docRef.ref, {
        abecedarium: updatedAbecedarium,
      });
      await batch.commit();

      setScore((prevScore) => ({
        ...prevScore,
        abecedarium: updatedAbecedarium,
      }));
    } else {
      const scoreDocRef = doc(scoreRef, user.uid);
      await setDoc(scoreDocRef, {
        email: user.email,
        abecedarium: [newAbecedariumData],
      });
    }
  };

  const updateNumeriumScore = async (
    digitos,
    tiempo,
    vecesJugadas,
    tiempoDigitos,
    distractorTime
  ) => {
    const newNumeriumData = {
      digitos,
      tiempo,
      vecesJugadas,
      tiempoDigitos,
      distractorTime,
    };
    const updatedNumerium = [...score.numerium, newNumeriumData];

    const scoreRef = collection(db, "score");
    const itemsRef = query(scoreRef, where(documentId(), "==", user.uid));
    const response = await getDocs(itemsRef);

    if (response.size > 0) {
      const docRef = response.docs[0];
      const batch = writeBatch(db);

      batch.update(docRef.ref, {
        numerium: updatedNumerium,
      });
      await batch.commit();

      setScore((prevScore) => ({
        ...prevScore,
        numerium: updatedNumerium,
      }));
    } else {
      const scoreDocRef = doc(scoreRef, user.uid);
      await setDoc(scoreDocRef, {
        email: user.email,
        numerium: [newNumeriumData],
      });
    }
  };

  const updateMemoryGameScore = async (
    categoria,
    tiempo,
    acerto,
    iguales,
    distractorTime,
    tiempoImagenes,
    dificultad
  ) => {
    const newMemoryGameData = {
      categoria,
      tiempo,
      acerto,
      iguales,
      distractorTime,
      tiempoImagenes,
      dificultad,
    };
    const updatedMemoryGame = [...score.memoryGame, newMemoryGameData];

    const scoreRef = collection(db, "score");
    const itemsRef = query(scoreRef, where(documentId(), "==", user.uid));
    const response = await getDocs(itemsRef);

    if (response.size > 0) {
      const docRef = response.docs[0];
      const batch = writeBatch(db);

      batch.update(docRef.ref, {
        memoryGame: updatedMemoryGame,
      });
      await batch.commit();

      setScore((prevScore) => ({
        ...prevScore,
        memoryGame: updatedMemoryGame,
      }));
    } else {
      const scoreDocRef = doc(scoreRef, user.uid);
      await setDoc(scoreDocRef, {
        email: user.email,
        memoryGame: [newMemoryGameData],
      });
    }
  };

  return (
    <ScoreContext.Provider
      value={{
        score,
        setScore,
        updateScore,
        currentScore,
        setCurrentScore,
        updateOrderiumScore,
        updateAbecedariumScore,
        updateNumeriumScore,
        updateMemoryGameScore,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};
