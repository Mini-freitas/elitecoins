import { useNavigate } from "react-router-dom";
import {
  SvgUsuario,
  BoxMenuUsuario,
  BtLogout,
  NomeUsuario,
  Avatar,
  AvatarBox
} from "./styles";

function UsuarioMenu({
  usuario,
  handleLogout,
  menuAberto,
  setMenuAberto,
  fecharMenuNotificacao
}) {
  const navigate = useNavigate(); // Hook do react-router-dom

  const handleToggleMenu = () => {
    fecharMenuNotificacao();
    setMenuAberto(!menuAberto);
  };

  const iniciais = usuario?.nome
    ?.split(" ")
    .slice(0, 2)
    .map(n => n[0].toUpperCase())
    .join("");

  // Função para navegar e fechar menu
  const irPara = (rota) => {
    setMenuAberto(false);
    navigate(rota);
  };

  return (
    <div style={{ position: "relative" }}>
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
          <NomeUsuario>{usuario?.nome}</NomeUsuario>

          {/* Itens do menu */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "1rem", marginTop: "2rem" }}>
            <button onClick={() => irPara("/usuario/perfil")}>Perfil</button>
            <button onClick={() => irPara("/usuario/seguranca")}>Segurança</button>
            <button onClick={() => irPara("/usuario/compras")}>Compras</button>
            <button onClick={() => irPara("/usuario/excluir")}>Excluir Conta</button>
          </div>

          <BtLogout onClick={handleLogout}>Sair</BtLogout>
        </BoxMenuUsuario>
      )}
    </div>
  );
}

export default UsuarioMenu;
