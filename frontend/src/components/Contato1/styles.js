import styled from 'styled-components'

export const BoxContato1 = styled.div`
  height: auto;
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;

  @media(max-width:440px){
    justify-content: start;
    width:15rem;
  }
`;
export const IconeCirculo = styled.div`
  height: 3rem;
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--cor-verde_cana);
  border-radius: 50%;

  @media(max-width:440px){
    height: 2rem;
    width: 2rem;
   }
`;
export const IconeCirculoImg = styled.img`
  height: 6rem;
  width: 6rem;

  @media(max-width:440px){
    height: 4rem;
    width: 4rem;
   }
`;
export const IconeTxt = styled.div`
  height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: .5rem;
`;
export const IconeTxtH3 = styled.h3`
  color: var(--cor-branca);
  font-family: var(--fonte-secundaria);
  font-weight: 400;
  font-style: normal;
  font-size: medium;
  text-align: start;

  @media(max-width:440px){
    font-size: small;
   }
`;
export const IconeTxtH4 = styled.h4`
  color: var(--cor-cinza-escuro);
  font-family: var(--fonte-principal);
  font-weight: 400;
  font-style: normal;
  font-size: medium;
  text-align: start;

  @media(max-width:440px){
    font-size: small;
   }
`;
