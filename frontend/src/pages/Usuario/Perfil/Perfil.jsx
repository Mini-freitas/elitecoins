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
// import Credenciais from "./Credenciais"; // 🔥 desativado por segurança

function Perfil({ usuario, handleLogout, handleLogin }) {
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // 🔒 Carrega usuário do localStorage
  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario");

    if (usuarioSalvo && !usuario) {
      handleLogin(JSON.parse(usuarioSalvo));
    }

    setLoading(false);
  }, []);

  // 🔒 Proteção de rota
  useEffect(() => {
    if (!loading && !usuario) {
      navigate("/login");
    }
  }, [usuario, loading, navigate]);

  // ✅ NORMALIZAÇÃO SEGURA (ANTES DO RETURN)
  const usuarioNormalizado = usuario
    ? {
        id: usuario.id,
        nome: usuario.nome || "",
        email: usuario.email || "",
        avatar: usuario.avatar || null,
        dataNascimento: usuario.dataNascimento || "",
        telefone: usuario.telefone || "",
        tipo: usuario.tipo || "COMUM",
        vouchers: usuario.vouchers ?? 3,
        perfilEtapa: usuario.perfilEtapa ?? 1,
      }
    : null;

  // ✅ HOOK SEM QUEBRAR ORDEM
  const progresso = useMemo(() => {
    if (!usuarioNormalizado) {
      return {
        conta: false,
        perfil: false,
        credenciais: false,
        percentual: 0,
      };
    }

    const etapa = usuarioNormalizado.perfilEtapa;

    return {
      conta: etapa >= 1,
      perfil: etapa >= 2,
      credenciais: etapa >= 3,
      percentual: (etapa / 3) * 100,
    };
  }, [usuarioNormalizado?.perfilEtapa]);

  // 🔥 AGORA PODE RETORNAR
  if (loading || !usuario) return null;

  const handleSave = async (dadosAtualizados) => {
    try {
      const res = await api.put(
        `/usuarios/${usuarioNormalizado.id}`,
        dadosAtualizados
      );

      handleLogin(res.data);
      setEditando(false);
    } catch (err) {
      console.error("Erro ao salvar perfil:", err);
      alert("Erro ao salvar perfil");
    }
  };

  return (
    <Perfilsec>
      <HeaderPrincipal
        usuario={usuarioNormalizado}
        handleLogout={handleLogout}
      />

      <Mainperfil>
        <Container>
          <Header>
            <h2>Meu Perfil</h2>
            <EditButton
              $incomplete={!progresso.perfil}
              onClick={() => setEditando(!editando)}
            >
              {editando ? "Cancelar" : "Editar Perfil"}
            </EditButton>
          </Header>

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

          <VoucherBox>
            <strong>Vouchers disponíveis:</strong>{" "}
            {usuarioNormalizado.vouchers}
          </VoucherBox>

          {!progresso.perfil && (
            <CtaBox>
              <p>
                Termine de preencher seu perfil e ganhe vouchers para suas
                primeiras compras.
              </p>
              <CompleteProfileButton onClick={() => setEditando(true)}>
                Completar perfil agora
              </CompleteProfileButton>
            </CtaBox>
          )}

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
                      objectFit: "cover",
                    }}
                  />
                </InfoItem>
              )}

              <InfoItem>
                <strong>Nome:</strong>{" "}
                {usuarioNormalizado.nome || "—"}
              </InfoItem>

              <InfoItem>
                <strong>Email:</strong>{" "}
                {usuarioNormalizado.email}
              </InfoItem>

              <InfoItem>
                <strong>Telefone:</strong>{" "}
                {usuarioNormalizado.telefone || "Não informado"}
              </InfoItem>

              <InfoItem>
                <strong>Data de nascimento:</strong>{" "}
                {usuarioNormalizado.dataNascimento
                  ? new Date(
                      usuarioNormalizado.dataNascimento
                    ).toLocaleDateString()
                  : "Não informada"}
              </InfoItem>
            </>
          )}
        </Container>

        {/* 🔥 REATIVAR DEPOIS SE QUISER */}
        {/* 
        <Credenciais
          usuario={usuarioNormalizado}
          handleLogin={handleLogin}
        />
        */}
      </Mainperfil>

      <Footer
        usuario={usuarioNormalizado}
        handleLogout={handleLogout}
      />
    </Perfilsec>
  );
}

export default Perfil;