export default function Vendas({ vendas }) {
  return (
    <div style={{ background: "#1e293b", padding: 16, borderRadius: 12 }}>
      <h2>Vendas</h2>

      {vendas.length === 0 && <p>Nenhuma venda ainda</p>}

      {vendas.map((v, i) => (
        <div key={i} style={{ borderBottom: "1px solid #334155", marginBottom: 8 }}>
          <p><b>Cliente:</b> {v.cliente}</p>
          <p><b>Serviço:</b> {v.servico}</p>
          <p><b>Item:</b> {v.item}</p>
          <p><b>Total:</b> R$ {v.total}</p>
        </div>
      ))}
    </div>
  );
}
