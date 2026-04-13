import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from "./services/api";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import Admin from "./pages/Admin/Admin";
import Compra from "./pages/Compra/Compra";

import Perfil from "./pages/Usuario/Perfil/Perfil";
import Seguranca from "./pages/Usuario/Seguranca";
import Compras from "./pages/Usuario/Compras/Compras";
import ExcluirConta from "./pages/Usuario/ExcluirConta";

import PagamentoAprovado from "./pages/Pagamentos/Pagamentoaprovado";
import PagamentoPendente from "./pages/Pagamentos/Pagamentopendente";
import PagamentoFalhou from "./pages/Pagamentos/Pagamentofalhou";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 VALIDAÇÃO CORRIGIDA E ROBUSTA
  useEffect(() => {
    const validarSessao = async () => {
      const usuarioSalvo = localStorage.getItem("usuario");

      if (!usuarioSalvo) {
        setLoading(false);
        return;
      }

      try {
        const user = JSON.parse(usuarioSalvo);

        // 🔒 PROTEÇÃO CRÍTICA
        if (!user?.id) {
          localStorage.removeItem("usuario");
          setUsuario(null);
          setLoading(false);
          return;
        }

        const res = await api.get("/me", {
          headers: {
            "x-user-id": user.id,
          },
        });

        setUsuario(res.data);

        // 🔄 atualiza dados no localStorage
        localStorage.setItem("usuario", JSON.stringify(res.data));

      } catch (err) {
        // 🔥 SÓ DESLOGA SE FOR 401
        if (err.response?.status === 401) {
          console.log("Sessão inválida");

          localStorage.removeItem("usuario");
          setUsuario(null);
        } else {
          console.log("Erro ao validar sessão:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    validarSessao();
  }, []);

  const handleLogin = (usuarioLogado) => {
    setUsuario(usuarioLogado);
    localStorage.setItem("usuario", JSON.stringify(usuarioLogado));
  };

  const handleLogout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  const RotaProtegida = ({ children }) => {
    if (!usuario) return <Navigate to="/login" />;
    return children;
  };

  // 🔒 evita render antes da validação
  if (loading) return null;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home usuario={usuario} handleLogout={handleLogout} />} />
        <Route path="/compra" element={<Compra usuario={usuario} handleLogout={handleLogout} />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/cadastro" element={<Cadastro handleLogin={handleLogin} />} />

        <Route
          path="/admin"
          element={
            usuario?.tipo === "ADMIN"
              ? <Admin usuario={usuario} handleLogout={handleLogout} />
              : <Navigate to="/login" />
          }
        />

        <Route
          path="/usuario/perfil"
          element={
            <RotaProtegida>
              <Perfil
                usuario={usuario}
                handleLogout={handleLogout}
                handleLogin={handleLogin}
              />
            </RotaProtegida>
          }
        />

        <Route path="/usuario/seguranca" element={<RotaProtegida><Seguranca usuario={usuario} /></RotaProtegida>} />
        <Route path="/usuario/compras" element={<RotaProtegida><Compras usuario={usuario} handleLogout={handleLogout} /></RotaProtegida>} />
        <Route path="/usuario/excluir" element={<RotaProtegida><ExcluirConta usuario={usuario} handleLogout={handleLogout} /></RotaProtegida>} />

        <Route path="/pagamentoaprovado" element={<PagamentoAprovado usuario={usuario} handleLogout={handleLogout} />} />
        <Route path="/pagamentopendente" element={<PagamentoPendente usuario={usuario} handleLogout={handleLogout} />} />
        <Route path="/pagamentofalhou" element={<PagamentoFalhou usuario={usuario} handleLogout={handleLogout} />} />
      </Routes>

      <ToastContainer theme="dark" autoClose={3000} />
    </Router>
  );
}

export default App;