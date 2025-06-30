export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Método não permitido' });
    }
  
    const { script } = req.body;
  
    const response = await fetch('https://api.jdoodle.com/v1/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        script,
        language: 'java',
        versionIndex: '3',
        clientId: '5172b256f6b2e41bf898e7d42f8fc823',
        clientSecret: '896047a3c73090bc9b33817226fa2b08e7f6001a588e57342b5b0d0d1164913b'
      })
    });
  
    const data = await response.json();
    res.status(200).json(data);
  }
  