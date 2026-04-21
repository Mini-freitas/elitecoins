import { useState } from "react";

function PerfilForm({ usuario, onSave }) {
  const [nome, setNome] = useState(usuario.nome || "");
  const [telefone, setTelefone] = useState(usuario.telefone || "");
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
    <form onSubmit={handleSubmit}>
      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />

      <input
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
        required
      />

      <input
        type="date"
        value={dataNascimento}
        onChange={(e) => setDataNascimento(e.target.value)}
        required
      />

      <button type="submit">Salvar</button>
    </form>
  );
}

export default PerfilForm;