import Database from "better-sqlite3";

const db = new Database("barbearia.db");

db.prepare(`
  CREATE TABLE IF NOT EXISTS vendas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente TEXT,
    servico TEXT,
    item TEXT,
    valorUnitario REAL,
    total REAL,
    data TEXT
  )
`).run();

export default db;
