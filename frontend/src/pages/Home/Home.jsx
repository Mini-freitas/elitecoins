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
    const params = new URLSearchParams(location.search);
    const status = params.get("status");

    if (!status) return;

    if (status === "approved") {
      toast.success("Pagamento aprovado com sucesso!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }

    if (status === "pending") {
      toast.info("Pagamento em análise. Aguarde confirmação.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }

    if (status === "failed") {
      toast.error("Pagamento não aprovado. Tente novamente.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }

    // limpa URL depois (fica mais profissional)
    window.history.replaceState({}, document.title, "/");
  }, [location]);

  return (
    <>
      <MyGlobalStyle />
      <HeaderPrincipal usuario={usuario} handleLogout={handleLogout} />
      <MainPrincipal />
      <Footer usuario={usuario} handleLogout={handleLogout}/>
    </>
  );
}

export default Home;