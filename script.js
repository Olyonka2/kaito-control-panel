document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("sendCommand");

  if (button) {
    button.addEventListener("click", async function () {
      const command = document.getElementById("commandInput").value;

      try {
        const response = await fetch("/api/command", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ command }),
        });

        const result = await response.json();
        console.log("Ответ от сервера:", result);
        alert("Команда отправлена! ✅");
      } catch (error) {
        console.error("Ошибка при отправке команды:", error);
        alert("Что-то пошло не так 😢");
      }
    });
  }
});
