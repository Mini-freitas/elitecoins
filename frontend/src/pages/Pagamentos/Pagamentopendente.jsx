import { useLocation } from "react-router-dom";

function PagamentoPendente() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const collectionId = queryParams.get("collection_id");
  const collectionStatus = queryParams.get("collection_status");
  const paymentId = queryParams.get("payment_id");
  const status = queryParams.get("status");

  console.log("Pagamento Pendente - Query Params:", {
    collectionId,
    collectionStatus,
    paymentId,
    status,
  });

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Pagamento Pendente ⏳</h1>
      <p>Seu pagamento ainda está sendo processado.</p>
      <p>Status: {status}</p>
      <p>ID do pagamento: {paymentId}</p>
      <button
        onClick={() => (window.location.href = "/")}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        Voltar ao site
      </button>
    </div>
  );
}

export default PagamentoPendente;
