import { useEffect, useState } from "react";

export default function Agenda({ onFinalizar }) {
  const [agenda, setAgenda] = useState([]);

  useEffect(() => {
    setAgenda([
      { id: 1, cliente: "João Silva", horario: "09:00", servico: "Corte" },
      { id: 2, cliente: "Carlos Lima", horario: "10:30", servico: "Barba" }
    ]);
  }, []);

  function finalizar(a) {
    onFinalizar({
      cliente: a.cliente,
      servico: a.servico,
      item: "Pomada Modeladora",
      valorUnitario: 25,
      total: 25
    });
    
  }

  return (
    <div style={{ background: "#1e293b", padding: 16, borderRadius: 12 }}>
      <h2>Agenda do Dia</h2>
      {agenda.map(a => (
        <div key={a.id} style={{ marginBottom: 12 }}>
          <strong>{a.horario} - {a.cliente}</strong>
          <div>{a.servico}</div>
          <button onClick={() => finalizar(a)}>Finalizar</button>
        </div>
      ))}
    </div>
  );
}
