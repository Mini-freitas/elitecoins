import styled from 'styled-components'

export const BoxSobre2 = styled.div`
  height: 20rem;
  width: 15rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
  border-radius: 10px;
  background-color: var(--cor-verde_cana);
`;
export const CirculoIconeSobre2Img = styled.img`
  height: 8rem;
  width: 8rem;
`;
export const CirculoIconeSobre2 = styled.div`
  height: 4rem;
  width: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--cor-preto);
  border-radius: 50%;
  margin-top: 2rem;
`;
export const BoxSobre2H3 = styled.h3`
  color: var(--cor-preto);
  font-family: var(--fonte-secundaria);
  font-style: normal;
  font-weight: 800;
  font-size: medium;
  margin-top: .5rem;
`;
export const BoxSobre2H4 = styled.h4`
  color: var(--cor-cinza-escuro);
  font-family: var(--fonte-secundaria);
  font-style: normal;
  font-weight: 800;
  font-size: small;
`;
export const BtLerMais = styled.div`
  height: auto;
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: .5rem;
  background-color: var(--cor-preto);
  color: var(--cor-verde_cana);
  font-family: var(--fonte-principal);
  border-radius: 5px;
  padding: .5rem 3.5rem;
  text-decoration: none;
  text-align: center;
`;
export const BtLerMaisSvg = styled.svg`
  height: 1rem;
  width: 1rem;
  margin-top: 5px;
  color: var(--cor-verde_cana);
`;