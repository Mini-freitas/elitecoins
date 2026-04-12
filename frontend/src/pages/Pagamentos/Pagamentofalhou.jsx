import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import MyGlobalStyle from '../../styles/globalStyles';
import HeaderPrincipal from '../../components/Header/HeaderPrincipal';
import Footer from '../../components/Footer/Footer';

function PagamentoFalhou({ usuario, handleLogout }) {
  const location = useLocation();
  const [usuarioLocal, setUsuarioLocal] = useState(usuario);

  const queryParams = new URLSearchParams(location.search);

  const collectionId = queryParams.get("collection_id");
  const status = queryParams.get("status");
  const paymentId = queryParams.get("payment_id");

  useEffect(() => {
    const userSalvo = localStorage.getItem("usuario");

    if (!userSalvo) {
      window.location.href = "/login";
      return;
    }

    setUsuarioLocal(JSON.parse(userSalvo));
  }, []);

  console.log("Pagamento Falhou:", {
    collectionId,
    paymentId,
    status,
  });

  return (
    <>
      <MyGlobalStyle />
      <HeaderPrincipal usuario={usuarioLocal} handleLogout={handleLogout} />

      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>Pagamento Falhou ❌</h1>
        <p>Houve um erro ao processar o pagamento</p>
        <p>Status: {status}</p>
        <p>ID: {paymentId}</p>

        <button
          onClick={() => (window.location.href = "/")}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Voltar ao site
        </button>
      </div>

      <Footer usuario={usuarioLocal} handleLogout={handleLogout} />
    </>
  );
}

export default PagamentoFalhou;