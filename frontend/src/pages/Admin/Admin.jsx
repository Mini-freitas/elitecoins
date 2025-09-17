import { useState } from "react";
import HeaderAdmin from "../../components/Header/HeaderPrincipal";
import ValorMoedas from "../../components/AtualizaValorMoedasADM/AtualizaValorMoeda";
import CadBanner from "../../components/CadastroBanners/CadastroBanner";
import ListaBanner from "../../components/ListaBanner/ListaBanner";
import CadastroCupom from "../../components/CadastroCupom/CadastroCupom";
import ListaCupom from "../../components/ListaCupom/ListaCupom";  
import "./admin.css";

function Admin({ usuario, handleLogout }) {

    const [reloadBanners, setReloadBanners] = useState(false);
    const [novoCupom, setNovoCupom] = useState(null); // ← faltava isso


  return (
    <div className="admin">
      <HeaderAdmin usuario={usuario} handleLogout={handleLogout} />
      <ValorMoedas />
      <CadBanner onBannerSalvo={() => setReloadBanners((prev) => !prev)} />
      <ListaBanner key={reloadBanners} />
      <CadastroCupom onCupomCadastrado={setNovoCupom} />
      <ListaCupom novoCupom={novoCupom} />
    </div>
  );
}

export default Admin;
