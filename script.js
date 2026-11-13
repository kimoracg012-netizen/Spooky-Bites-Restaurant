const restaurantName = "Spooky Bites";
let isOpen = true;
let customerName = "";
let mealPrice = 0;
let quantity = 1;
let total = 0;

const prices = {
    "Spider Pizza": 150,
    "Pumpkin Pasta": 180,
    "Ghost Burger": 120
};

const statusElement = document.getElementById("status");
const resultElement = document.getElementById("result");
const customerInput = document.getElementById("customer");
const mealSelect = document.getElementById("meal");
const quantityInput = document.getElementById("quantity");
const orderBtn = document.getElementById("orderBtn");
const greetingBtn = document.getElementById("greetingBtn");
const toggleStatusBtn = document.getElementById("toggleStatusBtn");

function displayStatus() {
    statusElement.textContent = isOpen ? "We are OPEN!" : "We are CLOSED!";
}

function toggleRestaurantStatus() {
    isOpen = !isOpen;
    displayStatus();
}

function generateGreeting() {
    const name = customerInput.value.trim();
    if (!name) {
        alert("Please enter your name first!");
        return;
    }
    alert(`Spooky Greetings, ${name}! Welcome to ${restaurantName}! 🎃`);
}

function placeOrder() {
    customerName = customerInput.value.trim();
    const selectedMeal = mealSelect.value;
    quantity = Number(quantityInput.value);

    if (!customerName) {
        resultElement.textContent = "Please enter your name first!";
        return;
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
        resultElement.textContent = "Please enter a valid quantity.";
        return;
    }

    if (!isOpen) {
        resultElement.textContent = "Sorry! The restaurant is currently closed.";
        return;
    }

    const confirmChoice = confirm(`Confirm order for ${quantity} x ${selectedMeal}?`);
    if (!confirmChoice) {
        resultElement.textContent = "Order process cancelled.";
        return;
    }

    mealPrice = prices[selectedMeal];
    let subtotal = mealPrice * quantity;
    let discount = subtotal >= 300 ? subtotal * 0.10 : 0;
    total = subtotal - discount;

    resultElement.innerHTML = `
        <strong>Thank you, ${customerName}!</strong><br>
        Order: ${quantity} x ${selectedMeal}(s)<br>
        Subtotal: ₱${subtotal.toFixed(2)}<br>
        ${discount > 0 ? `Discount (10%): -₱${discount.toFixed(2)}<br>` : ''}
        <strong>Final Total: ₱${total.toFixed(2)}</strong><br>
        Enjoy your spooky meal! 🎃
    `;
}

displayStatus();
orderBtn.addEventListener("click", placeOrder);
greetingBtn.addEventListener("click", generateGreeting);
toggleStatusBtn.addEventListener("click", toggleRestaurantStatus);