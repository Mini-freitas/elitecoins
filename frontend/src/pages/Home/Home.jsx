import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

import MyGlobalStyle from "../../styles/globalStyles";
import HeaderPrincipal from "../../components/Header/HeaderPrincipal";
import MainPrincipal from "../../components/Main/MainPrincipal";
import Footer from "../../components/Footer/Footer";

function Home({ usuario, handleLogout }) {
  const location = useLocation();

  // ===============================
  // STATUS DO PAGAMENTO
  // ===============================
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("status");

    if (!status) return;

    if (status === "approved") {
      toast.success("Pagamento aprovado com sucesso!");
    }

    if (status === "pending") {
      toast("Pagamento em análise...", {
        icon: "⏳",
      });
    }

    if (status === "failed") {
      toast.error("Pagamento não aprovado.");
    }

    // limpa URL (fica profissional)
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