import styled from "styled-components";

/* CONTAINER DO SINO */
export const Notificacaocontainer = styled.div`
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
    height: 1.1rem;
    width: 1.1rem;
  }
`;


/* BADGE */
export const Badge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;

  height: 1rem;
  width: 1rem;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--fonte-principal);
  font-size: 0.8rem;

  border: 1px solid white;

  background: ${({ $naoVistas }) =>
    $naoVistas > 0 ? "#00c853" : " rgb(80, 80, 80)"};

  color: ${({ $naoVistas }) =>
    $naoVistas > 0 ? "rgb(255, 255, 255)" : "rgb(255, 255, 255)"};


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
    font-size: 0.5rem;
  }
`;

/* BOX PRINCIPAL (PROFISSIONAL) */
export const BoxMenuNotificacao = styled.div`
  position: absolute;
  top: 3.5rem;
  right: 0;
  z-index: 1000;

  width: 18rem;
  max-height: 24rem;

  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;

  overflow: hidden;

  animation: fadeIn 0.15s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* scroll bonito */
  .list {
    overflow-y: auto;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .list::-webkit-scrollbar {
    width: 6px;
  }

  .list::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }

  .list::-webkit-scrollbar-track {
    background: transparent;
  }

  @media (max-width: 480px) {
    right: -1rem;
    width: 16rem;
  }
`;

/* ITEM DE NOTIFICAÇÃO PROFISSIONAL */
export const NotificacaoItem = styled.div`
  padding: 0.75rem;
  border-radius: 10px;

  cursor: pointer;

  background: ${({ vista }) => (vista ? "#f5f5f5" : "#e9fff3")};
  border: 1px solid ${({ vista }) => (vista ? "#eee" : "#b7f5d0")};

  transition: all 0.2s ease;

  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }

  span {
    font-size: 0.85rem;
    color: #222;
    line-height: 1.2rem;
  }
`;

/* TÍTULO */
export const TituloBox = styled.h3`
  font-size: 0.9rem;
  font-weight: 600;

  margin: 0;
  padding: 0.9rem 1rem;

  border-bottom: 1px solid #eee;

  color: #222;
`;