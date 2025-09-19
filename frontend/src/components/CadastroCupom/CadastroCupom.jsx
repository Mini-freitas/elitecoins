// src/components/CadastroCupom/CadastroCupom.jsx
import { useState } from "react";
import api from "../../services/api"; // ← usa api.js padronizado
import './style.css'

function CadastroCupom({ onCupomCadastrado }) {
  const [parceiro, setParceiro] = useState("");
  const [codigo, setCodigo] = useState("");
  const [desconto, setDesconto] = useState("");

  const cadastrarCupom = async () => {
    if (!parceiro || !codigo || !desconto) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const res = await api.post("/cupons", { // ← URL padronizada
        parceiro,
        codigo,
        desconto,
      });

      alert("Cupom cadastrado com sucesso!");

      if (onCupomCadastrado) {
        onCupomCadastrado(res.data);
      }

      setParceiro("");
      setCodigo("");
      setDesconto("");
    } catch (err) {
      console.error("Erro ao cadastrar cupom:", err.response?.data || err.message || err);
      alert("Erro ao cadastrar cupom. Veja o console para detalhes.");
    }
  };

  return (
    <div className="containerCadastroCupom">
      <div className="boxCupomParcerias">
        <h1 className="h1admin">
          CADASTRE OS <b style={{ color: "var(--cor-verde_cana)" }}>CUPONS</b> DE DESCONTO AQUI
        </h1>

        <input
          type="text"
          placeholder="Nome do seu parceiro"
          className="inputadnim"
          value={parceiro}
          onChange={(e) => setParceiro(e.target.value)}
        />
        <input
          type="text"
          placeholder="Código promocional"
          className="inputadnim"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Porcentagem de desconto"
          className="inputadnim"
          value={desconto}
          onChange={(e) => setDesconto(e.target.value)}
        />
        <button className="buttonadmin" onClick={cadastrarCupom}>
          Cadastrar
        </button>
      </div>
    </div>
  );
}

export default CadastroCupom;
