import styled from 'styled-components'

export const Servicos = styled.div`
  grid-area: sobre;
  display: flex;
  flex-direction: column;
  justify-content:start;
  align-items: center;
  gap: 1rem;

  @media(max-width:440px){
    width:100vw;
    justify-content:center;
  }
`;
export const BoxInfoSobre = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
  gap: 1rem;
  margin-top: 1rem;

  @media(max-width:440px){
    flex-direction: column;
    align-items: center;
    gap:3px;

  }
`;