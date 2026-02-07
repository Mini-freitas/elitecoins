import { useLocation } from "react-router-dom";

function PagamentoAprovado() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Parâmetros enviados pelo Mercado Pago
  const collectionId = queryParams.get("collection_id");
  const collectionStatus = queryParams.get("collection_status");
  const paymentId = queryParams.get("payment_id");
  const status = queryParams.get("status");
  const paymentType = queryParams.get("payment_type");
  const merchantOrderId = queryParams.get("merchant_order_id");

  console.log("Pagamento Aprovado - Query Params:", {
    collectionId,
    collectionStatus,
    paymentId,
    status,
    paymentType,
    merchantOrderId,
  });

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Pagamento Aprovado ✅</h1>
      <p>Obrigado pela sua compra!</p>
      <p>Status: {status}</p>
      <p>ID do pagamento: {paymentId}</p>
      <p>Tipo de pagamento: {paymentType}</p>
      <p>ID da ordem do vendedor: {merchantOrderId}</p>
      <button
        onClick={() => (window.location.href = "/")}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        Voltar ao site
      </button>
    </div>
  );
}

export default PagamentoAprovado;
