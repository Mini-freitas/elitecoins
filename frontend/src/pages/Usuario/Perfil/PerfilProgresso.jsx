function PerfilProgresso({ etapa }) {
  const etapas = ["Conta criada", "Perfil completo", "Credenciais"];

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", gap: 8 }}>
        {etapas.map((label, index) => {
          const ativa = etapa >= index + 1;
          return (
            <div key={label} style={{ flex: 1 }}>
              <div
                style={{
                  height: 6,
                  borderRadius: 4,
                  background: ativa ? "#1a73e8" : "#dadce0",
                }}
              />
              <small style={{ color: ativa ? "#1a73e8" : "#5f6368" }}>
                {label}
              </small>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PerfilProgresso;
