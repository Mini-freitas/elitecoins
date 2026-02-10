import styled from "styled-components";

export const SvgUsuario = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BoxMenuUsuario = styled.div`
  position: absolute;
  top: 3.5rem;
  right: 0;
  z-index: 1000;

  width: 16rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  overflow: hidden;

  display: flex;
  flex-direction: column;

  animation: fadeIn 0.15s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Mobile */
  @media (max-width: 480px) {
    right: -1rem;
    width: 14rem;
  }
`;

export const TopoUsuario = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const NomeUsuario = styled.span`
  font-weight: 600;
  font-size: 0.95rem;
  color: #222;
`;

export const MenuLista = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MenuItem = styled.button`
  background: transparent;
  border: none;
  padding: 0.8rem 1rem;
  text-align: left;
  cursor: pointer;
  font-size: 0.9rem;
  color: #333;

  transition: background 0.15s ease;

  &:hover {
    background: #f5f5f5;
  }
`;

export const Divider = styled.div`
  height: 1px;
  background: #eee;
  margin: 0.25rem 0;
`;

export const BtLogout = styled.button`
  background: #ff4d4f;
  color: white;
  border: none;
  margin: 0.75rem;
  padding: 0.6rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;

  transition: background 0.2s;

  &:hover {
    background: #d9363e;
  }
`;

export const AvatarBox = styled.div`
  width: 2.2rem;
  height: 2.2rem;
  background: #f1f3f4;
  color: #222;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
`;

export const Avatar = styled.img`
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  object-fit: cover;
`;
