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

  useEffect(() => {
    if (!usuario) navigate("/login");
  }, [usuario]);

  const buscarCompras = useCallback(async () => {
    if (!usuario?.id) return;

    const res = await api.get(`/compras/${usuario.id}`);

    setCompras(res.data); // já vem ordenado do backend
  }, [usuario]);

  useEffect(() => {
    buscarCompras();
    const interval = setInterval(buscarCompras, 5000);
    return () => clearInterval(interval);
  }, [buscarCompras]);

  // =========================
  // FILTROS CORRETOS
  // =========================
  const pendentes = compras.filter(
    (c) =>
      c.statusPagamento === "pending" ||
      c.statusPagamento === "in_process"
  );

  const aprovadas = compras.filter(
    (c) => c.statusPagamento === "approved"
  );

  const processandoFifa = compras.filter(
    (c) => c.statusApiFifa === "processando"
  );

  const concluidas = compras.filter(
    (c) => c.statusApiFifa === "concluido"
  );

  const render = (lista) => {
    if (!lista.length) return <p>Nenhuma compra</p>;

    return lista.map((c) => (
      <div key={c.id}>
        <p>{c.plataforma}</p>
        <p>R$ {c.quantia}</p>

        <span>
          {c.statusPagamento === "pending" && "Pendente"}
          {c.statusPagamento === "in_process" && "Processando pagamento"}
          {c.statusPagamento === "approved" && "Pago"}
        </span>

        <hr />
      </div>
    ));
  };

  return (
    <Comprassec>
      <HeaderPrincipal usuario={usuario} handleLogout={handleLogout} />

      <MainCompras>
        <h2>Compras</h2>

        <BoxCompras>
          <h3>Pagamentos</h3>
          {render(pendentes)}
        </BoxCompras>

        <BoxCompras>
          <h3>Aprovadas</h3>
          {render(aprovadas)}
        </BoxCompras>

        <BoxCompras>
          <h3>API FIFA processando</h3>
          {render(processandoFifa)}
        </BoxCompras>

        <BoxCompras>
          <h3>Concluídas</h3>
          {render(concluidas)}
        </BoxCompras>
      </MainCompras>

      <Footer usuario={usuario} handleLogout={handleLogout} />
    </Comprassec>
  );
}

export default Compras;