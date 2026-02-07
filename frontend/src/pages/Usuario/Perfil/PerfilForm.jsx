import { useState } from "react";
import { FormContainer, Input, Button } from "./styles";

function PerfilForm({ usuario, onSave }) {
  const [nome, setNome] = useState(usuario.nome);
  const [telefone, setTelefone] = useState(usuario.telefone);
  const [dataNascimento, setDataNascimento] = useState(
    usuario.dataNascimento
      ? usuario.dataNascimento.split("T")[0]
      : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      nome,
      telefone,
      dataNascimento,
    });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Nome completo"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />

      <Input
        type="tel"
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
        Salvar Alterações
      </Button>
    </FormContainer>
  );
}

export default PerfilForm;
