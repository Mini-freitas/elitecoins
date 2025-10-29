import styled from "styled-components";

export const BoxTituloDuvidas = styled.div`
  height:auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  text-align: start;

    @media(max-width:440px){
    flex-direction:column;
    justify-content: center;
    text-align: center;
    gap:1.5rem;
  }
`;
export const TituloDuvidas = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  `;
export const ExplicacaoDuvidas = styled.div`
  height: 100%;
  width: auto;
  display: flex;
  justify-content: start;

`;
export const ExplicacaoDuvidasH2 = styled.h2`
  font-family: var(--fonte-principal);
  font-weight: 500;
  font-style: normal;
  font-size: 1.3rem;

  @media(max-width:440px){
    font-size:small;
    text-align:center;
    margin:0 1rem;

    br{
      display:none;
    }
  }
`;
export const TitulosAreasNavegacao = styled.h2`
  color: var(--cor-branca);
  font-family: var(--fonte-principal);
  text-align: start;
  font-size: 2.1rem;

  @media(max-width:440px){
    font-size: 1.2rem;

    br{
      display:none;
    }
  }
`;
