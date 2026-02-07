import styled from "styled-components";

export const Comprassec = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: var(--cor-preto);
  display: grid;
  grid-template-areas: 
    "h" 
    "p"
    "f";
  grid-template-columns: 1fr;
  grid-template-rows: 5rem 1fr 15rem; /* header 5rem, footer 15rem, resto pro main */
  font-family: var(--fonte-principal);
  overflow-x: hidden;
  overflow-y: auto;
`;

export const MainCompras = styled.main`
  grid-area:p;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  gap: 2rem;
  margin:2rem;
`;


export const Header = styled.div`

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color:white;
  }
`;

export const BoxCompras = styled.div`
  width:50%;
  padding: 1rem;
  background: #f1f3f4;
  border-radius: 8px;

  h3 {
    margin-top: 0;
    margin-bottom: 0.75rem;
  }

  p {
    margin: 0.25rem 0;
  }
`;

export const CompraItem = styled.div`
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }

  p {
    margin: 0.25rem 0;
  }
`;

export const StatusBadge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  color: #fff;
  background-color: ${({ status }) =>
    status === "AGUARDANDO_PAGAMENTO" ? "#fbbc05" :
    status === "TRANSFERENCIA_ANDAMENTO" ? "#1a73e8" :
    "#34a853"};
`;
