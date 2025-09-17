import React, { useState } from "react";
import axios from "axios";
import { BotaoContinuar} from './styles';

const BtContinuaCompra = ({ usuario, valorTotal, quantMoedas, cartaSelecionada }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!usuario) {
      alert("Você precisa estar logado para continuar a compra!");
      return;
    }

    setIsLoading(true);

    try {
      // Envia os dados ao backend para criar a preferência
      const res = await axios.post("http://localhost:3000/pagamento", {
        usuario: usuario.nome,
        carta: cartaSelecionada,
        valorTotal,
        quantMoedas,
      });

      if (res.data.init_point) {
        window.location.href = res.data.init_point;
      } else {
        console.error("Init point não recebido:", res.data);
      }
    } catch (err) {
      console.error("Erro ao criar preferência:", err);
      alert("Erro ao processar pagamento, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BotaoContinuar onClick={handleClick} disabled={isLoading} >
      {isLoading ? "Processando..." : "Continuar Compra"}
    </BotaoContinuar>
  );
};

export default BtContinuaCompra;
