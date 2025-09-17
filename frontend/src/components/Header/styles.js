import styled from "styled-components";

export const HeaderContainer = styled.header`
  grid-area: h;
  background-color: var(--cor-preto);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 5rem; 

  /* Tablet grande */
  @media (max-width: 1024px) {
    padding: 0 3.5rem;
  }

  /* Tablet médio */
  @media (max-width: 768px) {
    padding: 0 2.5rem;
  }

  /* Celular grande */
  @media (max-width: 600px) {
    padding: 0 1.5rem;
  }

  /* Celular pequeno */
  @media (max-width: 480px) {
    padding: 0 1.5rem;
  }
`;
