import React, { useEffect, useState } from "react";
import axios from "axios";

import HeaderPrincipal from "../../../components/Header/HeaderPrincipal";
import Footer from "../../../components/Footer/Footer";

import {
  Comprassec,
  MainCompras,
  Header,
  BoxCompras,
  CompraItem,
  StatusBadge,
} from "./styles";

function Compras({ usuario, handleLogout }) {
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    if (!usuario) return;

    const buscarCompras = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/compras/${usuario.id}`
        );
        setCompras(res.data);
      } catch (err) {
        console.error("Erro ao buscar compras:", err);
      }
    };

    buscarCompras();

    const intervalo = setInterval(buscarCompras, 10000);
    return () => clearInterval(intervalo);
  }, [usuario]);

  const aguardando = compras.filter(
    (c) => c.status === "AGUARDANDO_PAGAMENTO"
  );

  const transferindo = compras.filter(
    (c) => c.status === "TRANSFERENCIA_ANDAMENTO"
  );

  const concluidas = compras.filter(
    (c) => c.status === "CONCLUIDA"
  );

  return (
    <Comprassec>
      <HeaderPrincipal usuario={usuario} handleLogout={handleLogout} />

      <MainCompras>
        <Header>
          <h2>Minhas Compras</h2>
        </Header>

        {/* ETAPA 1 - AGUARDANDO PAGAMENTO */}
        <BoxCompras>
          <h3>Aguardando pagamento</h3>
          {aguardando.length === 0 && <p></p>}
          {aguardando.map((c) => (
            <CompraItem key={c.id}>
              <p><strong>Plataforma:</strong> {c.plataforma}</p>
              <p><strong>Quantia:</strong> {c.quantia}</p>
              <StatusBadge status={c.status}>
                Aguardando pagamento
              </StatusBadge>
            </CompraItem>
          ))}
        </BoxCompras>

        {/* ETAPA 2 - TRANSFERÊNCIA */}
        <BoxCompras>
          <h3>Transferência em andamento</h3>
          {transferindo.length === 0 && <p></p>}
          {transferindo.map((c) => (
            <CompraItem key={c.id}>
              <p><strong>Plataforma:</strong> {c.plataforma}</p>
              <p><strong>Quantia:</strong> {c.quantia}</p>
              <StatusBadge status={c.status}>
                Transferência em andamento
              </StatusBadge>
            </CompraItem>
          ))}
        </BoxCompras>

        {/* ETAPA 3 - CONCLUÍDA */}
        <BoxCompras>
          <h3>Compras concluídas</h3>
          {concluidas.length === 0 && <p></p>}
          {concluidas.map((c) => (
            <CompraItem key={c.id}>
              <p><strong>Plataforma:</strong> {c.plataforma}</p>
              <p><strong>Quantia:</strong> {c.quantia}</p>
              <p>
                <strong>Data:</strong>{" "}
                {c.concluidoEm
                  ? new Date(c.concluidoEm).toLocaleString()
                  : "-"}
              </p>
            </CompraItem>
          ))}
        </BoxCompras>
      </MainCompras>

      <Footer usuario={usuario} handleLogout={handleLogout} />
    </Comprassec>
  );
}

export default Compras;
