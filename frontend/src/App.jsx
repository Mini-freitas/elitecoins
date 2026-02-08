import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  useEffect(() => {
    const usuarioSalvo = sessionStorage.getItem("usuario");
    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
  }, []);

  const handleLogin = (usuarioLogado) => {
    setUsuario(usuarioLogado);
    sessionStorage.setItem("usuario", JSON.stringify(usuarioLogado));
  };

  const handleLogout = () => {
    setUsuario(null);
    sessionStorage.removeItem("usuario");
  };

  const RotaProtegida = ({ children }) => {
    if (!usuario) return <Navigate to="/login" />;
    return children;
  };

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
                handleLogin={handleLogin} // 👈 ESSENCIAL
              />
            </RotaProtegida>
          }
        />

        <Route path="/usuario/seguranca" element={<RotaProtegida><Seguranca usuario={usuario} /></RotaProtegida>} />
        <Route path="/usuario/compras" element={<RotaProtegida><Compras usuario={usuario} /></RotaProtegida>} />
        <Route path="/usuario/excluir" element={<RotaProtegida><ExcluirConta usuario={usuario} handleLogout={handleLogout} /></RotaProtegida>} />
      
        <Route path="/pagamentoaprovado" element={<PagamentoAprovado />} />
        <Route path="/pagamentopendente" element={<PagamentoPendente />} />
        <Route path="/pagamentofalhou" element={<PagamentoFalhou />} />

     
      </Routes>

      <ToastContainer theme="dark" autoClose={3000} />
    </Router>
  );
}

export default App;
