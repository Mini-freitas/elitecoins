import { useEffect, useState } from "react";

function OrderStatus({ orderID }) {
  const [status, setStatus] = useState("Carregando...");

  useEffect(() => {
    if (!orderID) return;

    let isMounted = true;

    const fetchStatus = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/order/status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderID }),
        });

        const data = await res.json();
        if (isMounted) {
          setStatus(data.status || "Status não disponível");
        }
      } catch (error) {
        if (isMounted) setStatus("Erro ao consultar o status");
        console.error("Erro ao buscar status:", error);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [orderID]);

  const renderStatusMessage = () => {
    switch (status) {
      case "entered":
        return "Pedido registrado, aguardando processamento...";
      case "processing":
        return "Seu pedido está sendo processado...";
      case "completed":
        return "✅ Pedido concluído com sucesso!";
      case "failed":
        return "❌ O pedido falhou. Entre em contato com o suporte.";
      case "Carregando...":
        return "Carregando status...";
      case "Erro ao consultar o status":
        return "⚠️ Não foi possível consultar o status.";
      default:
        return `Status: ${status}`;
    }
  };

  return <div>{renderStatusMessage()}</div>;
}

export default OrderStatus;
