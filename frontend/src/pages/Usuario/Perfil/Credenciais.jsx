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
  Select,
} from "./styles";

function Credenciais({ usuario, handleLogin }) {
  const [credenciais, setCredenciais] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [novaCredencial, setNovaCredencial] = useState({
    orderID: "",
    user: "",
    pass: "",
    platform: "",
    ba: "",
    limit: "",
    sortMode: "",
    persona: "",
  });

  const platforms = ["PC", "XBOX", "PS"];

  // ===============================
  // BUSCAR CREDENCIAIS
  // ===============================
  const buscarCredenciais = async () => {
    try {
      const res = await api.get(`/credenciais/${usuario.id}`);
      setCredenciais(res.data);
    } catch (err) {
      console.error("Erro ao buscar credenciais:", err);
    }
  };

  useEffect(() => {
    if (usuario?.id) buscarCredenciais();
  }, [usuario]);

  // ===============================
  // INPUT CHANGE
  // ===============================
  const handleInputChange = (e, campo, isNova = false) => {
    const valor = e.target.value;
    if (isNova) {
      setNovaCredencial((prev) => ({ ...prev, [campo]: valor }));
    } else {
      const updated = [...credenciais];
      updated[editIndex] = { ...updated[editIndex], [campo]: valor };
      setCredenciais(updated);
    }
  };

  // ===============================
  // ADICIONAR CREDENCIAL
  // ===============================
  const adicionarCredencial = async () => {
    if (!novaCredencial.platform) {
      alert("Selecione uma plataforma.");
      return;
    }

    try {
      const res = await api.post("/credenciais", {
        ...novaCredencial,
        usuarioId: usuario.id,
      });

      // LIMPAR FORM
      setNovaCredencial({
        orderID: "",
        user: "",
        pass: "",
        platform: "",
        ba: "",
        limit: "",
        sortMode: "",
        persona: "",
      });

      // BUSCAR NOVAMENTE
      await buscarCredenciais();

      // 🔥 ATUALIZA USUÁRIO GLOBAL COMO NO PERFIL
      if (res.data.usuario) handleLogin(res.data.usuario);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Erro ao adicionar credencial");
    }
  };

  // ===============================
  // ATUALIZAR CREDENCIAL
  // ===============================
  const atualizarCredencial = async (id) => {
    try {
      const res = await api.put(`/credenciais/${id}`, credenciais[editIndex]);

      const updated = [...credenciais];
      updated[editIndex] = res.data.credencial;
      setCredenciais(updated);
      setEditIndex(-1);

      if (res.data.usuario) handleLogin(res.data.usuario);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Erro ao atualizar credencial");
    }
  };

  // ===============================
  // EXCLUIR CREDENCIAL
  // ===============================
  const excluirCredencial = async (id) => {
    if (!window.confirm("Deseja realmente excluir esta credencial?")) return;

    try {
      const res = await api.delete(`/credenciais/${id}`);
      await buscarCredenciais();

      if (res.data.usuario) handleLogin(res.data.usuario);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Erro ao excluir credencial");
    }
  };

  return (
    <Container>
      <Header>
        <h3>Minhas Credenciais</h3>
      </Header>

      {/* FORMULÁRIO DE NOVA CREDENCIAL */}
      {credenciais.length < 3 && (
        <FormContainer onSubmit={(e) => e.preventDefault()}>
          <Input
            placeholder="Order ID"
            value={novaCredencial.orderID}
            onChange={(e) => handleInputChange(e, "orderID", true)}
          />
          <Input
            placeholder="User"
            value={novaCredencial.user}
            onChange={(e) => handleInputChange(e, "user", true)}
          />
          <Input
            placeholder="Pass"
            value={novaCredencial.pass}
            onChange={(e) => handleInputChange(e, "pass", true)}
          />
          <Select
            value={novaCredencial.platform}
            onChange={(e) => handleInputChange(e, "platform", true)}
          >
            <option value="">Selecione Plataforma</option>
            {platforms.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </Select>
          <Input
            placeholder="BA"
            value={novaCredencial.ba}
            onChange={(e) => handleInputChange(e, "ba", true)}
          />
          <Button type="button" onClick={adicionarCredencial}>
            Adicionar
          </Button>
        </FormContainer>
      )}

      {/* LISTAGEM */}
      {credenciais.map((cred, index) => (
        <div
          key={cred.id}
          style={{
            marginBottom: "1rem",
            padding: "1rem",
            background: "#f0f0f0",
            borderRadius: 8,
          }}
        >
          {editIndex === index ? (
            <>
              <Input
                value={cred.orderID}
                onChange={(e) => handleInputChange(e, "orderID")}
              />
              <Input
                value={cred.user}
                onChange={(e) => handleInputChange(e, "user")}
              />
              <Input
                value={cred.pass}
                onChange={(e) => handleInputChange(e, "pass")}
              />
              <Select
                value={cred.platform}
                onChange={(e) => handleInputChange(e, "platform")}
              >
                {platforms.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </Select>
              <Input
                value={cred.ba}
                onChange={(e) => handleInputChange(e, "ba")}
              />

              <Button type="button" onClick={() => atualizarCredencial(cred.id)}>
                Salvar
              </Button>
              <Button type="button" onClick={() => setEditIndex(-1)}>
                Cancelar
              </Button>
            </>
          ) : (
            <>
              <InfoItem>
                <strong>Order ID:</strong> {cred.orderID}
              </InfoItem>
              <InfoItem>
                <strong>User:</strong> {cred.user}
              </InfoItem>
              <InfoItem>
                <strong>Plataforma:</strong> {cred.platform}
              </InfoItem>

              <EditButton type="button" onClick={() => setEditIndex(index)}>
                Editar
              </EditButton>
              <EditButton type="button" onClick={() => excluirCredencial(cred.id)}>
                Excluir
              </EditButton>
            </>
          )}
        </div>
      ))}
    </Container>
  );
}

export default Credenciais;
