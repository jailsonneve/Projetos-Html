export async function buscarAgenda() {
  // AQUI entra a Google Calendar API no backend
  // Frontend nunca acessa direto
  return [
    { id: 1, cliente: "João Silva", horario: "09:00", servico: "Corte" },
    { id: 2, cliente: "Carlos Lima", horario: "10:30", servico: "Barba" },
    { id: 3, cliente: "Marcos Souza", horario: "11:30", servico: "Corte + Barba" }
  ];
}

export async function buscarAgenda() {
  const res = await fetch("http://localhost:3333/agenda");
  return res.json();
}