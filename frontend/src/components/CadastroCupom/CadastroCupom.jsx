import { useState } from "react";
import axios from "axios";
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
      const res = await axios.post("/api/cupons", {
        parceiro,
        codigo,
        desconto,
      });

      alert("Cupom cadastrado com sucesso!");

      // avisa o Admin que tem cupom novo
      if (onCupomCadastrado) {
        onCupomCadastrado(res.data);
      }

      setParceiro("");
      setCodigo("");
      setDesconto("");
    } catch (err) {
      console.error("Erro ao cadastrar cupom:", err);
      alert("Erro ao cadastrar cupom");
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
          placeholder="porcentagem de desconto"
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
