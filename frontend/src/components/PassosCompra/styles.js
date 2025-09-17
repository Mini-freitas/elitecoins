import styled from "styled-components";

export const TutorialContainer = styled.div`
  grid-area: duvidas;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;
export const Alinhatelaid = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  z-index: 7;
  transform: translate(-50%, -50%);
  background-color: transparent;
`;
export const BoxTituloTutorial = styled.div`
  height: auto;
  width: 69%;
`;
export const BoxImgTutorial = styled.div`
  height: 55%;
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const TitulosAreasNavegacao = styled.h1`
  color: var(--cor-branca);
  font-family: var(--fonte-principal);
`;
export const TitulosAreasNavegacaoB = styled.b`
  color: var(--cor-verde_cana);
`;
export const ImgTutorial = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ImgTutorialImg = styled.img`
  height: 37rem;
  width: 37rem;
`;
export const ContainerTutorial = styled.div`
  height: 47%;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 2rem;
  text-align: start;
`;
export const ContainerTutorialH2 = styled.h2`
  font-family: var(--fonte-principal);
  font-style: normal;
  font-weight: 400;
  color: var(--cor-branca);
  font-size: large;
`;
export const ContainerTutorialH2B = styled.b`
  color: var(--cor-cinza-escuro);
`;
export const BoxBtTutorial = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  gap: 1rem;
`;
export const BtIrACompra = styled.button`
  height: auto;
  width: auto;
  padding: .8rem 1.9rem;
  font-family: var(--fonte-principal);
  font-style: normal;
  font-weight: 600;
  background-color: var(--cor-verde_cana);
  color: var(--cor-preto);
  border:none;
  border-radius: 5px;
  cursor: pointer;
`;
export const BtIrACalculadora = styled.button`
  height: auto;
  width: auto;
  padding: .8rem 1.9rem;
  font-family: var(--fonte-principal);
  font-style: normal;
  font-weight: 600;
  background-color: var(--cor-cinza-escuro);
  color: var(--cor-preto);
  border-radius: 5px;
  cursor: pointer;
`;