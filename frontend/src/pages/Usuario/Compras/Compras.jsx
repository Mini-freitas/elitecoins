import React, { useEffect, useState, useCallback } from "react";
import api from "../../../services/api";

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

  const buscarCompras = useCallback(async () => {
    if (!usuario?.id) return;

    try {
      const res = await api.get(`/compras/${usuario.id}`);
      setCompras(res.data);
    } catch (err) {
      console.error("Erro ao buscar compras:", err);
    }
  }, [usuario]);

  useEffect(() => {
    if (!usuario) return;

    buscarCompras();
    const intervalo = setInterval(buscarCompras, 5000);
    return () => clearInterval(intervalo);
  }, [usuario, buscarCompras]);

  const cancelarCompra = async (id) => {
    if (!window.confirm("Deseja cancelar esta compra?")) return;

    try {
      // REMOVIDO o /api daqui
      await api.post(`/compras/${id}/cancelar`);
      buscarCompras();
    } catch (err) {
      alert("Não foi possível cancelar a compra");
      console.error(err);
    }
  };

  // FILTROS DE STATUS
  const aguardando = compras.filter(
    (c) => c.status === "pending" || c.status === "in_process"
  );

  const transferindo = compras.filter(
    (c) => c.status === "approved" && !c.concluidoEm
  );

  const concluidas = compras.filter(
    (c) => c.concluidoEm
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
                {c.status === "pending" && "Aguardando pagamento"}
                {c.status === "in_process" && "Pagamento em análise"}
                {c.status === "approved" && "Pagamento aprovado"}
                {c.status === "expired" && "Pagamento expirado"}
                {c.status === "cancelled" && "Compra cancelada"}
              </StatusBadge>
            )}

            {tipo === "AGUARDANDO" &&
              (c.status === "pending" || c.status === "in_process") && (
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
          <BoxCompras>
            <h3>Aguardando pagamento</h3>
            {renderLista(aguardando, "AGUARDANDO", "aguardando")}
          </BoxCompras>

          <BoxCompras>
            <h3>Transferência em andamento</h3>
            {renderLista(transferindo, "TRANSFERINDO", "transferindo")}
          </BoxCompras>

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
