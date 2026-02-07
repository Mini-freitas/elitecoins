function PerfilCompletoStatus({ onEditar }) {
  return (
    <div
      style={{
        padding: 16,
        border: "1px solid #e0e0e0",
        borderRadius: 8,
        marginBottom: 16,
        background: "#fafafa",
      }}
    >
      <strong>Complete seu perfil e ganhe vouchers 🎁</strong>
      <p>
        Preencha seus dados básicos para liberar até 3 vouchers promocionais.
      </p>
      <button onClick={onEditar}>Completar perfil</button>
    </div>
  );
}

export default PerfilCompletoStatus;
