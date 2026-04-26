import React, { useEffect, useState } from "react";
import api from "../../../services/api";

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
  // INPUTS
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
  // EDIT
  // ===============================
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
  // STYLES INLINE
  // ===============================
  const container = {
    width: "60%",
    maxWidth: "90%",
    padding: 20,
    background: "#f9f9f9",
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  };

  const input = {
    padding: 8,
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 14,
  };

  const button = {
    backgroundColor: "#00b050",
    color: "#fff",
    border: "none",
    padding: 12,
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: "bold",
  };

  const editButton = {
    padding: "6px 12px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    background: "#e0e0e0",
    marginRight: 8,
  };

  // ===============================
  // RENDER
  // ===============================
  return (
    <div style={container}>
      <h3>Conta FIFA</h3>

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

      {/* FORM */}
      {credenciais.length < 1 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <input
            style={input}
            placeholder="Login da conta FIFA"
            value={novaCredencial.user}
            onChange={(e) => handleChangeNova(e, "user")}
          />

          <input
            style={input}
            type="password"
            placeholder="Senha da conta FIFA"
            value={novaCredencial.pass}
            onChange={(e) => handleChangeNova(e, "pass")}
          />

          <button style={button} onClick={adicionar}>
            Salvar conta
          </button>
        </div>
      )}

      {/* LISTA */}
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
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <input
                style={input}
                placeholder="Novo login"
                value={editCredencial.user}
                onChange={(e) => handleChangeEdit(e, "user")}
              />

              <input
                style={input}
                type="password"
                placeholder="Nova senha"
                value={editCredencial.pass}
                onChange={(e) => handleChangeEdit(e, "pass")}
              />

              <button style={button} onClick={() => atualizar(cred.id)}>
                Salvar
              </button>

              <button style={button} onClick={() => setEditIndex(-1)}>
                Cancelar
              </button>
            </div>
          ) : (
            <>
              <p><strong>Conta salva</strong></p>
              <p>Login: ********</p>

              <button style={editButton} onClick={() => iniciarEdicao(index)}>
                Editar
              </button>

              <button style={editButton} onClick={() => excluir(cred.id)}>
                Remover
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Credenciais;