import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import MyGlobalStyle from '../../styles/globalStyles';
import HeaderPrincipal from '../../components/Header/HeaderPrincipal';
import MainPrincipal from '../../components/Main/MainPrincipal';
import Footer from '../../components/Footer/Footer';

function Home({ usuario, handleLogout }) {
  const location = useLocation();

  useEffect(() => {
    // =========================
    // ✅ MENSAGEM DE CADASTRO
    // =========================
    const mensagem = sessionStorage.getItem("mensagemCadastro");

    if (mensagem) {
      toast.success(mensagem, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark"
      });

      sessionStorage.removeItem("mensagemCadastro");
    }

    // =========================
    // 🔥 STATUS DO PAGAMENTO
    // =========================
    const params = new URLSearchParams(location.search);
    const status = params.get("status");

    if (!status) return;

    if (status === "approved") {
      toast.success("✅ Pagamento aprovado com sucesso!", {
        position: "top-right",
        autoClose: 4000,
        theme: "dark"
      });
    }

    if (status === "pending") {
      toast.warning("⚠️ Pagamento pendente. Aguarde a confirmação.", {
        position: "top-right",
        autoClose: 4000,
        theme: "dark"
      });
    }

    if (status === "failed") {
      toast.error("❌ Pagamento não foi aprovado.", {
        position: "top-right",
        autoClose: 4000,
        theme: "dark"
      });
    }

    // 🔥 LIMPA A URL (muito importante)
    window.history.replaceState({}, document.title, "/");

  }, [location]);

  return (
    <>
      <MyGlobalStyle />

      <HeaderPrincipal 
        usuario={usuario} 
        handleLogout={handleLogout} 
      />

      <MainPrincipal />

      <Footer 
        usuario={usuario} 
        handleLogout={handleLogout}
      />
    </>
  );
}

export default Home;