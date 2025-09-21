import React, { useState, useEffect } from "react";
import api from "../../services/api"; // ← usa o api.js padronizado
import {
  SliderContainer,
  Slides,
  Slide,
  AutoNavigation,
  AutoButton,
  ImgSlider,
} from "./styles";

const Slider = () => {
  const [banners, setBanners] = useState([]); // banners do banco
  const [activeSlide, setActiveSlide] = useState(0); // índice do slide atual

  // Buscar banners do backend ao carregar
  useEffect(() => {
  const fetchBanners = async () => {
    try {
      const res = await api.get("/banners");
      setBanners(Array.isArray(res.data) ? res.data : []); // garante que seja array
    } catch (err) {
      console.error("Erro ao buscar banners:", err);
      setBanners([]);
    }
  };
  fetchBanners();
}, []);


  // Avança automaticamente a cada 10 segundos se tiver mais de 1 banner
  useEffect(() => {
    if (banners.length <= 1) return; // sem autoplay se 0 ou 1 banner
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % banners.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [banners]);

  if (banners.length === 0) {
    return (
      <SliderContainer>
        <p style={{ color: "white" }}>
          Nenhum banner cadastrado
        </p>
      </SliderContainer>
    );
  }

  return (
    <SliderContainer id="titulo_menu">
      <Slides>
        {banners.map((banner, index) => (
          <Slide key={banner.id} style={{ display: activeSlide === index ? "block" : "none" }} >
            <a href={banner.url || "#"} target="_blank" rel="noopener noreferrer">
              <ImgSlider src={banner.caminho} />
            </a>
          </Slide>
        ))}
      </Slides>

      {banners.length > 1 && (
        <AutoNavigation>
          {banners.map((_, index) => (
            <AutoButton key={index} onClick={() => setActiveSlide(index)} style={{ backgroundColor: activeSlide === index ? "#13df00ff" : "transparent",}} />
          ))}
        </AutoNavigation>
      )}
    </SliderContainer>
  );
};

export default Slider;
