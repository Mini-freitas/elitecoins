import React, { useEffect, useState } from "react";
import api from "../../../services/api";

import {
  Container,
  Header,
  InfoItem,
  EditButton,
  DeleteButton,
  FormContainer,
  Input,
  Button,
  Card,
  ActionsRow,
  WarningBox
} from "./styles";

function Credenciais({ usuario, handleLogin }) {
  const [credenciais, setCredenciais] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const [novaCredencial, setNovaCredencial] = useState({
    user: "",
    pass: "",
  });

  const [editCredencial, setEditCredencial] = useState({
    user: "",
    pass: "",
  });

  // ===============================
  // BUSCAR
  // ===============================
  const buscarCredenciais = async () => {
    try {
      const res = await api.get(`/credenciais/${usuario.id}`);
      setCredenciais(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (usuario?.id) buscarCredenciais();
  }, [usuario]);

  // ===============================
  // HANDLES
  // ===============================
  const handleChangeNova = (e, campo) => {
    setNovaCredencial((prev) => ({
      ...prev,
      [campo]: e.target.value,
    }));
  };

  const handleChangeEdit = (e, campo) => {
    setEditCredencial((prev) => ({
      ...prev,
      [campo]: e.target.value,
    }));
  };

  // ===============================
  // ADICIONAR
  // ===============================
  const adicionar = async () => {
    if (!novaCredencial.user || !novaCredencial.pass) {
      alert("Preencha usuário e senha");
      return;
    }

    try {
      const res = await api.post("/credenciais", {
        usuarioId: usuario.id,
        user: novaCredencial.user,
        pass: novaCredencial.pass,
      });

      setNovaCredencial({ user: "", pass: "" });

      if (res.data.usuario) {
        handleLogin(res.data.usuario);
      } else {
        buscarCredenciais();
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar credencial");
    }
  };

  // ===============================
  // EDITAR
  // ===============================
  const iniciarEdicao = (index) => {
    setEditIndex(index);

    // 🔥 preenche com dados reais
    setEditCredencial({
      user: credenciais[index].user || "",
      pass: credenciais[index].pass || "",
    });
  };

  const atualizar = async (id) => {
    if (!editCredencial.user || !editCredencial.pass) {
      alert("Preencha usuário e senha");
      return;
    }

    try {
      await api.put(`/credenciais/${id}`, {
        user: editCredencial.user,
        pass: editCredencial.pass,
      });

      setEditIndex(-1);
      setEditCredencial({ user: "", pass: "" });

      buscarCredenciais();
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar");
    }
  };

  // ===============================
  // EXCLUIR
  // ===============================
  const excluir = async (id) => {
    if (!window.confirm("Excluir credencial?")) return;

    try {
      const res = await api.delete(`/credenciais/${id}`);

      if (res.data.usuario) {
        handleLogin(res.data.usuario);
      } else {
        buscarCredenciais();
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir");
    }
  };

  const formatarLogin = (login) => {
  if (!login) return "";

  // Se for email
  if (login.includes("@")) {
    const [nome, dominio] = login.split("@");

    const nomeMask =
      nome.length <= 3
        ? nome[0] + "*".repeat(nome.length - 1)
        : nome.slice(0, 3) + "*".repeat(nome.length - 3);

    return `${nomeMask}@${dominio}`;
  }

  // Se for username normal
  if (login.length <= 4) {
    return login[0] + "*".repeat(login.length - 1);
  }

  return login.slice(0, 4) + "*".repeat(login.length - 4);
};

  // ===============================
  // RENDER
  // ===============================
  return (
    <Container>
      <Header>
        <h3>Conta FIFA</h3>
      </Header>

      <WarningBox>
        ⚠️ Informe o <strong>login e senha da sua conta FIFA</strong>.
      </WarningBox>

      {/* FORM NOVA */}
      {credenciais.length < 1 && (
        <FormContainer>
          <Input
            placeholder="Login da conta FIFA"
            value={novaCredencial.user}
            onChange={(e) => handleChangeNova(e, "user")}
          />

          <Input
            type="password"
            placeholder="Senha da conta FIFA"
            value={novaCredencial.pass}
            onChange={(e) => handleChangeNova(e, "pass")}
          />

          <Button type="button" onClick={adicionar}>
            Salvar conta
          </Button>
        </FormContainer>
      )}

      {/* LISTA */}
      {credenciais.map((cred, index) => (
        <Card key={cred.id}>
          {editIndex === index ? (
            <>
              {/* INPUTS EM COLUNA */}
              <FormContainer>
                <Input
                  placeholder="Novo login"
                  value={editCredencial.user}
                  onChange={(e) => handleChangeEdit(e, "user")}
                />

                <Input
                  type="password"
                  placeholder="Nova senha"
                  value={editCredencial.pass}
                  onChange={(e) => handleChangeEdit(e, "pass")}
                />

                <Button onClick={() => atualizar(cred.id)}>
                  Salvar alterações
                </Button>

                <DeleteButton onClick={() => setEditIndex(-1)}>
                  Cancelar
                </DeleteButton>
              </FormContainer>
            </>
          ) : (
            <>
              <InfoItem>
                <strong>Conta salva</strong>
              </InfoItem>

              {/* 🔒 segurança visual */}
              <InfoItem>Login: {formatarLogin(cred.user)}</InfoItem>
              <InfoItem>Senha: ••••••••</InfoItem>

              <ActionsRow>
                <EditButton onClick={() => iniciarEdicao(index)}>
                  Editar
                </EditButton>

                <DeleteButton onClick={() => excluir(cred.id)}>
                  Remover
                </DeleteButton>
              </ActionsRow>
            </>
          )}
        </Card>
      ))}
    </Container>
  );
}

export default Credenciais;