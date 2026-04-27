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
  VoucherBox,
  CtaBox,
  CompleteProfileButton,
} from "./styles";

import PerfilForm from "./PerfilForm";
import HeaderPrincipal from "../../../components/Header/HeaderPrincipal";
import Footer from "../../../components/Footer/Footer";
import Credenciais from "./Credenciais";
import VoucherStatus from "./VoucherStatus";
import PerfilProgresso from "./PerfilProgresso";

function Perfil({ usuario, handleLogout, handleLogin }) {
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ===============================
  // LOAD LOCAL
  // ===============================
  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario");

    if (usuarioSalvo && !usuario) {
      handleLogin(JSON.parse(usuarioSalvo));
    }

    setLoading(false);
  }, []);

  // ===============================
  // PROTEÇÃO
  // ===============================
  useEffect(() => {
    if (!loading && !usuario) {
      navigate("/login");
    }
  }, [usuario, loading, navigate]);

  // ===============================
  // NORMALIZAÇÃO SEGURA
  // ===============================
  const usuarioNormalizado = useMemo(() => {
    if (!usuario) return null;

    return {
      ...usuario,
      nome: usuario.nome || "",
      email: usuario.email || "",
      avatar: usuario.avatar || null,
      telefone: usuario.telefone || "",
      dataNascimento: usuario.dataNascimento || "",
      tipo: usuario.tipo || "COMUM",

      perfilEtapa: Number(usuario.perfilEtapa || 1),

      credenciais: usuario.credenciais || [],
    };
  }, [usuario]);

  // ===============================
  // PROGRESSO UI
  // ===============================
  const progresso = useMemo(() => {
    if (!usuarioNormalizado) {
      return { perfil: false };
    }

    const perfilCompleto =
      usuarioNormalizado.nome &&
      usuarioNormalizado.telefone &&
      usuarioNormalizado.dataNascimento;

    const temCredenciais = usuarioNormalizado.credenciais.length > 0;

    return {
      perfil: perfilCompleto,
      credenciais: temCredenciais,
    };
  }, [usuarioNormalizado]);

  // ===============================
  // VOUCHERS (REGRA ÚNICA)
  // ===============================
  const vouchersDisponiveis = useMemo(() => {
    if (!usuarioNormalizado) return 0;

    let vouchers = 1; // conta criada

    if (usuarioNormalizado.perfilEtapa >= 2) vouchers += 1;
    if (usuarioNormalizado.perfilEtapa >= 3) vouchers += 1;

    return vouchers;
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
              onClick={() => setEditando(!editando)}
            >
              {editando ? "Cancelar" : "Editar Perfil"}
            </EditButton>
          </Header>

          {/* PROGRESSO (ÚNICO) */}
          <PerfilProgresso etapa={usuarioNormalizado.perfilEtapa} />

          {/* VOUCHERS */}
          <VoucherBox>
            <VoucherStatus
              usuario={{
                ...usuarioNormalizado,
                vouchersDisponiveis,
              }}
            />
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