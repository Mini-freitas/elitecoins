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
`;