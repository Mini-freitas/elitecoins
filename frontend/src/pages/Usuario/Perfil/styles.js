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

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

/* ===============================
   CONTAINER PADRÃO
=============================== */

export const Container = styled.div`
  width: 60%;
  max-width: 800px;
  padding: 20px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.2s ease;

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
  margin-bottom: 8px;

  h3 {
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

export const InfoItem = styled.p`
  font-size: 14px;
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
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #dcdcdc;
  font-size: 14px;
  outline: none;
  transition: 0.2s;

  &:focus {
    border-color: #00b050;
    box-shadow: 0 0 0 2px rgba(0,176,80,0.15);
  }
`;

export const Button = styled.button`
  background: linear-gradient(135deg, #00b050, #009e48);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px  #1558b0;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background: #a5d6a7;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const Select = styled.select`
  padding: 10px;
  border-radius: 8px;
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
  background:  #1a73e8;
  color: #333;
  transition: 0.2s;

  &:hover {
    background: #1558b0;
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.97);
  }
`;

export const CompleteProfileButton = styled.button`
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 24px;
  border: none;
  background: linear-gradient(135deg, #1a73e8, #1558b0);
  color: #fff;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(26,115,232,0.3);
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
  font-weight: ${({ $active }) => ($active ? "600" : "400")};

  @media (max-width: 768px) {
    display: block;
    margin-bottom: 4px;
  }
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