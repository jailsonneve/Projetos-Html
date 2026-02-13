import { useState } from "react";
import Agenda from "./components/Agenda";
import Vendas from "./components/Vendas";

export default function App() {
  const [vendas, setVendas] = useState([]);

  function registrarVenda(venda) {
    setVendas(prev => [...prev, venda]);
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      color: "#fff",
      padding: "24px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "24px"
    }}>
      <Agenda onFinalizar={registrarVenda} />
      <Vendas vendas={vendas} />
    </div>
  );
}
