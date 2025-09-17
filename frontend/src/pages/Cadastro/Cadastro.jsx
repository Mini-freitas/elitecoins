import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./cadastro.css";

function Cadastro({ handleLogin }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  // Regras de senha
  const regras = {
    tamanho: senha.length >= 8,
    maiuscula: /[A-Z]/.test(senha),
    minuscula: /[a-z]/.test(senha),
    numero: /\d/.test(senha),
    especial: /[@$!%*?&.]/.test(senha),
  };

  // Validação geral
  const validarSenha = () => {
    return Object.values(regras).every(Boolean);
  };

  const cadastrar = async (e) => {
    e.preventDefault();
    setErro("");

    if (!validarSenha()) {
      setErro("A senha não atende aos requisitos de segurança.");
      return;
    }

    try {
      // Cadastra usuário
      await axios.post("http://localhost:3000/api/registrar", {
        nome,
        email,
        senha,
        tipo: "COMUM",
      });

      // Faz login automático
      const loginRes = await axios.post("http://localhost:3000/api/login", {
        email,
        senha,
      });
      handleLogin(loginRes.data.usuario);

      sessionStorage.setItem("mensagemCadastro", "✅ Usuário criado com sucesso!");
      navigate("/");
    } catch (err) {
      setErro(err.response?.data?.error || "Erro ao cadastrar");
    }
  };

  return (
    <div className="cadastro">
      <a href="./">
        <img className="imgcadastro" src="../favicon.svg" alt="" />
      </a>
      <h2 className="h2cadastro">
        CRIE SUA <b style={{ color: "var(--cor-verde_cana)" }}>CONTA</b> ELITE COINS
      </h2>
      <form className="formcadastro" onSubmit={cadastrar}>
        <input
          className="inputcadastro"
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          className="inputcadastro"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
          required
        />
        <input
          className={`inputcadastro ${senha ? (validarSenha() ? "senha-forte" : "senha-fraca") : ""}`}
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        {/* Feedback das regras */}
        {senha && (
          <ul className="regras-senha">
            <li className={regras.tamanho ? "ok" : "erro"}>Mínimo 8 caracteres</li>
            <li className={regras.maiuscula ? "ok" : "erro"}>1 letra maiúscula</li>
            <li className={regras.minuscula ? "ok" : "erro"}>1 letra minúscula</li>
            <li className={regras.numero ? "ok" : "erro"}>1 número</li>
            <li className={regras.especial ? "ok" : "erro"}>1 caractere especial (@$!%*?&.)</li>
          </ul>
        )}

        <button className="buttoncadastro" type="submit">
          Cadastrar
        </button>
      </form>

      {erro && <p className="erro">{erro}</p>}
    </div>
  );
}

export default Cadastro;
