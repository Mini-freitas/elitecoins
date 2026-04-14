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
  // 🔥 CONTINUAR PAGAMENTO
  // =========================
  const continuarPagamento = async (id) => {
    try {
      const res = await api.get(`/pagamento/${id}`);
      window.location.href = res.data.init_point;
    } catch (err) {
      alert("Erro ao retomar pagamento");
      console.error(err);
    }
  };

  // =========================
  // QUADROS (ATUAL)
  // =========================
  const pagamentos = compras;
  const transferindo = [];
  const concluidas = [];

  // =========================
  // STATUS PAGAMENTO
  // =========================
  const statusLabelPagamento = (c) => {
    switch (c.statusPagamento) {
      case "pending":
        return { text: "Aguardando pagamento", backgroundcolor: "orange" };

      case "in_process":
        return { text: "Pagamento em análise", backgroundcolor: "blue" };

      case "approved":
        return { text: "Pagamento aprovado", backgroundcolor: "green" };

      case "rejected":
        return { text: "Pagamento rejeitado", backgroundcolor: "red" };

      case "cancelled":
        return { text: "Pagamento cancelado", backgroundcolor: "gray" };

      case "expired":
        return { text: "Pagamento expirado", backgroundcolor: "red" };

      default:
        return { text: "Desconhecido", backgroundcolor: "gray" };
    }
  };

  // =========================
  // RENDER LISTA
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
                <strong>Valor:</strong> R$ {c.quantia}
              </p>

              <p>
                <strong>Moedas:</strong> {c.moeda}
              </p>

              <p>
                <strong>Data:</strong>{" "}
                {new Date(c.createdAt).toLocaleString()}
              </p>

              {/* STATUS */}
              {tipo === "PAGAMENTO" && (
                <StatusBadge style={{ color: status.color }}>
                  {status.text}
                </StatusBadge>
              )}

              {/* 🔥 BOTÃO CONTINUAR PAGAMENTO */}
              {tipo === "PAGAMENTO" && c.statusPagamento === "pending" && (
                <>
                  <button onClick={() => continuarPagamento(c.id)}>
                    🔁 Continuar pagamento
                  </button>

                  <BotaoCancelar onClick={() => cancelarCompra(c.id)}>
                    Cancelar compra
                  </BotaoCancelar>
                </>
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
          {/* PAGAMENTOS */}
          <BoxCompras>
            <h3>Pagamentos</h3>
            {renderLista(pagamentos, "pagamentos", "PAGAMENTO")}
          </BoxCompras>

          {/* TRANSFERÊNCIA */}
          <BoxCompras>
            <h3>Transferência em andamento</h3>
            <p>Funcionalidade em breve...</p>
          </BoxCompras>

          {/* CONCLUÍDAS */}
          <BoxCompras>
            <h3>Compras concluídas</h3>
            <p>Funcionalidade em breve...</p>
          </BoxCompras>
        </GridCompras>
      </MainCompras>

      <Footer usuario={usuario} handleLogout={handleLogout} />
    </Comprassec>
  );
}

export default Compras;