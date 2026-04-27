import React from "react";

function VoucherStatus({ usuario }) {
  if (!usuario) return null;

  const vouchers = usuario.vouchersDisponiveis ?? 0;

  const hasVouchers = vouchers > 0;

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.title}>Vouchers disponíveis</div>
      </div>

      <div style={styles.content}>
        <div style={styles.badgeWrapper}>
          <div
            style={{
              ...styles.badge,
              backgroundColor: hasVouchers ? "#e8f5e9" : "#f3f4f6",
              color: hasVouchers ? "#1b5e20" : "#6b7280",
            }}
          >
            {vouchers}
          </div>
        </div>

        <div style={styles.text}>
          {hasVouchers
            ? "Você possui vouchers ativos na sua conta"
            : "Nenhum voucher disponível no momento"}
        </div>

        {hasVouchers && (
          <div style={styles.subtext}>
            Use seus vouchers para benefícios dentro da plataforma
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    background: "#ffffff",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  title: {
    fontSize: 14,
    fontWeight: 600,
    color: "#111827",
  },

  content: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  badgeWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  badge: {
    width: 42,
    height: 42,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 16,
  },

  text: {
    fontSize: 13,
    fontWeight: 500,
    color: "#374151",
  },

  subtext: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
};

export default VoucherStatus;