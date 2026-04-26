import React, { useEffect, useState } from "react";
import api from "../../../services/api";

import {
  Container,
  Header,
  InfoItem,
  FormContainer,
  Input,
  Button,
  EditButton,
} from "./styles";

function Credenciais({ usuario, handleLogin }) {
  const [credenciais, setCredenciais] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const [form, setForm] = useState({
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
  // INPUT
  // ===============================
  const handleChange = (e, campo) => {
    setForm((prev) => ({
      ...prev,
      [campo]: e.target.value,
    }));
  };

  // ===============================
  // RESET FORM
  // ===============================
  const resetForm = () => {
    setForm({ user: "", pass: "" });
    setEditIndex(-1);
  };

  // ===============================
  // ADD
  // ===============================
  const adicionar = async () => {
    if (!form.user || !form.pass) {
      alert("Preencha usuário e senha");
      return;
    }

    try {
      const res = await api.post("/credenciais", {
        usuarioId: usuario.id,
        user: form.user,
        pass: form.pass,
      });

      resetForm();

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
  // UPDATE
  // ===============================
  const atualizar = async (id) => {
    if (!form.user || !form.pass) {
      alert("Preencha usuário e senha");
      return;
    }

    try {
      await api.put(`/credenciais/${id}`, {
        user: form.user,
        pass: form.pass,
      });

      resetForm();
      buscarCredenciais();
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar");
    }
  };

  // ===============================
  // DELETE
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

  // ===============================
  // EDIT MODE
  // ===============================
  const iniciarEdicao = (index) => {
    setEditIndex(index);

    // 🔐 nunca preencher (segurança)
    setForm({
      user: "",
      pass: "",
    });
  };

  // ===============================
  // RENDER
  // ===============================
  return (
    <Container>
      <Header>
        <h3>Conta FIFA</h3>
      </Header>

      {/* AVISO */}
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
        Esses dados são criptografados e usados para entrega automática.
      </div>

      {/* FORM (SERVE PRA CRIAR E EDITAR) */}
      {(credenciais.length === 0 || editIndex !== -1) && (
        <FormContainer onSubmit={(e) => e.preventDefault()}>
          <Input
            placeholder="Login da conta FIFA"
            value={form.user}
            onChange={(e) => handleChange(e, "user")}
          />

          <Input
            type="password"
            placeholder="Senha da conta FIFA"
            value={form.pass}
            onChange={(e) => handleChange(e, "pass")}
          />

          {editIndex !== -1 ? (
            <>
              <Button
                type="button"
                onClick={() => atualizar(credenciais[editIndex].id)}
              >
                Atualizar conta
              </Button>

              <Button type="button" onClick={resetForm}>
                Cancelar
              </Button>
            </>
          ) : (
            <Button type="button" onClick={adicionar}>
              Salvar conta
            </Button>
          )}
        </FormContainer>
      )}

      {/* LISTA */}
      {credenciais.map((cred, index) => (
        <div
          key={cred.id}
          style={{
            padding: 12,
            background: "#f0f0f0",
            borderRadius: 8,
            marginBottom: 10,
          }}
        >
          <InfoItem>
            <strong>Conta cadastrada</strong>
          </InfoItem>

          <InfoItem>Login: ********</InfoItem>

          <EditButton onClick={() => iniciarEdicao(index)}>
            Editar
          </EditButton>

          <EditButton onClick={() => excluir(cred.id)}>
            Remover
          </EditButton>
        </div>
      ))}
    </Container>
  );
}

export default Credenciais;