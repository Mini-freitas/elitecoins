import styled from "styled-components";

export const LogoContainer = styled.div`
  height: 3.5rem;
  width: 3.5rem;
  object-fit: cover;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Tablet grande */
  @media (max-width: 1024px) {
    height: 3.2rem;
    width: 3.2rem;
  }

  /* Tablet médio */
  @media (max-width: 768px) {
    height: 3rem;
    width: 3rem;
  }

  /* Celular grande */
  @media (max-width: 600px) {
    height: 2.8rem;
    width: 2.8rem;
  }

  /* Celular pequeno */
  @media (max-width: 480px) {
    height: 2.5rem;
    width: 2.5rem;
  }
`;

export const LogoSVG = styled.img`
  height: 3.5rem;
  width: 3.5rem;

  /* Tablet grande */
  @media (max-width: 1024px) {
    height: 3.2rem;
    width: 3.2rem;
  }

  /* Tablet médio */
  @media (max-width: 768px) {
    height: 3rem;
    width: 3rem;
  }

  /* Celular grande */
  @media (max-width: 600px) {
    height: 2.8rem;
    width: 2.8rem;
  }

  /* Celular pequeno */
  @media (max-width: 480px) {
    height: 2.5rem;
    width: 2.5rem;
  }
`;
