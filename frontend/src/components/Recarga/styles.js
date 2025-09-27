import { Link } from "react-router-dom";
import styled from "styled-components";

export const RecargaContainer = styled.div`
  grid-area: recarga;
  position: relative;
  background-color: var(--cor-recarga);
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: start;
  gap: 4rem;
  margin-top: 4rem;

  @media (max-width:440px){
    width:100vw;
    align-itens: center;

  }
`;

export const BoxRecarga = styled.div`
  height:85%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items:center ;

  @media (max-width:440px){
    width:100%;    
    position:relative;
  }

`;
export const BoxRecargaManual = styled.div`
  height:8rem;
  width:80%;
  background: linear-gradient(135deg,  #333 0%, #111 100%);
  border-radius:5px;
  cursor:pointer;
  text-decoration:none;
  display:flex;
  flex-direction:row;
  justify-content:start;
  align-items: center;
  font-family:var(--font-principal);
  color:white;

  @media (max-width:440px){
  gap:.5rem;
  height:auto;
  width:50%;
  padding:.5rem;
  
  }
`;

export const Detalhebox = styled.a`
  height:100%;
  width:20%;
  background-color:var(--cor-verde_cana);
  border-radius:5px;
  cursor:pointer;
  display:flex;
  justify-content:center;
  align-items: center;
  text-decoration:none;


  svg{
    color:black;
    height:1.5rem;
    width: 1.5rem;

    @media (max-width:440px){
      height:1rem;
      width:1rem;
    }
  }
`;
export const Detalhebox2 = styled.a`
  height:100%;
  width:100%;
  border-radius:5px;
  cursor:pointer;
  display:flex;
  justify-content:center;
  align-items: center;
  text-decoration:none;
  color:white;

`;

export const H4 = styled.h4`
  font-family:var(--fonte-principal)
  font-size: smaller;
  color:white;

  @media (max-width:440px){
    font-size: 11px;
  }
`;

export const BoxalinhaBts = styled.div`
  height:5rem;
  width:100%;
  display:flex;
  flex-direction:row;
  justify-content: center;
  align-items: center;
  gap:2rem;

  @media (max-width:440px){
  gap:1rem;
  }

`;
export const BtPaginaCompra = styled.button`
  display:none;
 
  @media(max-width:440px){
    display:flex;
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
    padding:1rem;
    font-size:small;
  }
`;
