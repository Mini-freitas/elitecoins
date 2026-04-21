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
  const handleChange = (e, campo, isNova = false) => {
    const valor = e.target.value;

    if (isNova) {
      setNovaCredencial((prev) => ({ ...prev, [campo]: valor }));
    } else {
      if (editIndex === -1) return;

      const updated = [...credenciais];
      updated[editIndex][campo] = valor;
      setCredenciais(updated);
    }
  };

  // ===============================
  // ADD
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
        handleLogin(res.data.usuario); // 🔥 atualiza etapa 3
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
    try {
      await api.put(`/credenciais/${id}`, credenciais[editIndex]);
      setEditIndex(-1);
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

  return (
    <Container>
      <Header>
        <h3>Conta FIFA</h3>
      </Header>

      {/* 🔥 AVISO IMPORTANTE */}
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
        Esses dados serão usados para que nosso sistema entre na sua conta e entregue as moedas automaticamente.
      </div>

      {/* FORM */}
      {credenciais.length < 1 && (
        <FormContainer onSubmit={(e) => e.preventDefault()}>
          <Input
            placeholder="Login da conta FIFA"
            value={novaCredencial.user}
            onChange={(e) => handleChange(e, "user", true)}
          />

          <Input
            type="password"
            placeholder="Senha da conta FIFA"
            value={novaCredencial.pass}
            onChange={(e) => handleChange(e, "pass", true)}
          />

          <Button type="button" onClick={adicionar}>
            Salvar conta
          </Button>
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
          {editIndex === index ? (
            <>
              <Input
                value={cred.user}
                onChange={(e) => handleChange(e, "user")}
              />

              <Input
                type="password"
                value={cred.pass}
                onChange={(e) => handleChange(e, "pass")}
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
                <strong>Login:</strong> {cred.user}
              </InfoItem>

              <EditButton onClick={() => setEditIndex(index)}>
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