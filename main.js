const summaryDiv = document.getElementById("cartSummary");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

cart.forEach(item => {
  total += item.price * item.qty;

  summaryDiv.innerHTML += `
    <div class="item">
      <span>${item.name} x${item.qty}</span>
      <span>${item.price * item.qty}₸</span>
    </div>
  `;
});

summaryDiv.innerHTML += `
  <div class="total">
    <span>Итого:</span>
    <span>${total}₸</span>
  </div>
`;

function sendOrder() {

  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;

  if (!name || !phone || !address) {
    alert("Заполни все поля!");
    return;
  }

  let message = "🛒 Новый заказ:\n\n";

  cart.forEach(item => {
    message += `${item.name} x${item.qty} = ${item.price * item.qty}₸\n`;
  });

  message += `\nИтого: ${total}₸\n\n`;
  message += `Имя: ${name}\nТелефон: ${phone}\nАдрес: ${address}\n💳 Оплата: ${payment}\n`;

  let token = "8678094818:AAHl3pLqSl2OCnlX6UdpwFHiPcbza-fxXpM";
  let chat_id = "7666224126";

  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      chat_id,
      text:message
    })
  })
  .then(()=>{
    document.getElementById("successMsg").innerText = "✅ Заказ отправлен!";
    localStorage.removeItem("cart");
  })
  .catch(()=>{
    alert("Ошибка!");
  });
}
let payment = document.querySelector('input[name="payment"]:checked').value;
