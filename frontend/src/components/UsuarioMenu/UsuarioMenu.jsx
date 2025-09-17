// UsuarioMenu.jsx
import { useState } from "react";
import { SvgUsuario, BoxMenuUsuario, BtLogout, NomeUsuario } from "./styles";

function UsuarioMenu({ usuario, handleLogout }) {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      {/* Botão do usuário */}
      <SvgUsuario onClick={() => setMenuAberto(!menuAberto)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
        </svg>
      </SvgUsuario>

      {menuAberto && (
        <BoxMenuUsuario>
          <NomeUsuario>{usuario.nome}</NomeUsuario>
          <BtLogout onClick={handleLogout}>
            Sair
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" >
              <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
              <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
            </svg>
          </BtLogout>
        </BoxMenuUsuario>
      )}
    </div>
  );
}

export default UsuarioMenu;
