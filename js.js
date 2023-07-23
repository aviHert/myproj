
let cart = []

const cartElement = document.getElementById('cart');

const productsEL = document.querySelectorAll('.product')
console.log(productsEL);
productsEL.forEach((el) => el.addEventListener('click',(e) => {
    let name = e.currentTarget.children[0].getAttribute("data-name")
    let price = e.currentTarget.children[1].getAttribute("data-price")
    addToCart(name, price);
})
)

function addToCart(name, price){
    // לבדוק אם המוצר קיים בעגלה
    // במידה וקיים
    // למצוא את המיקום שלו בעגלה 
    // לעדכן את, הכמות ב 1
    // במידה ולא קיים
    // יש להוסי; את המוצר 
    
    let isProduct = cart.some((product) => product.name === name)
    if (isProduct){
        index = cart.findIndex(product => product.name === name);
        cart[index].quantity++

    } else {
        cart.push({name, price, quantity : 1})
    }
    
    localStorage.setItem('cart', JSON.stringify({cart}));
    console.log(cart);

    renderCart(cart)
}

function renderCart(cart) {
    cartElement.innerHTML = ""
    cart.forEach((product) => {
        const h3 = document.createElement('h3');
        cartElement.appendChild(h3);
        h3.innerHTML = `${product.name}: ${product.price} - ${product.quantity}`;
        //let button = document.createElement('button');
        //button.addEventListener('click', deleteFromCart)
       // cartElement.appendChild(button);
    })
    const totalPriceElement = document.createElement('h3');
    document.body.appendChild(cartElement);
    //const totalPrice = calculateCart()
    //totalPriceElement.innerHTML = `Total Price: ${totalPrice} ils`;


    //textBox.style.backgroundColor = 'darkblue';

}

function init(){
    cartStorage = localStorage.getItem('cart') || [];
    cart = JSON.parse(cartStorage).cart
    renderCart(cart)
}
init()