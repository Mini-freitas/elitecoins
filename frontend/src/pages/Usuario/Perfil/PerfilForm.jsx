import { useState, useEffect } from "react";
import { FormContainer, Input, Button, DeleteButton } from "./styles";

function PerfilForm({ usuario, onSave, onCancel }) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  const [original, setOriginal] = useState({
    nome: "",
    telefone: "",
    dataNascimento: "",
  });

  // ===============================
  // SINCRONIZA COM USUÁRIO
  // ===============================
  useEffect(() => {
    const base = {
      nome: usuario.nome || "",
      telefone: usuario.telefone || "",
      dataNascimento: usuario.dataNascimento
        ? usuario.dataNascimento.split("T")[0]
        : "",
    };

    setNome(base.nome);
    setTelefone(base.telefone);
    setDataNascimento(base.dataNascimento);
    setOriginal(base);
  }, [usuario.id]);

  // ===============================
  // SALVAR
  // ===============================
  const handleSubmit = (e) => {
    e.preventDefault();

    const dados = {
      nome,
      telefone,
      dataNascimento,
    };

    onSave(dados);

    setOriginal(dados);
  };

  // ===============================
  // CANCELAR (FECHA FORM)
  // ===============================
  const handleCancel = () => {
    setNome(original.nome);
    setTelefone(original.telefone);
    setDataNascimento(original.dataNascimento);

    // 🔥 fecha o form no componente pai
    if (onCancel) onCancel();
  };

  // ===============================
  // RENDER
  // ===============================
  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />

      <Input
        placeholder="Telefone"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
        required
      />

      <Input
        type="date"
        value={dataNascimento}
        onChange={(e) => setDataNascimento(e.target.value)}
        required
      />

      <Button type="submit">
        Salvar alterações
      </Button>

      <DeleteButton
        type="button"
        onClick={handleCancel}
      >
        Voltar
      </DeleteButton>
    </FormContainer>
  );
}

export default PerfilForm;