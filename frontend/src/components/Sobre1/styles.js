import styled from 'styled-components'

export const BoxSobre1 = styled.div`
  height: 17rem;
  width: 15rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
  border-radius: 10px;
  background: linear-gradient(135deg,  #333 0%, #111 100%);

  @media(max-width:440px){
    height: 100%;
    width: 40%;
  }
`;
export const CirculoIconeSobre = styled.div`
  height: 4rem;
  width: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--cor-verde_cana);
  border-radius: 50%;
  margin-top: 2rem;
  
`;
export const CirculoIconeSobreImg = styled.img`
  height: 8rem;
  width: 8rem;
`;
export const BoxSobre1H3 = styled.h3`
  color: var(--cor-branca);
  font-family: var(--fonte-secundaria);
  font-style: normal;
  font-weight: 400;
  font-size: medium;
  margin-top: .5rem;
`;
export const BoxSobre1H4 = styled.h4`
  color: gray;
  font-family: var(--fonte-secundaria);
  font-style: normal;
  font-weight: 500;
  font-size: medium;
  margin-top: .5rem;

    
  @media(max-width:440px){
    font-size: 10px;
  }
`;
