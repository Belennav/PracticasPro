import React, { useState } from "react";
import "./Juegocontador.css";


function JuegoContador() {
  const [count, setCount] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [countdown, setCountdown] = useState("");

  const startGame = () => {
    setCount(0);
    setCountdown("Preparados");
    setIsPlaying(true);

    let prepTime = 3; // 3 segundos de preparación
    const prepInterval = setInterval(() => {
      if (prepTime === 1) {
        setCountdown("Yaaaaaa");
        clearInterval(prepInterval);
        startClickPhase();
      } else {
        prepTime--;
        setCountdown(prepTime === 2 ? "Listos" : "yyyyyy");
      }
    }, 1000);
  };

  const startClickPhase = () => {
    setTimeLeft(5); // 5 segundos para clics
    const gameInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(gameInterval);
          endGame();
        }
        return prev - 1;
      });
    }, 1000);
  };

  const endGame = () => {
    setIsPlaying(false);
    if (count > maxScore) {
      setMaxScore(count);
    }else{
        setMaxScore(maxScore);
    }
  };

  const handleClick = () => {
    if (isPlaying) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Juego Contador</h1>
      <p>Puntaje máximo: {maxScore}</p>
      <p>{isPlaying ? `Tiempo restante: ${timeLeft}` : "Haz clic en 'Iniciar' para jugar"}</p>
      {countdown && <h2>{countdown}</h2>}
      <button onClick={startGame} disabled={isPlaying}>
        Iniciar
      </button>
      <button onClick={handleClick} disabled={!isPlaying || timeLeft === 0}>
        ¡Click aquí!
      </button>
      <p>Clicks actuales: {count}</p>
    </div>
  );
}

export default JuegoContador;
