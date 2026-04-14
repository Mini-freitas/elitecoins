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
  align-items: stretch;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const BoxCompras = styled.div`
  padding: 1.5rem;
  background: #f1f3f4;
  border-radius: 12px;

  display: flex;
  flex-direction: column;

  height: 420px;
`;

export const ListaScroll = styled.div`
  flex: 1;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  padding-right: 4px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }
`;

export const CompraItem = styled.div`
  background: white;
  padding: 0.75rem;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);

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

  background-color: ${({ status }) => {
    if (status === "pending") return "#c4c700";
    if (status === "in_process") return "#1a73e8";
    if (status === "approved") return "#34a853";
    if (status === "rejected") return "#bd0b0b";
    if (status === "cancelled") return "#bd0b0b";
    if (status === "expired") return "#757575";
    return "#ccc";
  }};
`;

export const BotaoCancelar = styled.button`
  margin-top: 6px;
  padding: 6px 10px;
  background: #bd0b0b;
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

// 🔥 FALTAVA ESSE (ERRO DO BUILD)
export const BotaoContinuar = styled.button`
  margin-top: 6px;
  padding: 6px 10px;
  background: #1a73e8;
  border: none;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: bold;

  &:hover {
    background: #1666c1;
  }
`;

export const VerMais = styled.button`
  margin-top: auto;
  padding-top: 10px;

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