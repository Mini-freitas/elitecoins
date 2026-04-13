import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import api from "../../services/api";
import "./login.css";

function Login({ handleLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const redirecionarUsuario = (usuario) => {
    if (usuario.tipo === "ADMIN") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  // ===============================
  // LOGIN LOCAL
  // ===============================
  const loginLocal = async (e) => {
    e.preventDefault();

    setErro("");
    setLoading(true);

    localStorage.removeItem("usuario");

    try {
      const res = await api.post("/login", { email, senha });

      if (!res.data?.usuario?.id) {
        throw new Error("Usuário inválido");
      }

      handleLogin(res.data.usuario);

      redirecionarUsuario(res.data.usuario);
    } catch (err) {
      setErro(
        err.response?.data?.error ||
        "Erro ao logar. Verifique suas credenciais."
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // LOGIN GOOGLE
  // ===============================
  const loginGoogle = async (credentialResponse) => {
    setErro("");
    setLoading(true);

    localStorage.removeItem("usuario");

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

      if (!res.data?.usuario?.id) {
        throw new Error("Usuário inválido");
      }

      handleLogin(res.data.usuario);

      redirecionarUsuario(res.data.usuario);
    } catch (err) {
      console.error("Erro login Google:", err);
      setErro("Não foi possível logar com Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <a href="./">
        <img className="imglogin" src="../favicon.svg" alt="Logo" />
      </a>

      <h2 className="h2login">
        FAÇA SEU{" "}
        <b style={{ color: "var(--cor-verde_cana)" }}>LOGIN</b> <br /> NA ELITE COINS
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

        <button className="buttonlogin" type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
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