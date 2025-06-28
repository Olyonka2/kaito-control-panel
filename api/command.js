export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { command } = req.body;

    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const message = `Команда с панели управления: ${command}`;

    try {
      const telegramResponse = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
    res.status(405).json({ error: 'Метод не поддерживается' });
  }
}
