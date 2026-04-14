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

  const statusLabel = (status) => {
    switch (status) {
      case "pending":
        return "Aguardando pagamento";
      case "in_process":
        return "Pagamento em análise";
      case "approved":
        return "Pagamento aprovado";
      case "rejected":
        return "Pagamento rejeitado";
      case "cancelled":
        return "Pagamento cancelado";
      case "expired":
        return "Pagamento expirado";
      default:
        return "Desconhecido";
    }
  };

  const limite = 5;
  const lista = verTudo ? compras : compras.slice(0, limite);

  return (
    <Comprassec>
      <HeaderPrincipal usuario={usuario} handleLogout={handleLogout} />

      <MainCompras>
        <Header>
          <h2>Minhas Compras</h2>
        </Header>

        <GridCompras>
          <BoxCompras>
            <h3>Pagamentos</h3>

            <ListaScroll>
              {lista.length === 0 && <p>Nenhuma compra encontrada.</p>}

              {lista.map((c) => (
                <CompraItem key={c.id}>
                  <p><strong>Plataforma:</strong> {c.plataforma}</p>
                  <p>
                    <strong>Valor:</strong>{" "}
                    {Number(c.quantia).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <p><strong>Moedas:</strong> {c.moeda}</p>

                  <p>
                    <strong>Data:</strong>{" "}
                    {new Date(c.createdAt).toLocaleString()}
                  </p>

                  <StatusBadge status={c.statusPagamento}>
                    {statusLabel(c.statusPagamento)}
                  </StatusBadge>

                  {c.statusPagamento === "pending" && (
                    <>
                      <BotaoContinuar onClick={() => continuarPagamento(c.id)}>
                        🔁 Continuar pagamento
                      </BotaoContinuar>

                      <BotaoCancelar onClick={() => cancelarCompra(c.id)}>
                        Cancelar compra
                      </BotaoCancelar>
                    </>
                  )}
                </CompraItem>
              ))}
            </ListaScroll>

            {compras.length > limite && (
              <VerMais onClick={() => setVerTudo(!verTudo)}>
                {verTudo ? "Mostrar menos" : "Ver todas"}
              </VerMais>
            )}
          </BoxCompras>

          <BoxCompras>
            <h3>Transferência</h3>
            <p>Em breve...</p>
          </BoxCompras>

          <BoxCompras>
            <h3>Concluídas</h3>
            <p>Em breve...</p>
          </BoxCompras>
        </GridCompras>
      </MainCompras>

      <Footer usuario={usuario} handleLogout={handleLogout} />
    </Comprassec>
  );
}

export default Compras;