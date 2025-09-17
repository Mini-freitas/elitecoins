import { useState } from "react";
import OrderStatus from "./OrderStatus";

function OrderForm() {
  const [form, setForm] = useState({
    customerName: "",
    user: "",
    pass: "",
    ba: "",
    ba2: "",
    ba3: "",
    ba4: "",
    ba5: "",
    platform: "XB",
    amount: ""
  });

  const [orderID, setOrderID] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // resetar erro
    setOrderID(null); // resetar orderID antigo

    try {
      const res = await fetch("http://localhost:3000/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.orderID) {
        setOrderID(data.orderID); // salva o orderID para consultar status
      } else {
        setError("Não foi possível criar o pedido");
      }
    } catch (err) {
      setError("Erro ao criar pedido: " + err.message);
    }
  };

  return (
    <div>
      <h2>Criar Pedido de Coins</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        <input name="customerName" placeholder="Nome do cliente" onChange={handleChange} required />
        <input name="user" placeholder="Email FUT" onChange={handleChange} required />
        <input type="password" name="pass" placeholder="Senha FUT" onChange={handleChange} required />
        <input name="ba" placeholder="Backup Code 1" onChange={handleChange} required />
        <input name="ba2" placeholder="Backup Code 2" onChange={handleChange} />
        <input name="ba3" placeholder="Backup Code 3" onChange={handleChange} />
        <input name="ba4" placeholder="Backup Code 4" onChange={handleChange} />
        <input name="ba5" placeholder="Backup Code 5" onChange={handleChange} />

        <select name="platform" onChange={handleChange} defaultValue="XB">
          <option value="XB">Xbox</option>
          <option value="PS">PlayStation</option>
          <option value="PC">PC</option>
        </select>

        <input type="number" name="amount" placeholder="Quantidade em K (ex: 1000 = 1kk)" onChange={handleChange} required />

        <button type="submit">Enviar Pedido</button>
      </form>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      {orderID && (
        <div style={{ marginTop: "20px" }}>
          <h3>Status do Pedido</h3>
          <OrderStatus orderID={orderID} />
        </div>
      )}
    </div>
  );
}

export default OrderForm;
