// BtContinuaCompra.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { BotaoContinuar } from "./styles";

const BtContinuaCompra = ({ usuario, valorTotal, quantMoedas, cartaSelecionada }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!usuario) {
      alert("Você precisa estar logado!");
      navigate("/login");
      return;
    }

    if (!cartaSelecionada || !valorTotal || !quantMoedas) {
      alert("Selecione a plataforma e a quantidade.");
      return;
    }

    // 🔥 ENVIA DADOS PARA A PÁGINA DE COMPRA
    navigate("/compra", {
      state: {
        valorTotal,
        quantMoedas,
        plataforma: cartaSelecionada,
      },
    });
  };

  return (
    <BotaoContinuar onClick={handleClick}>
      Continuar Compra
    </BotaoContinuar>
  );
};

export default BtContinuaCompra;