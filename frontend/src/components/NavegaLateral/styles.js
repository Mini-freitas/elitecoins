import styled from "styled-components";

export const NavegacaoH2 = styled.div`
  font-size: medium;
  font-family: var(--fonte-secundaria);
  font-weight: 400;
  font-style: normal;
  color: white;left: 8rem;

  &:hover{
    color: var(--cor-verde_cana);
    cursor: pointer;
    transition: .3s;
  }
`;
export const ContainerNavegaLateral = styled.div`
  width: 2.3rem;
  height:auto;
  background-color: #24ca02;
  color: white;
  position: fixed;
  z-index: 10;
  top: 8rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap:1.2rem;
  padding: 1rem;

  svg{
    cursor: pointer;
    height: 1.3rem;
    width: 1.3rem;
    color: rgb(0, 0, 0);
  }
`;
