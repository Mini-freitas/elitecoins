import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  Notificacaocontainer,
  Badge,
  Icone,
  BoxMenuNotificacao,
  TituloBox,
} from "./styles";

const Notificacao = ({ usuario, menuAberto, setMenuAberto, fecharMenuUsuario }) => {
  const [notificacoes, setNotificacoes] = useState([]);
  const [naoVistas, setNaoVistas] = useState(0);
  const [carregando, setCarregando] = useState(false);
  const [mensagemSelecionada, setMensagemSelecionada] = useState(null); // mensagem aberta

  // 🔹 Carrega notificações do usuário
  useEffect(() => {
    const carregarNotificacoes = async () => {
      if (!usuario || !usuario.id) return;

      setCarregando(true);
      try {
        const res = await api.get(`/notificacoes/${usuario.id}`);
        if (Array.isArray(res.data)) {
          setNotificacoes(res.data);
          setNaoVistas(res.data.filter((n) => !n.vista).length);
        }
      } catch (err) {
        console.error("Erro ao carregar notificações:", err);
      } finally {
        setCarregando(false);
      }
    };

    carregarNotificacoes();
  }, [usuario]);

  // 🔹 Abre/fecha o menu de notificações
  const handleToggleMenu = () => {
    fecharMenuUsuario();
    setMenuAberto(!menuAberto);
  };

  // 🔹 Clica em uma notificação → marca como vista + mostra conteúdo completo
  const handleClickNotificacao = async (notificacao) => {
    try {
      // Marca apenas essa notificação como vista (se ainda não estiver)
      if (!notificacao.vista) {
        await api.put(`/notificacoes/${notificacao.id}/vista`);
        const atualizadas = notificacoes.map((n) =>
          n.id === notificacao.id ? { ...n, vista: true } : n
        );
        setNotificacoes(atualizadas);
        setNaoVistas(atualizadas.filter((n) => !n.vista).length);
      }

      // Exibe a mensagem em um modal flutuante
      setMensagemSelecionada(notificacao);
    } catch (err) {
      console.error("Erro ao marcar notificação como vista:", err);
    }
  };

  // 🔹 Fecha a mensagem flutuante
  const fecharMensagem = () => setMensagemSelecionada(null);

  return (
    <div style={{ position: "relative" }}>
      {/* Ícone do sino */}
      <Notificacaocontainer onClick={handleToggleMenu}>
        <Badge>{naoVistas}</Badge>
        <Icone
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8 16a2 2 0 0 0 2-2H6a2 2 
          0 0 0 2 2M8 1.918l-.797.161A4 
          4 0 0 0 4 6c0 .628-.134 
          2.197-.459 3.742-.16.767-.376 
          1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 
          8.197 12 6.628 12 6a4 4 0 0 
          0-3.203-3.92zM14.22 12c.223.447.481.801.78 
          1H1c.299-.199.557-.553.78-1C2.68 
          10.2 3 6.88 3 6c0-2.42 
          1.72-4.44 4.005-4.901a1 1 
          0 1 1 1.99 0A5 5 0 0 
          1 13 6c0 .88.32 4.2 1.22 6" />
        </Icone>
      </Notificacaocontainer>

      {/* Menu de notificações */}
      {menuAberto && (
        <BoxMenuNotificacao>
          <TituloBox>Notificações</TituloBox>
          {carregando ? (
            <p>Carregando...</p>
          ) : notificacoes.length > 0 ? (
            notificacoes.map((n) => (
              <div
                key={n.id}
                onClick={() => handleClickNotificacao(n)}
                style={{
                  borderBottom: "1px solid #444",
                  padding: "10px",
                  height: "3rem",
                  background: n.vista ? "#1f1f1f" : "#004d00",
                  color: "#f5f5f5",
                  borderRadius: "2px",
                  marginBottom: "6px",
                  cursor: "pointer",
                }}
              >
                {n.mensagem.length > 60
                  ? n.mensagem.substring(0, 60) + "..."
                  : n.mensagem}
              </div>
            ))
          ) : (
            <p>Nenhuma notificação</p>
          )}
        </BoxMenuNotificacao>
      )}

      {/* Caixa flutuante da mensagem selecionada */}
      {mensagemSelecionada && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            right: "0",
            width: "300px",
            background: "#222",
            color: "#fff",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            zIndex: 2000,
          }}
        >
          <h4 style={{ marginBottom: "10px" }}>Notificação</h4>
          <p>{mensagemSelecionada.mensagem}</p>
          <button
            onClick={fecharMensagem}
            style={{
              marginTop: "10px",
              background: "#00b050",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              padding: "6px 12px",
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
