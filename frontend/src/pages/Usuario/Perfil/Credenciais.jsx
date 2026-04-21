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
    orderID: "",
    user: "",
    pass: "",
    ba: "",
  });

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
      if (editIndex === -1) return;

      const updated = [...credenciais];
      updated[editIndex] = {
        ...updated[editIndex],
        [campo]: valor,
      };

      setCredenciais(updated);
    }
  };

  // ===============================
  // ADICIONAR
  // ===============================
  const adicionarCredencial = async () => {
    if (
      !novaCredencial.orderID ||
      !novaCredencial.user ||
      !novaCredencial.pass ||
      !novaCredencial.ba
    ) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      const res = await api.post("/credenciais", {
        ...novaCredencial,
        usuarioId: usuario.id,
      });

      // limpar form
      setNovaCredencial({
        orderID: "",
        user: "",
        pass: "",
        ba: "",
      });

      // 🔥 ATUALIZA USUÁRIO (ETAPA 3)
      if (res.data.usuario) {
        handleLogin(res.data.usuario);
      } else {
        await buscarCredenciais();
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Erro ao adicionar credencial");
    }
  };

  // ===============================
  // ATUALIZAR
  // ===============================
  const atualizarCredencial = async (id) => {
    try {
      const res = await api.put(
        `/credenciais/${id}`,
        credenciais[editIndex]
      );

      const updated = [...credenciais];
      updated[editIndex] = res.data.credencial;

      setCredenciais(updated);
      setEditIndex(-1);

      await buscarCredenciais();
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar credencial");
    }
  };

  // ===============================
  // EXCLUIR
  // ===============================
  const excluirCredencial = async (id) => {
    if (!window.confirm("Deseja excluir?")) return;

    try {
      const res = await api.delete(`/credenciais/${id}`);

      // 🔥 atualiza etapa automaticamente
      if (res.data.usuario) {
        handleLogin(res.data.usuario);
      } else {
        await buscarCredenciais();
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir credencial");
    }
  };

  return (
    <Container>
      <Header>
        <h3>Minhas Credenciais</h3>
      </Header>

      {/* FORM */}
      {credenciais.length < 3 && (
        <FormContainer onSubmit={(e) => e.preventDefault()}>
          <Input
            placeholder="Order ID"
            value={novaCredencial.orderID}
            onChange={(e) =>
              handleInputChange(e, "orderID", true)
            }
          />

          <Input
            placeholder="User"
            value={novaCredencial.user}
            onChange={(e) =>
              handleInputChange(e, "user", true)
            }
          />

          <Input
            placeholder="Pass"
            value={novaCredencial.pass}
            onChange={(e) =>
              handleInputChange(e, "pass", true)
            }
          />

          <Input
            placeholder="BA"
            value={novaCredencial.ba}
            onChange={(e) =>
              handleInputChange(e, "ba", true)
            }
          />

          <Button type="button" onClick={adicionarCredencial}>
            Adicionar
          </Button>
        </FormContainer>
      )}

      {/* LISTA */}
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
                onChange={(e) =>
                  handleInputChange(e, "orderID")
                }
              />
              <Input
                value={cred.user}
                onChange={(e) =>
                  handleInputChange(e, "user")
                }
              />
              <Input
                value={cred.pass}
                onChange={(e) =>
                  handleInputChange(e, "pass")
                }
              />
              <Input
                value={cred.ba}
                onChange={(e) =>
                  handleInputChange(e, "ba")
                }
              />

              <Button
                type="button"
                onClick={() =>
                  atualizarCredencial(cred.id)
                }
              >
                Salvar
              </Button>

              <Button
                type="button"
                onClick={() => setEditIndex(-1)}
              >
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

              <EditButton
                type="button"
                onClick={() => setEditIndex(index)}
              >
                Editar
              </EditButton>

              <EditButton
                type="button"
                onClick={() =>
                  excluirCredencial(cred.id)
                }
              >
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