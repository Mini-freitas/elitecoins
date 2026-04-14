import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  Notificacaocontainer,
  Badge,
  Icone,
  BoxMenuNotificacao,
  TituloBox,
  NotificacaoItem,
} from "./styles";

const Notificacao = ({
  usuario,
  menuAberto,
  setMenuAberto,
  fecharMenuUsuario,
}) => {
  const [notificacoes, setNotificacoes] = useState([]);
  const [naoVistas, setNaoVistas] = useState(0);
  const [carregando, setCarregando] = useState(false);
  const [mensagemSelecionada, setMensagemSelecionada] = useState(null);

  useEffect(() => {
    const carregar = async () => {
      if (!usuario?.id) return;

      setCarregando(true);

      try {
        const res = await api.get(`/notificacoes/${usuario.id}`);

        if (Array.isArray(res.data)) {
          setNotificacoes(res.data);
          setNaoVistas(res.data.filter((n) => !n.vista).length);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setCarregando(false);
      }
    };

    carregar();
  }, [usuario]);

  const toggleMenu = () => {
    fecharMenuUsuario();
    setMenuAberto(!menuAberto);
  };

  const handleClick = async (n) => {
    try {
      if (!n.vista) {
        await api.put(`/notificacoes/${n.id}/vista`);

        const updated = notificacoes.map((item) =>
          item.id === n.id ? { ...item, vista: true } : item
        );

        setNotificacoes(updated);
        setNaoVistas(updated.filter((x) => !x.vista).length);
      }

      setMensagemSelecionada(n);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      {/* SINO */}
      <Notificacaocontainer onClick={toggleMenu}>
        <Badge>{naoVistas}</Badge>

        <Icone
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92z" />
        </Icone>
      </Notificacaocontainer>

      {/* BOX */}
      {menuAberto && (
        <BoxMenuNotificacao>
          <TituloBox>Notificações</TituloBox>

          <div className="list">
            {carregando ? (
              <p style={{ padding: "1rem" }}>Carregando...</p>
            ) : notificacoes.length > 0 ? (
              notificacoes.map((n) => (
                <NotificacaoItem
                  key={n.id}
                  vista={n.vista}
                  onClick={() => handleClick(n)}
                >
                  <span>
                    {n.mensagem.length > 80
                      ? n.mensagem.substring(0, 80) + "..."
                      : n.mensagem}
                  </span>
                </NotificacaoItem>
              ))
            ) : (
              <p style={{ padding: "1rem" }}>Nenhuma notificação</p>
            )}
          </div>
        </BoxMenuNotificacao>
      )}

      {/* MODAL FLUTUANTE */}
      {mensagemSelecionada && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            right: "0",
            width: "280px",
            background: "#111",
            color: "#fff",
            padding: "14px",
            borderRadius: "10px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            zIndex: 2000,
          }}
        >
          <h4>Notificação</h4>
          <p>{mensagemSelecionada.mensagem}</p>

          <button
            onClick={() => setMensagemSelecionada(null)}
            style={{
              marginTop: "10px",
              background: "#00c853",
              border: "none",
              padding: "6px 10px",
              borderRadius: "6px",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Fechar
          </button>
        </div>
      )}
    </div>
  );
};

export default Notificacao;