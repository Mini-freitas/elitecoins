function VoucherStatus({ usuario }) {
  const disponiveis =
    usuario.perfilEtapa - (usuario.voucherUsos || 0);

  return (
    <div
      style={{
        marginTop: 16,
        padding: 12,
        border: "1px solid #dadce0",
        borderRadius: 8,
        background: "#f8f9fa",
      }}
    >
      <strong>Seus vouchers 🎁</strong>

      <p>
        {disponiveis > 0
          ? `Você tem ${disponiveis} voucher(s) disponível(is)`
          : "Nenhum voucher disponível"}
      </p>
    </div>
  );
}

export default VoucherStatus;