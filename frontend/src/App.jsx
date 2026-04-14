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

function App() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // 🔒 VALIDAÇÃO DE SESSÃO
  // =========================
  useEffect(() => {
    const validarSessao = async () => {
      const usuarioSalvo = localStorage.getItem("usuario");

      if (!usuarioSalvo) {
        setLoading(false);
        return;
      }

      try {
        const user = JSON.parse(usuarioSalvo);

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
        localStorage.setItem("usuario", JSON.stringify(res.data));

      } catch (err) {
        if (err.response?.status === 401) {
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

  if (loading) return null;

  return (
    <Router>
      <Routes>

        {/* HOME */}
        <Route 
          path="/" 
          element={
            <Home 
              usuario={usuario} 
              handleLogout={handleLogout} 
            />
          } 
        />

        {/* COMPRA */}
        <Route 
          path="/compra" 
          element={
            <Compra 
              usuario={usuario} 
              handleLogout={handleLogout} 
            />
          } 
        />

        {/* AUTH */}
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/cadastro" element={<Cadastro handleLogin={handleLogin} />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            usuario?.tipo === "ADMIN"
              ? <Admin usuario={usuario} handleLogout={handleLogout} />
              : <Navigate to="/login" />
          }
        />

        {/* USUÁRIO */}
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

        <Route 
          path="/usuario/seguranca" 
          element={<RotaProtegida><Seguranca usuario={usuario} /></RotaProtegida>} 
        />

        <Route 
          path="/usuario/compras" 
          element={<RotaProtegida><Compras usuario={usuario} handleLogout={handleLogout} /></RotaProtegida>} 
        />

        <Route 
          path="/usuario/excluir" 
          element={<RotaProtegida><ExcluirConta usuario={usuario} handleLogout={handleLogout} /></RotaProtegida>} 
        />

        {/* 🔥 FALLBACK (qualquer rota desconhecida) */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>

      {/* 🔥 TOAST GLOBAL */}
      <ToastContainer theme="dark" autoClose={3000} />

    </Router>
  );
}

export default App;