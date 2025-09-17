import styled from "styled-components";

export const Duvida2Container = styled.div`
  height: 15rem;
  width: 17rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 1rem;
  text-align: start;
  border-radius: 10px;
  background-color: var(--cor-verde_cana);
`;
export const Duvida2H3 = styled.h3`
  color: var(--cor-preto);
  font-family: var(--fonte-secundaria);
  font-weight: 700;
  font-style: normal;
  font-size: medium;
  margin-left: 25px;
`;
export const Duvida2H4 = styled.h4`
  color: var(--cor-preto);
  font-family: var(--fonte-principal);
  font-weight: 1000;
  font-style: normal;
  font-size: small;
  margin-left: 25px;
`;
export const Duvida2H5 = styled.h5`
  color: var(--cor-preto);
  width: 100%;
  font-family: var(--fonte-principal);
  font-style: normal;
  font-weight: 600;
  font-size: .8rem;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
`;
export const NumeroPergunta2 = styled.h2`
  position: absolute;
  top: 10px;
  left: 10px;
  color: var(--cor-preto);
  font-family: var(--fonte-secundaria);
`;