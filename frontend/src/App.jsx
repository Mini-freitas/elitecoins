import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // estilos do toast

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import Admin from "./pages/Admin/Admin";
import Compra from "./pages/Compra/Compra";
import PaginaCid from "./pages/PgCid/PagCid";


function App() {
  const [usuario, setUsuario] = useState(null);

  // Recupera usuário da sessão ao carregar o app
  useEffect(() => {
    const usuarioSalvo = sessionStorage.getItem("usuario");
    if (usuarioSalvo) setUsuario(JSON.parse(usuarioSalvo));
  }, []);

  const handleLogin = (usuarioLogado) => {
    setUsuario(usuarioLogado);
    sessionStorage.setItem("usuario", JSON.stringify(usuarioLogado));
  };

  const handleLogout = () => {
    setUsuario(null);
    sessionStorage.removeItem("usuario");
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<Home usuario={usuario} handleLogout={handleLogout} />} 
        />
        <Route 
          path="/compra" 
          element={<Compra usuario={usuario} handleLogout={handleLogout} />} 
        />
        <Route 
          path="/login" 
          element={<Login handleLogin={handleLogin} />} 
        />
        <Route 
          path="/cadastro" 
          element={<Cadastro handleLogin={handleLogin} />} 
        />
        <Route 
          path="/cid" 
          element={<PaginaCid handleLogin={handleLogin} />} 
        />
        <Route 
          path="/admin" 
          element={
            usuario?.tipo === "ADMIN" 
              ? <Admin usuario={usuario} handleLogout={handleLogout} /> 
              : <Navigate to="/login" />
          } 
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover draggable theme="dark" />
    </Router>
  );
}

export default App;
