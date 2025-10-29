import styled from "styled-components";

export const MainContainerCompra = styled.main`
  grid-area: m;

  display: grid;

  grid-template-areas: "slider"
                       "duvidas"
                       "recarga"
                       "calculadora"
                       "contato";
  grid-template-columns: 1fr;
  grid-template-rows: 28rem 1fr 1fr 1fr 0.69fr;

  /* Tablet grande */
  @media (max-width: 1024px) {
    grid-template-rows: 24rem 1fr 1.1fr 1fr 1fr;
    gap: 4rem;
  }

  /* Tablet médio */
  @media (max-width: 768px) {
    grid-template-rows: 20rem 1fr 1fr 1fr 1fr;
    gap: 3rem;
  }

  /* Celular grande */
  @media (max-width: 600px) {
    grid-template-rows: 18rem auto auto auto auto;
    gap: 2rem;
  }

  /* Celular pequeno */
  @media (max-width: 440px) {
    grid-template-rows: 7.6rem auto auto auto auto;
    gap:0;
    }
`;