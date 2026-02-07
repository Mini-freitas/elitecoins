function VoucherStatus({ usuario }) {
  const disponiveis = usuario.voucherAtivo
    ? usuario.voucherMaxUsos - usuario.voucherUsos
    : 0;

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
      <strong>Voucher promocional</strong>
      <p>
        {disponiveis > 0
          ? `Você possui ${disponiveis} voucher(s) disponível(is).`
          : "Você não possui vouchers disponíveis no momento."}
      </p>
    </div>
  );
}

export default VoucherStatus;
