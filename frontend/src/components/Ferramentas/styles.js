import styled from "styled-components";

export const FerramentasContainer = styled.div`
  position: relative; 
  
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem; 

  /* Tablet grande */
  @media (max-width: 1024px) {
    gap: 1rem;
  }

  /* Tablet médio */
  @media (max-width: 768px) {
    gap: 0.8rem;
  }

  /* Celular */
  @media (max-width: 440px) {
    gap: 0.6rem;
  }
`;

export const Notificacao = styled.div`
  position: relative;
`;

export const Mensagem = styled.div`
  position: relative;
`;

export const Icone = styled.svg`
  color: white;
  cursor: pointer;
  height: 1.5rem;
  width: 1.5rem;

  /* Tablet grande */
  @media (max-width: 1024px) {
    height: 1.3rem;
    width: 1.3rem;
  }

  /* Tablet médio */
  @media (max-width: 768px) {
    height: 1.1rem;
    width: 1.1rem;
  }

  /* Celular */
  @media (max-width: 440px) {
    height: 1rem;
    width: 1rem;
  }
`;

export const Badge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  color: rgb(255, 255, 255);
  background-color: rgb(80, 80, 80);
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  border: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  cursor: pointer;

  /* Tablet grande */
  @media (max-width: 1024px) {
    height: 0.9rem;
    width: 0.9rem;
    font-size: 0.7rem;
  }

  /* Tablet médio */
  @media (max-width: 768px) {
    height: 0.8rem;
    width: 0.8rem;
    font-size: 0.65rem;
  }

  /* Celular */
  @media (max-width: 480px) {
    height: 0.7rem;
    width: 0.7rem;
    font-size: 0.6rem;
  }
`;
