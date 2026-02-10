import styled from "styled-components";

export const Comprassec = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: var(--cor-preto);
  display: grid;
  grid-template-areas: 
    "h" 
    "p"
    "f";
  grid-template-columns: 1fr;
  grid-template-rows: 5rem 1fr 15rem;
  font-family: var(--fonte-principal);
`;

export const MainCompras = styled.main`
  grid-area: p;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem 1rem;
`;

export const Header = styled.div`
  h2 {
    margin: 0;
    font-size: 1.8rem;
    color: white;
  }
`;

export const GridCompras = styled.div`
  width: 100%;
  max-width: 1200px;
  display: grid;
  gap: 1.5rem;

  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const BoxCompras = styled.div`
  padding: 1.5rem;
  background: #f1f3f4;
  border-radius: 10px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
  }
`;

export const CompraItem = styled.div`
  background: white;
  padding: 0.75rem;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);

  p {
    margin: 0;
    font-size: 0.9rem;
  }
`;

export const StatusBadge = styled.span`
  align-self: flex-start;
  padding: 0.25rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #fff;
  margin-top: 0.25rem;

  background-color: ${({ status }) =>
    status === "AGUARDANDO_PAGAMENTO" ? "#fbbc05" :
    status === "TRANSFERENCIA_ANDAMENTO" ? "#1a73e8" :
    "#34a853"};
`;

export const BotaoCancelar = styled.button`
  margin-top: 6px;
  padding: 6px 10px;
  background: #ff4d4f;
  border: none;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: bold;

  &:hover {
    background: #d9363e;
  }
`;

export const VerMais = styled.button`
  margin-top: 8px;
  padding: 6px 10px;
  background: transparent;
  border: none;
  color: #1a73e8;
  font-weight: bold;
  cursor: pointer;
  text-align: left;

  &:hover {
    text-decoration: underline;
  }
`;
