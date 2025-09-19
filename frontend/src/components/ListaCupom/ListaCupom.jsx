// src/components/ListaCupom/ListaCupom.jsx
import { useState, useEffect } from "react";
import api from "../../services/api"; // ← usa o api.js padronizado
import "./style.css";

function ListaCupom({ novoCupom }) {
  const [cupons, setCupons] = useState([]);

  // Função utilitária para extrair o id de um cupom (trata _id, id, _id.$oid)
  const extractId = (cupom) => {
    if (!cupom) return null;
    if (typeof cupom.id === "string" && cupom.id.trim() !== "") return cupom.id;
    if (typeof cupom._id === "string" && cupom._id.trim() !== "") return cupom._id;
    if (cupom._id && typeof cupom._id.$oid === "string") return cupom._id.$oid;
    return null;
  };

  // Buscar cupons do backend
  const fetchCupons = async () => {
    try {
      const response = await api.get("/cupons"); // ← usando api.js
      setCupons(response.data || []);
    } catch (err) {
      console.error("Erro ao buscar cupons:", err);
    }
  };

  useEffect(() => {
    fetchCupons();
  }, []);

  // Quando receber novoCupom do Admin, refetch (garante consistência)
  useEffect(() => {
    if (novoCupom) {
      fetchCupons();
    }
  }, [novoCupom]);

  // Excluir cupom (aceita either id string ou objeto cupom)
  const excluirCupom = async (raw) => {
    const id = typeof raw === "string" ? raw : extractId(raw);
    if (!id) {
      console.error("ID inválido ao tentar excluir:", raw);
      return alert("ID do cupom inválido. Veja o console para mais detalhes.");
    }

    try {
      await api.delete(`/cupons/${id}`); // ← usando api.js
      // remove localmente
      setCupons((prev) => prev.filter((c) => extractId(c) !== id));
    } catch (err) {
      console.error("Erro ao excluir cupom:", err.response?.data || err.message || err);
      alert("Erro ao excluir cupom. Veja o console para detalhes.");
    }
  };

  return (
    <div className="containerListaCupom">
      <div className="listaCupons">
        <div className="alinhaboxcupons1">
          <h1 className="h1admin">
            LISTA DE <b style={{ color: "var(--cor-verde_cana)" }}>CUPONS</b> DAS PARCERIAS
          </h1>
        </div>

        <div className="alinhaboxcupons2">
          <div className="paragravosCupons">
            {cupons.length > 0 ? (
              cupons.map((cupom, index) => {
                const id = extractId(cupom) || `_id${index}`;
                return (
                  <div key={id} className="cupomItem">
                    <p>Código: {cupom.codigo ?? "(sem código)"}</p>
                    <svg
                      onClick={() => excluirCupom(cupom)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash3 lixeiracupom"
                      viewBox="0 0 16 16"
                      style={{ cursor: "pointer" }}
                      title="Excluir cupom"
                    >
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg>
                  </div>
                );
              })
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListaCupom;
