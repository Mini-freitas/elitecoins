import { useEffect } from "react";
import { toast } from "react-toastify";
import MyGlobalStyle from '../../styles/globalStyles';
import HeaderPrincipal from '../../components/Header/HeaderPrincipal';
import MainPrincipal from '../../components/Main/MainPrincipal';
import Footer from '../../components/Footer/Footer';

function Home({ usuario, handleLogout }) {
  useEffect(() => {
    const mensagem = sessionStorage.getItem("mensagemCadastro");
    if (mensagem) {
      toast.success(mensagem, { position: "top-right", autoClose: 3000, hideProgressBar: false, theme: "dark" });
      sessionStorage.removeItem("mensagemCadastro"); // limpa para não repetir
    }
  }, []);

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
