import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const navigate = useNavigate();

  // 🔒 Proteção de rota
  useEffect(() => {
    if (!usuario) navigate("/login");
  }, [usuario, navigate]);

  if (!usuario) return null;

  // 🔥 USUÁRIO = FONTE ÚNICA DA VERDADE (vem do backend)
  const usuarioNormalizado = {
    id: usuario.id,
    nome: usuario.nome || "",
    email: usuario.email || "",
    avatar: usuario.avatar || null,
    dataNascimento: usuario.dataNascimento || "",
    telefone: usuario.telefone || "",
    tipo: usuario.tipo || "COMUM",
    vouchers: usuario.vouchers ?? 3,
    perfilEtapa: usuario.perfilEtapa ?? 1,
  };

  // ✅ PROGRESSO 100% BASEADO NO perfilEtapa DO BACKEND
  const progresso = useMemo(() => {
    const etapa = usuarioNormalizado.perfilEtapa;

    return {
      conta: etapa >= 1,
      perfil: etapa >= 2,
      credenciais: etapa >= 3,
      percentual: (etapa / 3) * 100,
    };
  }, [usuarioNormalizado.perfilEtapa]);

  // 💾 Salvar perfil
  const handleSave = async (dadosAtualizados) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/usuarios/${usuarioNormalizado.id}`,
        dadosAtualizados
      );

      // 🔥 Atualiza estado global + sessionStorage
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
            {usuarioNormalizado.vouchers}
          </VoucherBox>

          {/* CTA */}
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
                      objectFit: "cover",
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
                <strong>Data de nascimento:</strong>{" "}
                {usuarioNormalizado.dataNascimento
                  ? new Date(usuarioNormalizado.dataNascimento).toLocaleDateString()
                  : "Não informada"}
              </InfoItem>
            </>
          )}
        </Container>

        {/* 🔥 Credenciais DEVEM atualizar o usuário via handleLogin */}
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
