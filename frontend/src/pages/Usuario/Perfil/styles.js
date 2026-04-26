import styled from "styled-components";

/* ===============================
   LAYOUT
=============================== */

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
  grid-template-rows: 5rem 1fr 15rem;
  font-family: var(--fonte-principal);
  overflow-x: hidden;
  overflow-y: auto;
`;

export const Mainperfil = styled.div`
  grid-area: p;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 2rem 1rem;
  gap: 2rem;
  width: 100%;
`;

/* ===============================
   CONTAINER PADRÃO
=============================== */

export const Container = styled.div`
  width: 60%;
  max-width: 90%;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 14px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.12);
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 1024px) {
    width: 80%;
  }

  @media (max-width: 768px) {
    width: 95%;
    padding: 16px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  h3 {
    font-size: 20px;
    font-weight: 600;
  }
`;

export const InfoItem = styled.p`
  font-size: 15px;
  margin-bottom: 6px;
  color: #333;
`;

/* ===============================
   FORM
=============================== */

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  transition: 0.2s;

  &:focus {
    border-color: #00b050;
    outline: none;
    box-shadow: 0 0 0 2px rgba(0,176,80,0.2);
  }
`;

export const Button = styled.button`
  background: linear-gradient(135deg, #00b050, #009e48);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  }

  &:disabled {
    background-color: #7fc77f;
    cursor: not-allowed;
  }
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
  transition: 0.2s;

  background: #1976d2;
  color: white;

  &:hover {
    background: #125aa0;
  }
`;

export const DeleteButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: 0.2s;

  background: #e53935;
  color: white;

  &:hover {
    background: #b71c1c;
  }
`;

/* ===============================
   CARD DE CREDENCIAL
=============================== */

export const Card = styled.div`
  padding: 14px;
  background: #f0f0f0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

/* ===============================
   AÇÕES (botões lado a lado)
=============================== */

export const ActionsRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

/* ===============================
   RESPONSIVO EXTRA
=============================== */

export const WarningBox = styled.div`
  background: #fff3cd;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
`;