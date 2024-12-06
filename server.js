const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios'); // Para enviar a solicitação ao Webhook

const app = express();
const port = 3000;

// Substitua pela URL do Webhook do Discord que você gerou
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1308882984740323488/-ulOC0GlJ_jnPQk7eu4w0-NOzqBRllzWN_Whe7WV77Ymr6_A3mgp7L98F_eDKgV7kV2A';

app.use(bodyParser.json());

app.post('/notificacao', async (req, res) => {
  const notification = req.body;
  console.log('Notificação recebida:', notification);

  const discordMessage = {
    content: '📢 **Nova Notificação do Mercado Livre**',
    embeds: [
      {
        title: 'Detalhes da Notificação',
        description: 'Notificação recebida:',
        fields: Object.entries(notification).map(([key, value]) => ({
          name: key,
          value: typeof value === 'string' ? value : JSON.stringify(value, null, 2),
          inline: false,
        })),
        color: 5814783,
      },
    ],
  };

  try {
    await axios.post(DISCORD_WEBHOOK_URL, discordMessage);
    console.log('Mensagem enviada para o Discord com sucesso');
    res.status(200).send('Notificação recebida e mensagem enviada ao Discord com sucesso');
  } catch (error) {
    console.error('Erro ao enviar mensagem para o Discord:', error.message);
    res.status(500).send('Erro ao enviar mensagem para o Discord');
  }
});

app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});
