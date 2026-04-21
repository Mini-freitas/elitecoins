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

  // 🔒 Carregar usuário do localStorage
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

  if (loading || !usuario) return null;

  // ✅ NORMALIZAÇÃO
  const usuarioNormalizado = {
    id: usuario.id,
    nome: usuario.nome || "",
    email: usuario.email || "",
    avatar: usuario.avatar || null,
    dataNascimento: usuario.dataNascimento || "",
    telefone: usuario.telefone || "",
    tipo: usuario.tipo || "COMUM",
    perfilEtapa: usuario.perfilEtapa ?? 1,
    voucherUsos: usuario.voucherUsos ?? 0,
  };

  // ✅ VOUCHERS CORRETOS
  const vouchersDisponiveis =
    usuarioNormalizado.perfilEtapa -
    usuarioNormalizado.voucherUsos;

  // ✅ PROGRESSO
  const progresso = useMemo(() => {
    const etapa = usuarioNormalizado.perfilEtapa;

    return {
      conta: etapa >= 1,
      perfil: etapa >= 2,
      credenciais: etapa >= 3,
      percentual: (etapa / 3) * 100,
    };
  }, [usuarioNormalizado.perfilEtapa]);

  // ✅ SALVAR PERFIL
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

          {/* 🔥 BARRA */}
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

          {/* 🔥 VOUCHERS */}
          <VoucherBox>
            <strong>Vouchers disponíveis:</strong>{" "}
            {vouchersDisponiveis}
          </VoucherBox>

          <VoucherStatus usuario={usuarioNormalizado} />

          {!progresso.perfil && (
            <CtaBox>
              <p>
                Termine de preencher seu perfil e ganhe vouchers.
              </p>
              <CompleteProfileButton onClick={() => setEditando(true)}>
                Completar perfil
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