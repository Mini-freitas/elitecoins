import styled from 'styled-components';
export const BotaoContinuar = styled.div`
  padding: 1rem 2.8rem;
  background-color: var(--cor-verde_cana);
  color: var(--cor-preto);
  font-family: var(--fonte-secundaria);
  font-weight: 600;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;

  @media(max-width: 440px) {
    margin-top:.5rem;
    padding: .8rem 2.5rem;
    font-size: 11px;
  }
`;
