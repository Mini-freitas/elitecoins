import styled from "styled-components";

export const TutorialContainer = styled.div`
  grid-area: duvidas;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 3rem;
  margin-top: 2.5rem;

  @media(max-width:440px){
    width:100vw;
    justify-content:center;
  }
`;

export const BoxPrincipaisDuvidas = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
  gap: 3px;

  @media(max-width:440px){
    width:100vw;
    flex-direction: column;
    justify-content:center;
    align-items: center;
  }
`;
