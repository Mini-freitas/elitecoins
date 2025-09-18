import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./login.css";

function Login({ handleLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
    const res = await axios.post("/api/login", { email, senha });

      handleLogin(res.data.usuario);

      sessionStorage.setItem("usuario", JSON.stringify(res.data.usuario));

      if (res.data.usuario.tipo === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setErro(err.response?.data?.error || "Erro ao logar. Verifique suas credenciais.");
    }
  };

  return (
    <div className="login">
      <a href="./">
        <img className="imglogin" src="../favicon.svg" alt="" />
      </a>
      <h2 className="h2login">FAÇA SEU <b style={{ color: "var(--cor-verde_cana)" }}>LOGIN</b> <br></br> NA ELITE COINS</h2>
      <form className="formlogin" onSubmit={login}>
        <input className="inputlogin" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="inputlogin" type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        <button className="buttonlogin" type="submit">Entrar</button>
      </form>
      {erro && <p className="erro">{erro}</p>}
      <p className="loginp">
        Não tem conta?{" "}
        <Link to="/cadastro" className="link">Criar uma conta Elite Coins</Link>
      </p>
    </div>
  );
}

export default Login;
