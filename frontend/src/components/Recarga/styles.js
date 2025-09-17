import { Link } from "react-router-dom";
import styled from "styled-components";

export const RecargaContainer = styled.div`
  grid-area: recarga;
  position: relative;
  background-color: var(--cor-recarga);
  display: flex;
  flex-direction: row;
  justify-content:center;
  align-items: start;
  gap: 4rem;
  margin-top: 4rem;
`;

export const BoxRecarga = styled.div`
  height:85%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items:center ;

`;
export const BoxRecargaManual = styled.a`
  position: relative;
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

`;

export const Detalhebox = styled.div`
  height:100%;
  width:20%;
  background-color:var(--cor-verde_cana);
  border-radius:5px;
  cursor:pointer;
  display:flex;
  justify-content:center;
  align-items: center;

  svg{
    color:black;
    height:1.5rem;
    width: 1.5rem;
  }
`;
export const Detalhebox2 = styled.div`
  height:100%;
  width:100%;
  border-radius:5px;
  cursor:pointer;
  display:flex;
  justify-content:center;
  align-items: center;

`;
export const RecargaSegura = styled.div`
  position: absolute;
  top:-2.7rem; 
  right: -16rem;
  height:100%;
  width:100%;
  border-radius:5px;
  cursor:pointer;
  display:flex;
  justify-content:center;
  align-items: center;
  gap:10px;
  font-family:var(--fonte-principal)
  font-size: smaller;

`;
export const H4 = styled.h4`
  font-family:var(--fonte-principal)
  font-size: smaller;
`;


