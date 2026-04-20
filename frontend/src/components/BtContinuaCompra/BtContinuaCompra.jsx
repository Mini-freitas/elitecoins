import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { BotaoContinuar } from "./styles";
import { useNavigate } from "react-router-dom";

const BtContinuaCompra = ({ usuario, valorTotal, quantMoedas, cartaSelecionada }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [credenciais, setCredenciais] = useState([]);

  const navigate = useNavigate();

  // 🔥 buscar credenciais do usuário
  useEffect(() => {
    if (usuario?.id) {
      api.get(`/credenciais/${usuario.id}`)
        .then(res => setCredenciais(res.data))
        .catch(err => console.error(err));
    }
  }, [usuario]);

  const handleClick = async () => {
    // 🔒 NÃO LOGADO
    if (!usuario) {
      alert("Você precisa estar logado para continuar.");
      navigate("/login");
      return;
    }

    // 🔒 SEM DADOS DE COMPRA
    if (!cartaSelecionada || !valorTotal || !quantMoedas) {
      alert("Selecione a plataforma e a quantidade.");
      return;
    }

    // 🔥 SEM CREDENCIAL
    if (credenciais.length === 0) {
      alert("Você não completou seu perfil. Adicione suas credenciais para continuar.");
      navigate("/perfil");
      return;
    }

    setIsLoading(true);

    try {
      const valorFormatado = Number(valorTotal.toFixed(2));

      const res = await api.post("/pagamento", {
        usuarioId: usuario.id,
        plataforma: cartaSelecionada,
        quantia: valorFormatado,
        quantMoedas,
      });

      if (res.data.init_point) {
        window.location.href = res.data.init_point;
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao iniciar pagamento.");
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