import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";

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
          headers: { "x-user-id": user.id },
        });

        setUsuario(res.data);
        localStorage.setItem("usuario", JSON.stringify(res.data));

      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("usuario");
          setUsuario(null);
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

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>

      {/* 🔥 TOASTER GLOBAL (ESTILO PREMIUM CENTRALIZADO) */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,

          style: {
            background: "#111",
            color: "#fff",
            fontSize: "16px",
            padding: "16px 20px",
            borderRadius: "12px",
            fontWeight: "600",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          },

          success: {
            style: {
              background: "linear-gradient(135deg, #16a34a, #22c55e)",
              color: "#fff",
            },
          },

          error: {
            style: {
              background: "linear-gradient(135deg, #dc2626, #ef4444)",
              color: "#fff",
            },
          },

          loading: {
            style: {
              background: "linear-gradient(135deg, #2563eb, #3b82f6)",
              color: "#fff",
            },
          },
        }}
      />
    </Router>
  );
}

export default App;