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

// =========================
// GRID PRINCIPAL
// =========================
export const GridCompras = styled.div`
  width: 100%;
  max-width: 1200px;

  display: grid;
  gap: 1.5rem;

  grid-template-columns: repeat(3, 1fr);

  align-items: stretch; /* 🔥 altura igual */

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

// =========================
// BOX (ALTURA FIXA)
// =========================
export const BoxCompras = styled.div`
  padding: 1.5rem;
  background: #f1f3f4;
  border-radius: 12px;

  display: flex;
  flex-direction: column;

  height: 420px; /* 🔥 ALTURA FIXA IGUAL */

  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
  }
`;

// =========================
// LISTA COM SCROLL
// =========================
export const ListaCompras = styled.div`
  flex: 1;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  padding-right: 4px;

  /* SCROLL BONITO */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #999;
  }
`;

// =========================
// ITEM
// =========================
export const CompraItem = styled.div`
  background: white;
  padding: 0.75rem;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);

  transition: transform 0.15s ease;

  &:hover {
    transform: translateY(-2px);
  }

  p {
    margin: 0;
    font-size: 0.9rem;
  }
`;

// =========================
// STATUS
// =========================
export const StatusBadge = styled.span`
  align-self: flex-start;

  padding: 0.25rem 0.6rem;
  border-radius: 12px;

  font-size: 0.75rem;
  font-weight: 600;

  color: #fff;
  margin-top: 0.25rem;

  background-color: ${({ status }) => {
    if (status === "pending") return "#c4c700";
    if (status === "in_process") return "#1a73e8";
    if (status === "approved") return "#34a853";
    if (status === "rejected") return "#bd0b0b";
    if (status === "cancelled") return "#bd0b0b";
    if (status === "refunded") return "#00bcd4";
    if (status === "charged_back") return "#9c27b0";
    if (status === "expired") return "#757575";
    return "#ccc";
  }};
`;

// =========================
// BOTÃO CANCELAR
// =========================
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

  transition: background 0.2s;

  &:hover {
    background: #d9363e;
  }
`;

// =========================
// BOTÃO VER MAIS (FIXO)
// =========================
export const VerMais = styled.button`
  margin-top: auto; /* 🔥 fixa no final */
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

export const ListaScroll = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  overflow-y: auto;

  /* 🔥 ALTURA FIXA DO CONTEÚDO */
  max-height: 400px;

  padding-right: 4px;

  /* Scroll bonito */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;