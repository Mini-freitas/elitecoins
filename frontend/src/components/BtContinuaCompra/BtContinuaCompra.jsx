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
    const res = await api.post("/pagamento", {
      usuarioId: usuario.id,
      plataforma: cartaSelecionada,
      quantia: valorTotal,
      quantMoedas,
    });

    if (res.data.init_point) {
      window.location.href = res.data.init_point;
    } else {
      console.error("Init point não recebido:", res.data);
    }
  } catch (err) {
    console.error("Erro ao criar preferência:", err);
    alert("O método automático está em manutenção.");
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
