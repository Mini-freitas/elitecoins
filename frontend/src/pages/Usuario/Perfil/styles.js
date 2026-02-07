// src/pages/Usuario/Perfil/styles.js
import styled from "styled-components";

export const Perfilsec = styled.div`
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

export const Mainperfil = styled.div`
  grid-area: p;
  display: flex;
  flex-direction: column;
  align-items: center; /* centraliza horizontalmente os containers */
  justify-content: flex-start; /* começa do topo */
  padding: 2rem 1rem;
  gap: 2rem; /* espaço entre os containers */
  width: 100%;
`;

export const Container = styled.div`
  width: 60%; /* largura fixa para desktop */
  max-width: 90%; /* responsivo para mobile */
  padding: 20px;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 12px; /* espaçamento entre itens dentro do container */
`;


export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const InfoItem = styled.p`
  font-size: 16px;
  margin-bottom: 12px;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Input = styled.input`
  padding:5px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
`;

export const Button = styled.button`
  background-color: #00b050;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #009e48;
  }

  &:disabled {
    background-color: #7fc77f;
    cursor: not-allowed;
  }
`;

export const Select = styled.select`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
`;


/* ===============================
   BOTÕES
=============================== */

export const EditButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;

  background: ${({ $incomplete }) =>
  $incomplete ? "#1a73e8" : "#e0e0e0"};

  color: ${({ incomplete }) => (incomplete ? "#fff" : "#000")};

  &:hover {
    opacity: 0.9;
  }
`;

export const CompleteProfileButton = styled.button`
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 24px;
  border: none;
  background: #1a73e8;
  color: #fff;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #1558b0;
  }
`;

/* ===============================
   PROGRESSO
=============================== */

export const ProgressWrapper = styled.div`
  margin: 1.5rem 0;
`;

export const ProgressBar = styled.div`
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.75rem;

  span {
    display: block;
    height: 100%;
    background: #1a73e8;
    transition: width 0.3s ease;
  }
`;

export const ProgressStep = styled.span`
  font-size: 0.8rem;
  margin-right: 1rem;
  color: ${({ $active }) => ($active ? "#1a73e8" : "#9e9e9e")};

  font-weight: ${({ active }) => (active ? "600" : "400")};
`;

/* ===============================
   CTA / VOUCHER
=============================== */

export const VoucherBox = styled.div`
  margin: 1rem 0;
  padding: 0.75rem 1rem;
  background: #f1f3f4;
  border-radius: 8px;
  font-size: 0.9rem;
`;

export const CtaBox = styled.div`
  margin: 1.5rem 0;
  padding: 1.25rem;
  background: #e8f0fe;
  border-radius: 12px;

  p {
    margin: 0;
    font-size: 0.9rem;
  }
`;
