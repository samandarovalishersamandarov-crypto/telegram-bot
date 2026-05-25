document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.querySelector(".name").value.trim();
    const email = form.querySelector(".email").value.trim();
    const textarea = form.querySelector(".textarea").value.trim();

    // Telegram API uchun kerakli ma’lumotlar
    const token = "8720068905:AAEhz3geEGotkKmk06NQhGTlgbDHm4ZuAQY";
    const chat_id = "7290820772";
    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

    const escapeHtml = (value) =>
      value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const text = `📩 <b>Yangi ariza!</b>\n👤 Ismi: <b>${escapeHtml(
      name,
    )}</b>\n📞 Email: <b>${escapeHtml(email)}</b> 
  ✉️ Message: <b>${escapeHtml(textarea)}</b> `;
    console.log(text);

    // API orqali yuborish
    fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id,
        text,
        parse_mode: "HTML",
      }),
    })
      .then(async (response) => {
        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Arizangiz yuborildi!",
          });

          form.reset(); // Formani tozalash
        } else {
          const errorData = await response.json().catch(() => null);
          console.error("Telegram xatoligi:", errorData);
          Swal.fire({
            icon: "error",
            title: "Xatolik yuz berdi. Telegram botingizni tekshiring!",
            text: errorData?.description || "400 Bad Request",
          });
        }
      })
      .catch((error) => {
        console.error("Xatolik:", error);
        Swal.fire({
          icon: "error",
          title: "Tarmoq xatosi yuz berdi",
          text: error.message || "So‘rov yuborilmadi",
        });
      });
  });
});
