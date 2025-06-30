import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const clientId = '5172b256f6b2e41bf898e7d42f8fc823';
const clientSecret = '896047a3c73090bc9b33817226fa2b08e7f6001a588e57342b5b0d0d1164913b';

app.get('/', (req, res) => {
  res.send('Servidor Proxy para execução de Java está rodando!');
});

app.post('/run-java', async (req, res) => {
  try {
    const response = await fetch('https://api.jdoodle.com/v1/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...req.body,
        language: 'java',
        versionIndex: '3',
        clientId,
        clientSecret
      })
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(500).json({ error: 'Erro ao chamar JDoodle: ' + text });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Erro no proxy:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('✅ Proxy rodando em http://localhost:3000');
});
