import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import MyGlobalStyle from '../../styles/globalStyles';
import HeaderPrincipal from '../../components/Header/HeaderPrincipal';
import Footer from '../../components/Footer/Footer';

function PagamentoPendente({ usuario, handleLogout }) {
  const location = useLocation();
  const [usuarioLocal, setUsuarioLocal] = useState(usuario);

  const queryParams = new URLSearchParams(location.search);

  const collectionId = queryParams.get("collection_id");
  const collectionStatus = queryParams.get("collection_status");
  const paymentId = queryParams.get("payment_id");
  const status = queryParams.get("status");

  useEffect(() => {
    const userSalvo = localStorage.getItem("usuario");

    if (!userSalvo) {
      window.location.href = "/login";
      return;
    }

    setUsuarioLocal(JSON.parse(userSalvo));
  }, []);

  console.log("Pagamento Pendente:", {
    collectionId,
    collectionStatus,
    paymentId,
    status,
  });

  return (
    <>
      <MyGlobalStyle />
      <HeaderPrincipal usuario={usuarioLocal} handleLogout={handleLogout} />

      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>Pagamento Pendente ⏳</h1>
        <p>Seu pagamento está sendo processado</p>
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

export default PagamentoPendente;