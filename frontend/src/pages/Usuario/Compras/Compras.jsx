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
  BotaoContinuar,
  GridCompras,
  VerMais,
  ListaScroll,
} from "./styles";

function Compras({ usuario, handleLogout }) {

  // ===============================
  // SCROLL TO TOP (FALTAVA ISSO)
  // ===============================
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navigate = useNavigate();

  const [compras, setCompras] = useState([]);
  const [verTudo, setVerTudo] = useState(false);

  useEffect(() => {
    if (!usuario) navigate("/login");
  }, [usuario, navigate]);

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
      await api.post(`/compras/${id}/cancelar`);
      buscarCompras();
    } catch (err) {
      alert("Erro ao cancelar compra");
    }
  };

  const continuarPagamento = async (id) => {
    try {
      const res = await api.get(`/pagamento/${id}`);
      window.location.href = res.data.init_point;
    } catch (err) {
      alert("Erro ao retomar pagamento");
    }
  };

  const statusPagamentoLabel = (status) => {
    switch (status) {
      case "pending":
        return "Aguardando pagamento";
      case "approved":
        return "Pagamento aprovado";
      case "rejected":
        return "Pagamento rejeitado";
      case "cancelled":
        return "Cancelado";
      default:
        return "Desconhecido";
    }
  };

  const statusFifaLabel = (status) => {
    switch (status) {
      case "aguardando":
        return "Aguardando envio";
      case "processando":
        return "Transferindo moedas...";
      case "concluido":
        return "Concluído";
      case "erro":
        return "Erro na entrega";
      default:
        return "Desconhecido";
    }
  };

  // 🔥 DIVISÃO DOS BLOCOS
  const pagamentos = compras;

  const transferencias = compras.filter(
    (c) =>
      c.statusPagamento === "approved" &&
      c.statusApiFifa !== "concluido"
  );

  const concluidas = compras.filter(
    (c) =>
      c.statusPagamento === "approved" &&
      c.statusApiFifa === "concluido"
  );

  const limite = 5;
  const lista = verTudo ? pagamentos : pagamentos.slice(0, limite);

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

            <ListaScroll>
              {lista.length === 0 && <p>Nenhuma compra encontrada.</p>}

              {lista.map((c) => (
                <CompraItem key={c.id}>
                  <p><strong>Plataforma:</strong> {c.plataforma}</p>
                  <p><strong>Valor:</strong> R$ {c.quantia}</p>
                  <p><strong>Moedas:</strong> {c.moeda}</p>

                  <StatusBadge status={c.statusPagamento}>
                    {statusPagamentoLabel(c.statusPagamento)}
                  </StatusBadge>

                  {c.statusPagamento === "pending" && (
                    <>
                      <BotaoContinuar onClick={() => continuarPagamento(c.id)}>
                        Continuar pagamento
                      </BotaoContinuar>

                      <BotaoCancelar onClick={() => cancelarCompra(c.id)}>
                        Cancelar
                      </BotaoCancelar>
                    </>
                  )}
                </CompraItem>
              ))}
            </ListaScroll>

            {pagamentos.length > limite && (
              <VerMais onClick={() => setVerTudo(!verTudo)}>
                {verTudo ? "Mostrar menos" : "Ver todas"}
              </VerMais>
            )}
          </BoxCompras>

          {/* TRANSFERÊNCIA */}
          <BoxCompras>
            <h3>Transferência</h3>

            <ListaScroll>
              {transferencias.length === 0 && (
                <p>Nenhuma transferência em andamento.</p>
              )}

              {transferencias.map((c) => (
                <CompraItem key={c.id}>
                  <p><strong>Plataforma:</strong> {c.plataforma}</p>
                  <p><strong>Moedas:</strong> {c.moeda}</p>

                  <StatusBadge status={c.statusApiFifa}>
                    {statusFifaLabel(c.statusApiFifa)}
                  </StatusBadge>
                </CompraItem>
              ))}
            </ListaScroll>
          </BoxCompras>

          {/* CONCLUÍDAS */}
          <BoxCompras>
            <h3>Concluídas</h3>

            <ListaScroll>
              {concluidas.length === 0 && (
                <p>Nenhuma compra concluída.</p>
              )}

              {concluidas.map((c) => (
                <CompraItem key={c.id}>
                  <p><strong>Cliente:</strong> {usuario.nome}</p>
                  <p><strong>Plataforma:</strong> {c.plataforma}</p>
                  <p><strong>Valor:</strong> R$ {c.quantia}</p>
                  <p><strong>Moedas:</strong> {c.moeda}</p>

                  <p>
                    <strong>Finalizado:</strong>{" "}
                    {c.concluidoEm
                      ? new Date(c.concluidoEm).toLocaleString()
                      : "-"}
                  </p>

                  <StatusBadge status="concluido">
                    Entregue
                  </StatusBadge>
                </CompraItem>
              ))}
            </ListaScroll>
          </BoxCompras>

        </GridCompras>
      </MainCompras>

      <Footer usuario={usuario} handleLogout={handleLogout} scrollToTop={scrollToTop} />
    </Comprassec>
  );
}

export default Compras;