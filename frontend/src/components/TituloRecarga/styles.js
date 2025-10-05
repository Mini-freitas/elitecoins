import styled from "styled-components";

export const CartasTxtBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: start;
  gap: 2rem;
  text-align: start;

  @media(max-width:440px){
    width:100%;
    justify-content:center;
    align-items: center;
    margin-top:3rem;
  }
  
`;

export const TitulosAreasNavegacao = styled.h1`
  
  align-items: start;
  text-align: start;
  word-spacing: .4rem;

  @media(max-width:440px){
    font-size: 1.2rem;
    text-align: center;
    word-spacing:0;
  }
`;
export const Detalhe = styled.div`
  height: auto;
  width: auto;
  color: var(--cor-branca);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 10rem;

  @media(max-width:440px){
      display: none;
  }
`;
export const DetalheBolinha = styled.div`
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  background-color: var(--cor-branca);

  @media(max-width:440px){
    display:none;
  }
`;

export const BoxTextos = styled.div`
  display:flex;
  flex-direction:column;
  justfy-content:center;
  align-itens:center;
  gap:1rem; 

  @media(max-width:440px){
    flex-direction:row;
  }
`;
export const RecargaTxt = styled.h4`
  color: var(--cor-branca);
  font-family: var(--fonte-principal);
  font-weight: 400;
  font-style: normal;

  @media(max-width:440px){
    font-size:10px;
    text-align:start;
    max-width: 180px;

    br{
      display:none;
    }
  }
`;
export const RecargaTxtB = styled.b`
  color: var(--cor-cinza-escuro);
`;
export const BtPaginaCompra = styled.button`
  height: auto;
  width: auto;
  padding: 1rem 3rem;
  background-color: var(--cor-verde_cana);
  color: var(--cor-preto);
  font-size: medium;
  font-family: var(--fonte-secundaria);
  font-weight: 600;
  font-style: normal;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  @media(max-width:440px){
    display:none;
  }
`;
