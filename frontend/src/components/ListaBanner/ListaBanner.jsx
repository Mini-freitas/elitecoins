// src/components/ListaBanner/ListaBanner.jsx
import { useState, useEffect } from "react";
import api from "../../services/api"; // ← usa api.js padronizado
import "./style.css";

function ListaBanner() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await api.get("/banners"); // rota atualizada sem /api
      setBanners(res.data);
    } catch (err) {
      console.error("Erro ao buscar banners:", err);
    }
  };

  const handleDeleteBanner = async (id) => {
    if (!window.confirm("Deseja realmente excluir este banner?")) return;

    try {
      await api.delete(`/banners/${id}`); // rota atualizada sem /api
      alert("Banner excluído com sucesso!");
      fetchBanners(); // atualiza lista
    } catch (err) {
      console.error("Erro ao excluir banner:", err);
      alert("Erro ao excluir banner. Veja o console para detalhes.");
    }
  };

  return (
    <div className="containerListaBanner">
      <div className="listaBanner">
        <h1 className="h1admin">
          <b style={{ color: "var(--cor-verde_cana)" }}>BANNERS</b> SALVOS
        </h1>
        <div className="listaBannerBox">
        {banners.length > 0 ? (
          banners.map((banner) => (
            <div key={banner.id} className="bannerItem">
              <img className="imgcadastradas" src={banner.caminho} alt="Banner" />
              <button className="deleteButton" onClick={() => handleDeleteBanner(banner.id)} >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16" >
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                </svg>
              </button>
            </div>
          ))
        ) : (
          <p>Nenhum banner cadastrado</p>
        )}    
        </div>
        
      </div>
    </div>
  );
}

export default ListaBanner;
