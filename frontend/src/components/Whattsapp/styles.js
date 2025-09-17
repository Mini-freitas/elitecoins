import styled, { keyframes } from "styled-components";

// animação principal (balanço infinito)
const animateWhatsapp = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
  }
`;

// animação no hover
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-15px);
  }
  60% {
    transform: translateY(-8px);
  }
`;

export const ContainerWhatsapp = styled.div`
  height: 2rem;
  width: 2rem;
  position: fixed;
  bottom: 4.5rem;
  right: 2rem;
  z-index: 10;
  cursor: pointer;
  background-color: rgb(60, 204, 3);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 50%;
  animation: ${animateWhatsapp} 0.5s infinite alternate;

  svg {
    height: 2rem;
    width: 2.5rem;
  }

  &:hover {
    animation: ${bounce} 1s;
  }

  a {
    text-decoration: none;
    list-style: none;
    color: white;
  }

  /* Tablet grande */
  @media (max-width: 1024px) {
  bottom: 4.5rem;
  }

  /* Tablet médio */
  @media (max-width: 768px) {
  bottom: 5rem;
  }

  /* Celular grande */
  @media (max-width: 600px) {
  bottom: 7rem;
  }

  /* Celular pequeno */
  @media (max-width: 480px) {
  bottom: 8rem;
  }
`;