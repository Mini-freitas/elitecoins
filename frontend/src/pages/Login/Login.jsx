import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode"; // ✅ import default correto
import api from "../../services/api";
import "./login.css";

function Login({ handleLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  // função de redirecionamento por tipo
  const redirecionarUsuario = (usuario) => {
    if (usuario.tipo === "ADMIN") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  // LOGIN LOCAL
  const loginLocal = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { email, senha });

      handleLogin(res.data.usuario);
      sessionStorage.setItem("usuario", JSON.stringify(res.data.usuario));

      redirecionarUsuario(res.data.usuario); // corrigido
    } catch (err) {
      setErro(err.response?.data?.error || "Erro ao logar. Verifique suas credenciais.");
    }
  };

  // LOGIN GOOGLE
  const loginGoogle = async (credentialResponse) => {
    try {
      if (!credentialResponse?.credential) {
        setErro("Erro: credential não recebida do Google");
        return;
      }

      const dados = jwt_decode(credentialResponse.credential);
      const usuarioGoogle = {
        nome: dados.name,
        email: dados.email,
        avatar: dados.picture,
        googleId: dados.sub,
      };

      const res = await api.post("/login-google", usuarioGoogle);

      handleLogin(res.data.usuario);
      sessionStorage.setItem("usuario", JSON.stringify(res.data.usuario));

      redirecionarUsuario(res.data.usuario); // corrigido
    } catch (err) {
      console.error("Erro login Google:", err);
      setErro("Não foi possível logar com Google");
    }
  };

  return (
    <div className="login">
      <a href="./">
        <img className="imglogin" src="../favicon.svg" alt="Logo" />
      </a>
      <h2 className="h2login">
        FAÇA SEU <b style={{ color: "var(--cor-verde_cana)" }}>LOGIN</b> <br /> NA ELITE COINS
      </h2>

      <form className="formlogin" onSubmit={loginLocal}>
        <input
          className="inputlogin"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="inputlogin"
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button className="buttonlogin" type="submit">
          Entrar
        </button>
      </form>

      <div style={{ marginTop: "20px" }}>
        <GoogleLogin
          onSuccess={loginGoogle}
          onError={() => setErro("Erro ao logar com Google")}
        />
      </div>

      {erro && <p className="erro">{erro}</p>}

      <p className="loginp">
        Não tem conta?{" "}
        <Link to="/cadastro" className="link">
          Criar uma conta Elite Coins
        </Link>
      </p>
    </div>
  );
}

export default Login;
