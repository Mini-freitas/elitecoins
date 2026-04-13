// src/components/BtContinuaCompra/BtContinuaCompra.jsx
import React, { useState } from "react";
import api from "../../services/api"; // ← usa api.js padronizado
import { BotaoContinuar } from './styles';

const BtContinuaCompra = ({ usuario, valorTotal, quantMoedas, cartaSelecionada }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
  if (!usuario) {
    alert("Você precisa estar logado para continuar a compra!");
    return;
  }

  if (!cartaSelecionada || !valorTotal || !quantMoedas) {
    alert("Selecione a plataforma e a quantidade de moedas.");
    return;
  }

  setIsLoading(true);

  try {
    console.log("📤 Enviando dados:", {
      usuarioId: usuario.id,
      plataforma: cartaSelecionada,
      quantia: valorTotal,
      quantMoedas,
    });

    const res = await api.post("/pagamento", {
      usuarioId: usuario.id,
      plataforma: cartaSelecionada,
      quantia: valorTotal,
      quantMoedas,
    });

    console.log("📥 RESPOSTA BACKEND:", res.data);

    if (res.data.init_point) {
      console.log("✅ INIT POINT:", res.data.init_point);

      // 🔥 TEMPORÁRIO (NÃO REDIRECIONA)
      // window.location.href = res.data.init_point;
    } else {
      console.error("❌ Init point não veio:", res.data);
    }

  } catch (err) {
    console.error("🔥 ERRO COMPLETO:", err);
    console.error("🔥 RESPONSE:", err.response?.data);

    alert("Erro ao criar pagamento (veja console)");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <BotaoContinuar onClick={handleClick} disabled={isLoading}>
      {isLoading ? "Processando..." : "Continuar Compra"}
    </BotaoContinuar>
  );
};

export default BtContinuaCompra;
