import styled from "styled-components";

export const LoginContainer = styled.div`
  height: auto;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const BoxLogin = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: .5rem;
  padding: .5rem 2rem;
  border-radius: 5px;
  background-color: var(--cor-verde_cana);
  cursor: pointer;

`;
export const BoxLoginH2 = styled.div`
  color: var(--cor-preto);
  font-family: var(--fonte-secundaria);
  font-weight: 500;
  font-style: normal;
  font-size: medium;
  text-align: center;
`
export const BoxLoginSvg = styled.div`

  height: 1.5rem;
  width: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--cor-preto);
  cursor: pointer;
`;

