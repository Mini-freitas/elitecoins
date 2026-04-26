import styled, { css } from "styled-components";

/* ===============================
   BREAKPOINTS
=============================== */

const breakpoints = {
  tablet: "1024px",
  mobile: "768px",
};

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

  padding: 2rem 1rem;
  gap: 2rem;
  width: 100%;
`;

/* ===============================
   CONTAINER
=============================== */

export const Container = styled.div`
  width: 60%;
  max-width: 900px;

  padding: 20px;

  background: #f9f9f9;
  border-radius: 14px;

  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);

  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: ${breakpoints.tablet}) {
    width: 80%;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 95%;
    padding: 16px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2, h3 {
    font-size: 20px;
    font-weight: 600;
  }

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
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

/* ===============================
   BOTÕES (PADRÃO PROFISSIONAL)
=============================== */

const buttonVariants = {
  primary: css`
    background: linear-gradient(135deg, #00b050, #009e48);
    color: white;

    &:hover {
      background: linear-gradient(135deg, #00c95c, #008f3f);
    }
  `,

  danger: css`
    background: #e53935;
    color: white;

    &:hover {
      background: #b71c1c;
    }
  `,

  secondary: css`
    background: #1976d2;
    color: white;

    &:hover {
      background: #125aa0;
    }
  `,

  ghost: css`
    background: #e0e0e0;
    color: #000;

    &:hover {
      background: #cfcfcf;
    }
  `,
};

export const Button = styled.button`
  padding: 12px;

  border-radius: 10px;
  border: none;

  cursor: pointer;
  font-weight: 600;

  transition: 0.2s;

  ${({ variant }) => buttonVariants[variant || "primary"]}

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const EditButton = styled(Button)`
  ${buttonVariants.secondary}
`;

export const DeleteButton = styled(Button)`
  ${buttonVariants.danger}
`;

/* ===============================
   CARD
=============================== */

export const Card = styled.div`
  padding: 14px;

  background: #f0f0f0;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ActionsRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
  }
`;

/* ===============================
   WARNING
=============================== */

export const WarningBox = styled.div`
  background: #fff3cd;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
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
`;

/* ===============================
   VOUCHER / CTA
=============================== */

export const VoucherBox = styled.div`
  padding: 12px;

  background: #f1f3f4;
  border-radius: 10px;

  font-size: 14px;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const CtaBox = styled.div`
  padding: 16px;

  background: #e8f0fe;
  border-radius: 12px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CompleteProfileButton = styled(Button)`
  width: fit-content;
`;