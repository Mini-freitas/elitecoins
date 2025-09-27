import styled from "styled-components";

export const Duvida3Container = styled.div`
  height: 13rem;
  width: 17rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 1rem;
  text-align: start;
  border-radius: 10px;
  background: linear-gradient(135deg,  #333 0%, #111 100%);

   @media(max-width:440px){
    height: 11rem;
    width: 14rem;
  }
`;
export const Duvida3H3 = styled.h3`
  color: var(--cor-branca);
  font-family: var(--fonte-secundaria);
  font-weight: 400;
  font-style: normal;
  font-size: medium;
  margin-left: 20px;

  @media(max-width:440px){
    font-size:small; 
    margin-left: 15px;
  }
`;
export const Duvida3H4 = styled.h4`
  color: var(--cor-cinza);
  font-family: var(--fonte-principal);
  font-weight: 400;
  font-style: normal;
  font-size: small;
  margin-left: 20px;

  @media(max-width:440px){
    font-size:10px; 
    margin-left: 15px;

    br{
    display:none;
    }
  }
`;
export const NumeroPergunta3 = styled.h2`
  position: absolute;
  top: 10px;
  left: 10px;
  color: var(--cor-verde_cana);
  font-family: var(--fonte-secundaria);

  @media(max-width:440px){
    font-size:20px; 
  }
`;
