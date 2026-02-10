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
  BotaoCancelar,
  GridCompras,
  VerMais,
} from "./styles";

function Compras({ usuario, handleLogout }) {
  const [compras, setCompras] = useState([]);
  const [verTudo, setVerTudo] = useState({
    aguardando: false,
    transferindo: false,
    concluidas: false,
  });

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

    const intervalo = setInterval(buscarCompras, 5000);
    return () => clearInterval(intervalo);
  }, [usuario]);

  const cancelarCompra = async (id) => {
    if (!window.confirm("Deseja cancelar esta compra?")) return;

    try {
      await axios.post(`http://localhost:3000/api/compras/${id}/cancelar`);
      setCompras((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, status: "EXPIRADA" } : c
        )
      );
    } catch (err) {
      alert("Não foi possível cancelar a compra");
      console.error(err);
    }
  };

  const aguardando = compras.filter(
    (c) => c.status === "AGUARDANDO_PAGAMENTO"
  );

  const transferindo = compras.filter(
    (c) => c.status === "TRANSFERENCIA_ANDAMENTO"
  );

  const concluidas = compras.filter(
    (c) => c.status === "CONCLUIDA"
  );

  const renderLista = (lista, tipo, chaveEstado) => {
    const limite = 5;
    const mostrarTudo = verTudo[chaveEstado];
    const itens = mostrarTudo ? lista : lista.slice(0, limite);

    if (lista.length === 0) {
      return <p>Nenhuma compra nesta etapa.</p>;
    }

    return (
      <>
        {itens.map((c) => (
          <CompraItem key={c.id}>
            <p><strong>Plataforma:</strong> {c.plataforma}</p>
            <p><strong>Quantia:</strong> R$ {c.quantia}</p>

            {tipo !== "CONCLUIDA" && (
              <StatusBadge status={c.status}>
                {c.status === "AGUARDANDO_PAGAMENTO" && "Aguardando pagamento"}
                {c.status === "TRANSFERENCIA_ANDAMENTO" && "Transferência em andamento"}
              </StatusBadge>
            )}

            {tipo === "AGUARDANDO_PAGAMENTO" && (
              <BotaoCancelar onClick={() => cancelarCompra(c.id)}>
                Cancelar compra
              </BotaoCancelar>
            )}

            {tipo === "CONCLUIDA" && (
              <p>
                <strong>Data:</strong>{" "}
                {c.concluidoEm
                  ? new Date(c.concluidoEm).toLocaleString()
                  : "-"}
              </p>
            )}
          </CompraItem>
        ))}

        {lista.length > limite && (
          <VerMais
            onClick={() =>
              setVerTudo((prev) => ({
                ...prev,
                [chaveEstado]: !prev[chaveEstado],
              }))
            }
          >
            {mostrarTudo ? "Mostrar menos" : "Ver todas as compras"}
          </VerMais>
        )}
      </>
    );
  };

  return (
    <Comprassec>
      <HeaderPrincipal usuario={usuario} handleLogout={handleLogout} />

      <MainCompras>
        <Header>
          <h2>Minhas Compras</h2>
        </Header>

        <GridCompras>
          {/* AGUARDANDO PAGAMENTO */}
          <BoxCompras>
            <h3>Aguardando pagamento</h3>
            {renderLista(aguardando, "AGUARDANDO_PAGAMENTO", "aguardando")}
          </BoxCompras>

          {/* TRANSFERÊNCIA */}
          <BoxCompras>
            <h3>Transferência em andamento</h3>
            {renderLista(transferindo, "TRANSFERENCIA_ANDAMENTO", "transferindo")}
          </BoxCompras>

          {/* CONCLUÍDAS */}
          <BoxCompras>
            <h3>Compras concluídas</h3>
            {renderLista(concluidas, "CONCLUIDA", "concluidas")}
          </BoxCompras>
        </GridCompras>
      </MainCompras>

      <Footer usuario={usuario} handleLogout={handleLogout} />
    </Comprassec>
  );
}

export default Compras;
