import styled from "styled-components";

export const SvgUsuario = styled.button`
  color: white;
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;

  svg{
  color: white;
  cursor: pointer;
  height: 1.5rem;
  width: 1.5rem;

  /* Tablet grande */
  @media (max-width: 1024px) {
    height: 1.3rem;
    width: 1.3rem;
  }

  /* Tablet médio */
  @media (max-width: 768px) {
    height: 1.3rem;
    width: 1.3rem;
  }

  /* Celular */
  @media (max-width: 480px) {
    height: 1.2rem;
    width: 1.2rem;
  }
  
  }
`;

export const BoxMenuUsuario = styled.div`
  position: absolute; 
  top: 3.8rem;
  right: -4rem;
  z-index: 1000;
  height: 18rem;
  width: 15rem;
  background-color: #ffffffa9;
`;

export const BtLogout = styled.button`
  position: absolute;
  bottom: 1rem;
  left: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  text-align: center;

  background-color: rgb(99, 248, 0);
  outline: none;
  border: none;
  cursor: pointer;
  padding: 6px 15px;
  border-radius: 5px;
  font-family: var(--fonte-secundaria);

  &:hover {
    background-color: rgb(245, 66, 66);
    transition: 0.5s;
  }
`;

export const NomeUsuario = styled.span`
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: black;
  font-family: "Abel", sans-serif;
`;
