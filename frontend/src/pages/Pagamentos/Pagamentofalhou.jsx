import { useLocation } from "react-router-dom";

function PagamentoFalhou() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const collectionId = queryParams.get("collection_id");
  const status = queryParams.get("status");
  const paymentId = queryParams.get("payment_id");

  console.log("Pagamento Falhou - Query Params:", {
    collectionId,
    paymentId,
    status,
  });

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Pagamento Falhou ❌</h1>
      <p>Houve um problema ao processar seu pagamento.</p>
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

export default PagamentoFalhou;
