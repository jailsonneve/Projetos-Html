import express from "express";
import cors from "cors";
import { google } from "googleapis";
import db from "./database.js";

const app = express();
app.use(cors());
app.use(express.json());

// CONFIGURAÇÃO GOOGLE CALENDAR
const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json", // arquivo da conta de serviço
  scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
});

const calendar = google.calendar({ version: "v3", auth });

app.get("/agenda", async (req, res) => {
  try {
    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });

    const eventos = response.data.items.map(e => ({
      cliente: e.summary,
      horario: e.start.dateTime || e.start.date,
      servico: e.description || "Serviço não informado",
    }));

    res.json(eventos);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar agenda" });
  }
});

app.post("/vendas", (req, res) => {
  const { cliente, servico, item, valorUnitario, total } = req.body;

  db.prepare(`
    INSERT INTO vendas (cliente, servico, item, valorUnitario, total, data)
    VALUES (?, ?, ?, ?, ?, datetime('now'))
  `).run(cliente, servico, item, valorUnitario, total);

  res.json({ ok: true });
});

app.get("/vendas", (req, res) => {
  const vendas = db.prepare(
    "SELECT * FROM vendas ORDER BY id DESC"
  ).all();

  res.json(vendas);
});

app.listen(3333, () => console.log("Backend rodando na porta 3333"));