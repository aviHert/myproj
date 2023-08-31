let cart = [];
const cartElement = document.getElementById('cart');
const productsEL = document.querySelectorAll('.product');

productsEL.forEach((el) => el.addEventListener('click', (e) => {
    let name = e.currentTarget.children[0].getAttribute("data-name");
    let price = e.currentTarget.children[1].getAttribute("data-price");
    addToCart(name, price);
}));

function addToCart(name, price) {
    let isProduct = cart.some((product) => product.name === name);
    if (isProduct) {
        index = cart.findIndex(product => product.name === name);
        cart[index].quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify({ cart }));
    renderCart(cart);
}

function renderCart(cart) {
    cartElement.innerHTML = "";

    cart.forEach((product) => {
        const h3 = document.createElement('h3');
        cartElement.appendChild(h3);
        h3.innerHTML = `${product.name}: ${product.price} - ${product.quantity}`;
    });

    const totalPriceElement = document.createElement('h3');
    totalPriceElement.innerHTML = `Total Price: ${calculateTotalPrice(cart)} ils`;
    cartElement.appendChild(totalPriceElement);

    const cleanButton = document.createElement('button');
    cleanButton.innerHTML = 'Clean Cart';
    cleanButton.addEventListener('click', cleanCart);
    cartElement.appendChild(cleanButton);
}

function calculateTotalPrice(cart) {
    let totalPrice = 0;
    cart.forEach((product) => {
        totalPrice += product.price * product.quantity;
    });
    return totalPrice;
}

function cleanCart() {
    cart = [];
    localStorage.removeItem('cart');
    renderCart(cart);
}

function init() {
    cartStorage = localStorage.getItem('cart') || [];
    cart = JSON.parse(cartStorage).cart;
    renderCart(cart);
}
init();