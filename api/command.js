export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { command } = req.body;

    const telegramToken = '8147205077:AAESIv3tLYhWL_F2DoeLnEVADZJZ4W89rVA';
    const chatId = 1511526227; // Твой Telegram ID
    const message = `Команда с панели управления: ${command}`;

    try {
      const telegramResponse = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      });

      const data = await telegramResponse.json();

      if (!data.ok) {
        throw new Error(data.description);
      }

      res.status(200).json({ success: true, telegramResponse: data });
    } catch (error) {
      console.error("Ошибка при отправке команды:", error);
      res.status(500).json({ error: 'Ошибка при отправке команды в Telegram' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
