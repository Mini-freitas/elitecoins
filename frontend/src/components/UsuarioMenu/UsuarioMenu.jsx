import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

import {
  SvgUsuario,
  BoxMenuUsuario,
  BtLogout,
  NomeUsuario,
  Avatar,
  AvatarBox,
  MenuItem,
  MenuLista,
  Divider,
  TopoUsuario,
} from "./styles";

function UsuarioMenu({
  usuario,
  handleLogout,
  menuAberto,
  setMenuAberto,
  fecharMenuNotificacao
}) {
  const navigate = useNavigate();
  const menuRef = useRef();

  const handleToggleMenu = () => {
    fecharMenuNotificacao();
    setMenuAberto(!menuAberto);
  };

  const iniciais = usuario?.nome
    ?.split(" ")
    .slice(0, 2)
    .map(n => n[0].toUpperCase())
    .join("");

  const irPara = (rota) => {
    setMenuAberto(false);
    navigate(rota);
  };

  // fechar ao clicar fora
  useEffect(() => {
    const handleClickFora = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuAberto(false);
      }
    };

    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, [setMenuAberto]);

  return (
    <div style={{ position: "relative" }} ref={menuRef}>
      <SvgUsuario onClick={handleToggleMenu}>
        {usuario?.avatar ? (
          <AvatarBox>
            <Avatar src={usuario.avatar} alt="Avatar" />
          </AvatarBox>
        ) : (
          <AvatarBox>
            <span>{iniciais || "U"}</span>
          </AvatarBox>
        )}
      </SvgUsuario>

      {menuAberto && (
        <BoxMenuUsuario>
          <TopoUsuario>
            {usuario?.avatar ? (
              <Avatar src={usuario.avatar} alt="Avatar" />
            ) : (
              <AvatarBox style={{ width: "3rem", height: "3rem" }}>
                <span>{iniciais || "U"}</span>
              </AvatarBox>
            )}
            <NomeUsuario>{usuario?.nome}</NomeUsuario>
          </TopoUsuario>

          <Divider />

          <MenuLista>
            <MenuItem onClick={() => irPara("/usuario/perfil")}>
              Perfil
            </MenuItem>

            <MenuItem onClick={() => irPara("/usuario/seguranca")}>
              Segurança
            </MenuItem>

            <MenuItem onClick={() => irPara("/usuario/compras")}>
              Compras
            </MenuItem>

            <MenuItem onClick={() => irPara("/usuario/excluir")}>
              Excluir conta
            </MenuItem>
          </MenuLista>

          <Divider />

          <BtLogout onClick={handleLogout}>
            Sair da conta
          </BtLogout>
        </BoxMenuUsuario>
      )}
    </div>
  );
}

export default UsuarioMenu;
