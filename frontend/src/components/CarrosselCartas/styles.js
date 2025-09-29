import styled from "styled-components";

import cartaXbox from "../../images/cartas/cartaXbox.svg";
import cartaPlaystation from "../../images/cartas/cartaPLAYSTATION.svg";
import cartaPC from "../../images/cartas/cartaPC.svg";

export const CartasContainer = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;

   @media (max-width:440px){
        height: auto;
        width: 80%;
        justify-content:center;
        align-items: center;
    }
`;
export const CarrosselCartas = styled.div`
  position: relative;
  height: auto;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d; 
  transform: rotateX(90deg);
  transform-origin: bottom;
  top:-4rem;

  &::before{
    content: "";
    position: absolute;
    height: 20rem;
    width: 20rem;
    transform-style: preserve-3d;
    transform-origin: center;
    border-radius: 50%;
    background-color: rgba(99, 248, 0, 0.527);
    filter: blur(90px);

    @media (max-width:440px){
      height: 20rem;
      width: 50%;
      gap:1rem;
    }
    }
  @media (max-width:440px){
    height: auto;
    width: 100%;
    top:0;
  }
  }
`;
export const BaseCarrossel = styled.div`
  position: absolute;
  position: relative;
  height: 20rem;
  width: 20rem;
  perspective: 10000px;
  transform-style: preserve-3d;
  transform-origin: center;
  border-radius: 50%;

  @media (max-width:440px){
    height: 10rem;
    width: 78%;
  }
`;
export const Carta1Carrossel = styled.div`
  position:relative;
  position: absolute;
  height: 16rem;
  width: 11rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: bottom;
  transform: rotateX(-90deg);
  cursor:grab;
  filter: contrast(150%);
  top: -15rem;
  right: -5rem;
  background-image: url(${cartaXbox});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;  

  @media (max-width:440px){
    height: 11rem;
    width: 8rem;
  }
`;
export const Carta2Carrossel = styled.div`
  position:relative;
  position: absolute;
  height: 16rem;
  width: 11rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: bottom;
  transform: rotateX(-90deg);
  cursor:grab;
  filter: contrast(150%);
  bottom: 0;
  left: 4.5rem;
  background-image: url(${cartaPlaystation});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @media (max-width:440px){
    height: 11rem;
    width: 8rem;
  }
`;
export const Carta3Carrossel = styled.div`
  position:relative;
  position: absolute;
  height: 16rem;
  width: 11rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: bottom;
  transform: rotateX(-90deg);
  cursor:grab;
  filter: contrast(150%);
  top: -15rem;
  left: -5rem;
  background-image: url(${cartaPC});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @media (max-width:440px){
    height: 11rem;
    width: 8rem;
  }
`;
export const PrecoCoins = styled.div`
  position: absolute;
  bottom: 3.5rem;
  left: 2.2rem;
  font-size:12px;
  color: #fff; 

  @media (max-width:440px){
    bottom: 2.2rem;
    left:1.4rem;
    font-size: 7px;

  }
`;
export const QuantCoins = styled.div`
  position:absolute;
  bottom: 3.5rem;
  right: 2.5rem;
  font-size:12px;
  color: #fff;

  @media (max-width:440px){
    bottom: 2.2rem;
    right:1.7rem;
    font-size: 7px;
  }
`;
