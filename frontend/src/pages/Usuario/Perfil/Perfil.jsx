import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

import {
  Perfilsec,
  Mainperfil,
  Container,
  Header,
  InfoItem,
  EditButton,
  ProgressWrapper,
  ProgressBar,
  ProgressStep,
  VoucherBox,
  CtaBox,
  CompleteProfileButton,
} from "./styles";

import PerfilForm from "./PerfilForm";
import HeaderPrincipal from "../../../components/Header/HeaderPrincipal";
import Footer from "../../../components/Footer/Footer";
import Credenciais from "./Credenciais";
import VoucherStatus from "./VoucherStatus";

function Perfil({ usuario, handleLogout, handleLogin }) {
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ===============================
  // LOAD USUÁRIO LOCAL
  // ===============================
  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario");

    if (usuarioSalvo && !usuario) {
      handleLogin(JSON.parse(usuarioSalvo));
    }

    setLoading(false);
  }, []);

  // ===============================
  // PROTEÇÃO DE ROTA
  // ===============================
  useEffect(() => {
    if (!loading && !usuario) {
      navigate("/login");
    }
  }, [usuario, loading, navigate]);

  // ===============================
  // NORMALIZAÇÃO DO USUÁRIO
  // ===============================
  const usuarioNormalizado = useMemo(() => {
    if (!usuario) return null;

    return {
      id: usuario.id,
      nome: usuario.nome || "",
      email: usuario.email || "",
      avatar: usuario.avatar || null,
      dataNascimento: usuario.dataNascimento || "",
      telefone: usuario.telefone || "",
      tipo: usuario.tipo || "COMUM",
      credenciais: usuario.credenciais || [],
      vouchersDisponiveis: usuario.vouchersDisponiveis || 0,
    };
  }, [usuario]);

  // ===============================
  // PROGRESSO (SÓ VISUAL, NÃO REGRA)
  // ===============================
  const progresso = useMemo(() => {
    if (!usuarioNormalizado) {
      return {
        conta: false,
        perfil: false,
        credenciais: false,
        percentual: 0,
      };
    }

    const perfilCompleto =
      usuarioNormalizado.nome &&
      usuarioNormalizado.telefone &&
      usuarioNormalizado.dataNascimento;

    const temCredenciais = usuarioNormalizado.credenciais.length > 0;

    return {
      conta: true,
      perfil: perfilCompleto,
      credenciais: temCredenciais,
      percentual:
        (1 +
          (perfilCompleto ? 1 : 0) +
          (temCredenciais ? 1 : 0)) *
        33.3,
    };
  }, [usuarioNormalizado]);

  if (loading || !usuarioNormalizado) return null;

  // ===============================
  // SALVAR PERFIL
  // ===============================
  const handleSave = async (dadosAtualizados) => {
    try {
      const res = await api.put(
        `/usuarios/${usuarioNormalizado.id}`,
        dadosAtualizados
      );

      handleLogin(res.data);
      setEditando(false);
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar perfil");
    }
  };

  const handleCancelEdit = () => {
    setEditando(false);
  };

  return (
    <Perfilsec>
      <HeaderPrincipal
        usuario={usuarioNormalizado}
        handleLogout={handleLogout}
      />

      <Mainperfil>
        <Container>

          {/* HEADER */}
          <Header>
            <h2>Meu Perfil</h2>

            <EditButton
              $cancel={editando}
              onClick={() =>
                editando ? handleCancelEdit() : setEditando(true)
              }
            >
              {editando ? "Cancelar" : "Editar Perfil"}
            </EditButton>
          </Header>

          {/* PROGRESSO VISUAL */}
          <ProgressWrapper>
            <ProgressBar>
              <span style={{ width: `${progresso.percentual}%` }} />
            </ProgressBar>

            <ProgressStep $active={progresso.conta}>
              Conta criada
            </ProgressStep>

            <ProgressStep $active={progresso.perfil}>
              Perfil completo
            </ProgressStep>

            <ProgressStep $active={progresso.credenciais}>
              Credenciais
            </ProgressStep>
          </ProgressWrapper>

          {/* VOUCHERS (FONTE REAL = BACKEND) */}
          <VoucherBox>
            <VoucherStatus usuario={usuarioNormalizado} />
            <PerfilProgresso etapa={usuarioNormalizado.perfilEtapa} />
          </VoucherBox>

          {/* CTA */}
          {!progresso.perfil && (
            <CtaBox>
              <p>Complete seu perfil e ganhe vouchers 🎁</p>

              <CompleteProfileButton onClick={() => setEditando(true)}>
                Completar perfil
              </CompleteProfileButton>
            </CtaBox>
          )}

          {/* CONTEÚDO */}
          {editando ? (
            <PerfilForm
              usuario={usuarioNormalizado}
              onSave={handleSave}
            />
          ) : (
            <>
              {usuarioNormalizado.avatar && (
                <InfoItem>
                  <img
                    src={usuarioNormalizado.avatar}
                    alt="Avatar"
                    style={{
                      width: "4rem",
                      height: "4rem",
                      borderRadius: "50%",
                    }}
                  />
                </InfoItem>
              )}

              <InfoItem>
                <strong>Nome:</strong> {usuarioNormalizado.nome || "—"}
              </InfoItem>

              <InfoItem>
                <strong>Email:</strong> {usuarioNormalizado.email}
              </InfoItem>

              <InfoItem>
                <strong>Telefone:</strong>{" "}
                {usuarioNormalizado.telefone || "Não informado"}
              </InfoItem>

              <InfoItem>
                <strong>Data nascimento:</strong>{" "}
                {usuarioNormalizado.dataNascimento
                  ? new Date(usuarioNormalizado.dataNascimento).toLocaleDateString()
                  : "Não informada"}
              </InfoItem>
            </>
          )}
        </Container>

        <Credenciais
          usuario={usuarioNormalizado}
          handleLogin={handleLogin}
        />
      </Mainperfil>

      <Footer
        usuario={usuarioNormalizado}
        handleLogout={handleLogout}
      />
    </Perfilsec>
  );
}

export default Perfil;