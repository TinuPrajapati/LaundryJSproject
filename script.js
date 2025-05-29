const Price = document.getElementById('cart-total').innerText;
let totalPrice = 0;
  let itemCount = 0;
  const cartList = document.getElementById('cart-list');
  const cartTotal = document.getElementById('cart-total');
  const addedItems = new Map();
  
  

  document.querySelectorAll('.add-item').forEach(button => {
    button.addEventListener('click', (event) => {
      const btn = event.target;
      const listItem = btn.closest('li');
      if (!listItem) return;

      const service = listItem.firstChild.textContent.trim();
      const priceText = listItem.querySelector('.price').textContent.trim();
      const price = parseFloat(priceText.replace('$', ''));

      if (addedItems.has(service)) {
        // Remove item
        const cartItem = addedItems.get(service);
        cartList.removeChild(cartItem);
        addedItems.delete(service);
        totalPrice -= price;
        btn.textContent = "Add item";
        itemCount--;
      } else {
        // Add item
        itemCount++;
        const cartItem = document.createElement('div');
        cartItem.innerHTML = ` <p>${itemCount}</p> <p>${service} </p> $${price.toFixed(2)}`;
        cartItem.classList.add("added-items")
        cartList.appendChild(cartItem);
        addedItems.set(service, cartItem);
        totalPrice += price;
        btn.textContent = "Remove item";
      }

      cartTotal.innerHTML = `<p>${totalPrice.toFixed(2)}</p>`;
    });
  });
  
  const mssg = document.getElementById('mssg')
  const submit = document.querySelector('.book-now')
  submit.addEventListener('click', (e)=>{
    e.preventDefault()
    if(itemCount === 0){
      alert("Please add items to the cart")
      return
    }
    console.log("clicked")
    emails()
    mssg.style.display = "block"
  })

  function emails(){
    const template = {
      name: document.getElementById("name").value,
      email: document.querySelector('#email-id').value,
      phone: document.querySelector("#phone-no").value
    }
    emailjs.send(service_agyio3d,"template_8ujd6up",template).then(()=> alert("email sent!").catch(()=> alert("email not send!")))
  }
