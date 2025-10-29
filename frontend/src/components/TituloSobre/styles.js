import styled from 'styled-components'

export const TituloSobreContainer = styled.div`
  height: auto;
  width: auto;
  @media(max-width:440px){
    display:flex;
    flex-direction:column;
    gap:1rem;
  }
`;
export const TitulosAreasNavegacao = styled.h1`
  height:auto;
  width:auto;

  @media(max-width:440px){
    font-size: 1.2rem;
    text-align:center;
  }
`;

export const TxtSobre = styled.div`
  color: var(--cor-cinza);
  font-family: var(--fonte-principal);
  font-weight: 400;
  font-style: normal;
  font-size: medium;
  text-align: center;

  @media(max-width:440px){
    font-size:small;
    margin:0 1rem;

    br{
      display:none;
    }
  }
`;
