import React, { useEffect, useState } from "react";
import api from "../../../services/api";

import {
  Container,
  Header,
  InfoItem,
  EditButton,
  FormContainer,
  Input,
  Button,
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

  const iniciarEdicao = (index) => {
    setEditIndex(index);
    setEditCredencial({ user: "", pass: "" });
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

  return (
    <Container>
      <Header>
        <h3>Conta FIFA</h3>
      </Header>

      <div
        style={{
          background: "#fff3cd",
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
          fontSize: 14,
        }}
      >
        ⚠️ Informe o <strong>login e senha da sua conta FIFA</strong>.
      </div>

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

      {credenciais.map((cred, index) => (
        <div
          key={cred.id}
          style={{
            padding: 12,
            background: "#f0f0f0",
            borderRadius: 8,
          }}
        >
          {editIndex === index ? (
            <>
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
                Salvar
              </Button>

              <Button onClick={() => setEditIndex(-1)}>
                Cancelar
              </Button>
            </>
          ) : (
            <>
              <InfoItem>
                <strong>Conta salva</strong>
              </InfoItem>

              <InfoItem>Login:{}</InfoItem>

              <EditButton onClick={() => iniciarEdicao(index)}>
                Editar
              </EditButton>

              <EditButton onClick={() => excluir(cred.id)}>
                Remover
              </EditButton>
            </>
          )}
        </div>
      ))}
    </Container>
  );
}

export default Credenciais;