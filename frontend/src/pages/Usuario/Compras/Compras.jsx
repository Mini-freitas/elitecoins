import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const [compras, setCompras] = useState([]);
  const [verTudo, setVerTudo] = useState({
    pagamentos: false,
    transferindo: false,
    concluidas: false,
  });

  // =========================
  // PROTEÇÃO LOGIN
  // =========================
  useEffect(() => {
    if (!usuario) navigate("/login");
  }, [usuario, navigate]);

  // =========================
  // BUSCAR COMPRAS
  // =========================
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

  // =========================
  // CANCELAR COMPRA
  // =========================
  const cancelarCompra = async (id) => {
    if (!window.confirm("Deseja cancelar esta compra?")) return;

    try {
      await api.post(`/compras/${id}/cancelar`);
      buscarCompras();
    } catch (err) {
      alert("Não foi possível cancelar a compra");
      console.error(err);
    }
  };

  // =========================
  // QUADROS
  // =========================

  // 🔥 NOVO MODELO: tudo que NÃO foi concluído ainda entra aqui
  const pagamentos = compras.filter((c) => !c.concluidoEm);

  const transferindo = compras.filter(
    (c) => c.statusPagamento === "approved" && !c.concluidoEm
  );

  const concluidas = compras.filter((c) => c.concluidoEm);

  // =========================
  // STATUS VISUAL DINÂMICO
  // =========================
  const statusLabelPagamento = (c) => {
    switch (c.statusPagamento) {
      case "pending":
        return { text: "Aguardando pagamento", color: "orange" };

      case "in_process":
        return { text: "Pagamento em análise", color: "blue" };

      case "approved":
        return { text: "Pagamento aprovado", color: "green" };

      case "rejected":
        return { text: "Pagamento rejeitado", color: "red" };

      case "cancelled":
        return { text: "Pagamento cancelado", color: "gray" };

      case "expired":
        return { text: "Pagamento expirado", color: "red" };

      default:
        return { text: "Desconhecido", color: "gray" };
    }
  };

  // =========================
  // RENDER LISTA GENÉRICA
  // =========================
  const renderLista = (lista, chaveEstado, tipo) => {
    const limite = 5;
    const mostrarTudo = verTudo[chaveEstado];
    const itens = mostrarTudo ? lista : lista.slice(0, limite);

    if (lista.length === 0) {
      return <p>Nenhuma compra nesta etapa.</p>;
    }

    return (
      <>
        {itens.map((c) => {
          const status = statusLabelPagamento(c);

          return (
            <CompraItem key={c.id}>
              <p>
                <strong>Plataforma:</strong> {c.plataforma}
              </p>

              <p>
                <strong>Quantia:</strong> R$ {c.quantia}
              </p>

              {/* STATUS DINÂMICO */}
              {tipo === "PAGAMENTO" && (
                <StatusBadge style={{ color: status.color }}>
                  {status.text}
                </StatusBadge>
              )}

              {/* BOTÃO CANCELAR SÓ NO PAGAMENTO */}
              {tipo === "PAGAMENTO" && c.statusPagamento === "pending" && (
                <BotaoCancelar onClick={() => cancelarCompra(c.id)}>
                  Cancelar compra
                </BotaoCancelar>
              )}

              {/* DATA FINAL */}
              {tipo === "CONCLUIDA" && (
                <p>
                  <strong>Data:</strong>{" "}
                  {c.concluidoEm
                    ? new Date(c.concluidoEm).toLocaleString()
                    : "-"}
                </p>
              )}
            </CompraItem>
          );
        })}

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

  // =========================
  // UI
  // =========================
  return (
    <Comprassec>
      <HeaderPrincipal usuario={usuario} handleLogout={handleLogout} />

      <MainCompras>
        <Header>
          <h2>Minhas Compras</h2>
        </Header>

        <GridCompras>
          {/* =========================
              1. PAGAMENTOS (ÚNICO QUADRO)
          ========================= */}
          <BoxCompras>
            <h3>Pagamentos</h3>
            {renderLista(pagamentos, "pagamentos", "PAGAMENTO")}
          </BoxCompras>

          {/* =========================
              2. TRANSFERÊNCIA
          ========================= */}
          <BoxCompras>
            <h3>Transferência em andamento</h3>
            {renderLista(transferindo, "transferindo", "TRANSFERINDO")}
          </BoxCompras>

          {/* =========================
              3. CONCLUÍDAS
          ========================= */}
          <BoxCompras>
            <h3>Compras concluídas</h3>
            {renderLista(concluidas, "concluidas", "CONCLUIDA")}
          </BoxCompras>
        </GridCompras>
      </MainCompras>

      <Footer usuario={usuario} handleLogout={handleLogout} />
    </Comprassec>
  );
}

export default Compras;