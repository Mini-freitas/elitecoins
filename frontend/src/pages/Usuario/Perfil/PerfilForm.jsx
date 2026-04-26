import { useState, useEffect } from "react";
import { FormContainer, Input, Button, DeleteButton } from "./styles";

function PerfilForm({ usuario, onSave }) {
  const [nome, setNome] = useState(usuario.nome || "");
  const [telefone, setTelefone] = useState(usuario.telefone || "");
  const [dataNascimento, setDataNascimento] = useState(
    usuario.dataNascimento ? usuario.dataNascimento.split("T")[0] : ""
  );

  // 🔥 guarda estado original para reset
  const [original, setOriginal] = useState({
    nome: usuario.nome || "",
    telefone: usuario.telefone || "",
    dataNascimento: usuario.dataNascimento
      ? usuario.dataNascimento.split("T")[0]
      : "",
  });

  // se trocar usuário, sincroniza
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
  }, [usuario]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      nome,
      telefone,
      dataNascimento,
    });

    setOriginal({ nome, telefone, dataNascimento });
  };

  // 🔴 CANCELAR ALTERAÇÃO
  const handleCancel = () => {
    setNome(original.nome);
    setTelefone(original.telefone);
    setDataNascimento(original.dataNascimento);
  };

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
        variant="ghost"
        onClick={handleCancel}
      >
        Cancelar
      </DeleteButton>
    </FormContainer>
  );
}

export default PerfilForm;