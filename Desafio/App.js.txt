import React, { useState, useEffect } from "react";

const JuegoContador = () => {
  const [puntajeMaximo, setPuntajeMaximo] = useState(0);
  const [puntajeActual, setPuntajeActual] = useState(0);
  const [estadoJuego, setEstadoJuego] = useState("inicio"); // "inicio", "preparados", "jugando", "finalizado"
  const [tiempoRestante, setTiempoRestante] = useState(0);

  useEffect(() => {
    if (estadoJuego === "preparados") {
      const mensajes = ["Preparados", "Listos", "Ya"];
      let index = 0;
      const intervalo = setInterval(() => {
        setEstadoJuego(mensajes[index]);
        index++;
        if (index === mensajes.length) {
          clearInterval(intervalo);
          setEstadoJuego("jugando");
          setTiempoRestante(5); // Tiempo del juego en segundos
        }
      }, 1000);
    } else if (estadoJuego === "jugando" && tiempoRestante > 0) {
      const timer = setInterval(() => {
        setTiempoRestante((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (estadoJuego === "jugando" && tiempoRestante === 0) {
      setEstadoJuego("finalizado");
      setPuntajeMaximo((prev) => Math.max(prev, puntajeActual));
    }
  }, [estadoJuego, tiempoRestante]);

  const iniciarJuego = () => {
    setEstadoJuego("preparados");
    setPuntajeActual(0);
  };

  const clickearBoton = () => {
    if (estadoJuego === "jugando") {
      setPuntajeActual((prev) => prev + 1);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Juego Contador</h1>
      <p>Puntaje Máximo: {puntajeMaximo}</p>
      <p>
        {estadoJuego === "jugando" ? `Tiempo Restante: ${tiempoRestante}s` : null}
      </p>
      <p>
        {estadoJuego === "jugando" || estadoJuego === "finalizado"
          ? `Puntaje Actual: ${puntajeActual}`
          : null}
      </p>
      <button onClick={iniciarJuego} disabled={estadoJuego !== "inicio"}>
        Iniciar Juego
      </button>
      <button onClick={clickearBoton} disabled={estadoJuego !== "jugando"}>
        ¡Click aquí!
      </button>
      <p>{estadoJuego === "preparados" ? estadoJuego : null}</p>
    </div>
  );
};

export default JuegoContador;
