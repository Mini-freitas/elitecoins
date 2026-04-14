import styled from "styled-components";


export const Notificacaocontainer = styled.div`
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
  background-color: rgb(0, 255, 204);
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  border: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  cursor: pointer;
  margin:.5rem;

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
export const BoxMenuNotificacao = styled.div`
  position: absolute;
  top: 3.5rem;
  right: 0;
  z-index: 1000;

  width: 16rem;
  height: 18rem;

  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;

  overflow-y: auto;

  animation: fadeIn 0.15s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Scroll mais bonito (opcional mas recomendado) */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Mobile */
  @media (max-width: 480px) {
    right: -1rem;
    width: 14rem;
  }
`;
export const TituloBox = styled.h3`
  font-family: var(--fonte-secundaria);
  font-size: small;
  color:black;
  margin:.5rem;
`;