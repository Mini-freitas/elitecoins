import React, { useEffect, useRef, useState } from "react";
import {CartasContainer,CarrosselCartas,BaseCarrossel,Carta1Carrossel,Carta2Carrossel,Carta3Carrossel} from "./styles";
import axios from "axios";

const Cartas = () => {

// Estado para armazenar os valores das moedas
  const [valores, setValores] = useState({ play: 0, xbox: 0, pc: 0 });

  useEffect(() => {
  const fetchValores = async () => {
    try {
      const res = await axios.get("/moedas");
      // res.data já vai ter { play, xbox, pc }
      setValores({
        play: res.data.play || 0,
        xbox: res.data.xbox || 0,
        pc: res.data.pc || 0
      });
    } catch (err) {
      console.error("Erro ao buscar valores das moedas:", err);
    }
  };

  fetchValores();
}, []);


  const baseRef = useRef(null);
  const carta1Ref = useRef(null);
  const carta2Ref = useRef(null);
  const carta3Ref = useRef(null);

  useEffect(() => {
    const cartas = [carta1Ref.current, carta2Ref.current, carta3Ref.current];
    let isDragging = false;
    let startX = 0;
    let currentCarta = null;

    const initialPositions = [
      { top: "-15rem", left: "-5rem", zIndex: 1 },
      { top: "0", left: "4.5rem", zIndex: 3 },
      { top: "-15rem", left: "15rem", zIndex: 2 },
    ];

    function applyPositions() {
      cartas.forEach((carta, index) => {
        if (carta) {
          const pos = initialPositions[index];
          carta.style.top = pos.top;
          carta.style.left = pos.left;
          carta.style.zIndex = pos.zIndex;
        }
      });
    }

    applyPositions();

    const handleMouseDown = (event) => {
      if (!baseRef.current.contains(event.target)) return;
      event.preventDefault();
      isDragging = true;
      startX = event.clientX;
      currentCarta = event.target;
      currentCarta.style.cursor = "grabbing";
    };

    const handleMouseMove = (event) => {
      if (!isDragging || !currentCarta) return;

      const deltaX = event.clientX - startX;
      const maxMovement = 150;
      const minMovement = -150;
      const limitedDeltaX = Math.min(Math.max(deltaX, minMovement), maxMovement);

      if (Math.abs(limitedDeltaX) < 20) return;

      const progress = Math.min(Math.max(limitedDeltaX / 200, -1), 1);

      cartas.forEach((carta, index) => {
        if (carta) {
          const basePos = initialPositions[index];
          if (index === 0) {
            carta.style.left = `${parseFloat(basePos.left) + progress * 10}rem`;
            carta.style.top = `${-15 + progress * 10}rem`;
          } else if (index === 1) {
            carta.style.left = `${parseFloat(basePos.left) + progress * 10}rem`;
            carta.style.top = `${-15 + progress * 5}rem`;
          } else if (index === 2) {
            carta.style.left = `${parseFloat(basePos.left) + progress * 10}rem`;
            carta.style.top = `${-15 - progress * 10}rem`;
          }
        }
      });
    };

    const handleMouseUp = (event) => {
      if (!isDragging || !currentCarta) return;
      isDragging = false;
      currentCarta.style.cursor = "grab";

      if (Math.abs(event.clientX - startX) > 100) {
        if (event.clientX > startX) {
          initialPositions.push(initialPositions.shift());
        } else {
          initialPositions.unshift(initialPositions.pop());
        }

        cartas.forEach((carta) => {
          if (carta) carta.style.transition = "all 0.5s ease";
        });

        applyPositions();
      } else {
        applyPositions();
      }

      currentCarta = null;
    };

    cartas.forEach((carta) => {
      if (carta) carta.addEventListener("mousedown", handleMouseDown);
    });

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      cartas.forEach((carta) => {
        if (carta) carta.removeEventListener("mousedown", handleMouseDown);
      });

      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
      <CartasContainer>
        <CarrosselCartas>
          <BaseCarrossel ref={baseRef}>
            <Carta1Carrossel ref={carta1Ref}>
            <div style={{ position: "absolute", bottom: "3.5rem", left: "2.2rem",fontSize:"12px", color: "#fff" }}>
            {valores.xbox},00
            </div>
            <div style={{ position: "absolute", bottom: "3.5rem", right: "2.2rem",fontSize:"12px", color: "#fff" }}>
              1000k
            </div>
            </Carta1Carrossel>
            <Carta2Carrossel ref={carta2Ref}>
            <div style={{ position: "absolute", bottom: "3.5rem", left: "2.2rem",fontSize:"12px", color: "#fff" }}>
              {valores.play},00
            </div>
            <div style={{ position: "absolute", bottom: "3.5rem", right: "2.2rem",fontSize:"12px", color: "#fff" }}>
              1000k
            </div>
            </Carta2Carrossel>
            <Carta3Carrossel ref={carta3Ref}>
            <div style={{ position: "absolute", bottom: "3.5rem", left: "2.2rem",fontSize:"12px", color: "#fff" }}>
              {valores.pc},00
            </div>
            <div style={{ position: "absolute", bottom: "3.5rem", right: "2.2rem",fontSize:"12px", color: "#fff" }}>
              1000k
            </div>
            </Carta3Carrossel>
          </BaseCarrossel>
        </CarrosselCartas>
      </CartasContainer>    
  );
};

export default Cartas;
