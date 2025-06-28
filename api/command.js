export default function handler(req, res) {
  if (req.method === 'POST') {
    const { command } = req.body;

    console.log("Получена команда:", command);

    // Здесь будет логика отправки команды в Telegram-бота
    // Пока просто тестовый ответ:
    res.status(200).json({ success: true, received: command });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
