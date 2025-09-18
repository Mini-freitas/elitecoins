import { useState, useRef } from "react";
import axios from "axios";
import './style.css';

function CadBanner({ onBannerSalvo }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [bannerUrl, setBannerUrl] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    } else {
      setFile(null);
      setPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Selecione uma imagem primeiro!");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("url", bannerUrl);

    try {
      await axios.post("www.elitecoinsfc.com.br:3000/api/upload-banner", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Banner atualizado com sucesso!");
      setFile(null);
      setPreview(null);
      setBannerUrl("");

      if (fileInputRef.current) fileInputRef.current.value = "";

      // avisa o componente pai que um banner foi salvo
      if (onBannerSalvo) onBannerSalvo();

    } catch (err) {
      console.error(err);
      alert("Erro ao enviar imagem");
    }
  };

  return (
    <div className="containerCadastroBanner">
      <div className="boxAtualizarMoedas">
        <h1 className="h1admin">
          ATUALIZE O <b style={{ color: "var(--cor-verde_cana)" }}>BANNER</b> DE PUBLICIDADES
        </h1>
        <p className="padmin">Lembre que a imagem deve ter 1075 x 300 px no formato svg</p>

        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />

        <span className="imgSpan" onClick={() => fileInputRef.current && fileInputRef.current.click()} style={{ backgroundColor: preview ? "transparent" : "#1b1b1b" }} >
          {preview ? (
            <img className="imgadmin" src={preview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }} />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-arrow-up uploadsvg" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708z" />
              <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
            </svg>
          )}
        </span>

        <input type="text" placeholder="Coloque a url do banner aqui" className="inputadnim" value={bannerUrl} onChange={(e) => setBannerUrl(e.target.value)} />

        <button className="buttonadmin" onClick={handleUpload}>
          Salvar imagem
        </button>
      </div>
    </div>
  );
}

export default CadBanner;
