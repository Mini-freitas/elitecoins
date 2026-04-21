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

function Perfil({ usuario, handleLogout, handleLogin }) {
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ===============================
  // LOAD USUARIO
  // ===============================
  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario");

    if (usuarioSalvo && !usuario) {
      handleLogin(JSON.parse(usuarioSalvo));
    }

    setLoading(false);
  }, []);

  // ===============================
  // PROTEÇÃO ROTA
  // ===============================
  useEffect(() => {
    if (!loading && !usuario) {
      navigate("/login");
    }
  }, [usuario, loading, navigate]);

  // ===============================
  // NORMALIZAÇÃO (SAFE)
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
      voucherAtivo: usuario.voucherAtivo,
      voucherUsos: usuario.voucherUsos,
      voucherMaxUsos: usuario.voucherMaxUsos,
      perfilEtapa: usuario.perfilEtapa ?? 1,
    };
  }, [usuario]);

  // ===============================
  // PROGRESSO
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

    const etapa = usuarioNormalizado.perfilEtapa;

    return {
      conta: etapa >= 1,
      perfil: etapa >= 2,
      credenciais: etapa >= 3,
      percentual: (etapa / 3) * 100,
    };
  }, [usuarioNormalizado]);

  // 🔥 AGORA SIM PODE RETORNAR
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
      console.error("Erro ao salvar perfil:", err);
      alert("Erro ao salvar perfil");
    }
  };

  const vouchersDisponiveis = usuarioNormalizado.voucherAtivo
    ? usuarioNormalizado.voucherMaxUsos - usuarioNormalizado.voucherUsos
    : 0;

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

          {/* PROGRESSO */}
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

          {/* VOUCHERS */}
          <VoucherBox>
            <strong>Vouchers disponíveis:</strong>{" "}
            {vouchersDisponiveis}
          </VoucherBox>

          {!progresso.perfil && (
            <CtaBox>
              <p>
                Complete seu perfil e ganhe vouchers 🎁
              </p>
              <CompleteProfileButton
                onClick={() => setEditando(true)}
              >
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
                <strong>Data nascimento:</strong>{" "}
                {usuarioNormalizado.dataNascimento
                  ? new Date(
                      usuarioNormalizado.dataNascimento
                    ).toLocaleDateString()
                  : "Não informada"}
              </InfoItem>
            </>
          )}
        </Container>

        {/* 🔥 CREDENCIAIS ATIVAS */}
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