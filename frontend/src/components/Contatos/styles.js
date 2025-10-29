import styled from 'styled-components'

export const ContatosContainer = styled.div`
  grid-area: contato;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  gap: 2rem;
  margin-top: 3rem;

  @media(max-width:440px){
   width:100vw;
   margin-top:0;
  }
`;
export const ContatosContainerColuna = styled.div`
  height: auto;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  @media(max-width:440px){
   width:100%;
  }
`;
export const BoxIconesContato = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  gap: 1rem;

  @media(max-width:440px){
    width:100%;
    justify-content: start;
    flex-direction: column;
   }
`;
export const BoxIconesCirculos = styled.div`
  height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 1rem;
  
 @media(max-width:440px){
    width:100%;
    justify-content: center;
    align-items: center;

   }
`;




