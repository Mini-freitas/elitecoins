function PerfilProgresso({ etapa }) {
  const steps = [
    { label: "Conta criada", min: 1 },
    { label: "Perfil completo", min: 2 },
    { label: "Credenciais", min: 3 },
  ];

  return (
    <div style={styles.wrapper}>
      <div style={styles.track}>
        {steps.map((step, index) => {
          const active = etapa >= step.min;

          return (
            <div key={step.label} style={styles.step}>
              <div
                style={{
                  ...styles.bar,
                  background: active ? "#1a73e8" : "#e0e0e0",
                }}
              />
              <small
                style={{
                  ...styles.label,
                  color: active ? "#1a73e8" : "#6b7280",
                }}
              >
                {step.label}
              </small>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    marginBottom: 24,
    padding: 12,
    background: "#fff",
    borderRadius: 10,
    border: "1px solid #e5e7eb",
  },

  track: {
    display: "flex",
    gap: 10,
  },

  step: {
    flex: 1,
    textAlign: "center",
  },

  bar: {
    height: 6,
    borderRadius: 6,
    marginBottom: 6,
    transition: "0.3s",
  },

  label: {
    fontSize: 12,
    fontWeight: 500,
  },
};

export default PerfilProgresso;