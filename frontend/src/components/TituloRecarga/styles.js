import styled from "styled-components";

export const CartasTxtBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: start;
  gap: 2rem;
  text-align: start;
`;

export const TitulosAreasNavegacao = styled.h1`
  
  align-items: start;
  text-align: start;
  word-spacing: .4rem;
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
`;
export const DetalheBolinha = styled.div`
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  background-color: var(--cor-branca);
`;
export const RecargaTxt = styled.h4`
  color: var(--cor-branca);
  font-family: var(--fonte-principal);
  font-weight: 400;
  font-style: normal;
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
`;
