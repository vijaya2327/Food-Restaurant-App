const menuItems = [
  {id:1,name:"Veg Biryani", price:120,img:"https://myfoodstory.com/wp-content/uploads/2020/09/Veg-Biryani-2.jpg", category:"veg", rating:5},
  {id:2,name:"Paneer Biryani", price:150,img:"https://th.bing.com/th/id/OIP.CYsB26IMe_VcvztahlPXFQHaFP?w=242&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3", category:"veg", rating:4},
  {id:3,name:"Veg Fried Rice", price:110,img:"https://th.bing.com/th/id/OIP.hJkRxJ-3iQ6fr1B1qJeaQQHaFj", category:"veg", rating:4},
  {id:4,name:"Paneer Tikka", price:160,img:"https://th.bing.com/th/id/OIP.bfaQl6Vt5aRPC053noYSOAHaEO", category:"veg", rating:4},
  {id:5,name:"Mushroom Masala", price:170,img:"https://th.bing.com/th/id/OIP.Ox0gRRpAd35akSdw91y87wHaEK?w=314&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3", category:"veg", rating:5},
  {id:6,name:"Chicken Biryani", price:200,img:"https://www.licious.in/blog/wp-content/uploads/2022/06/chicken-biryani-awadhi-01.jpg", category:"nonveg", rating:5},
  {id:7,name:"Chicken 65", price:180,img:"https://i.pinimg.com/originals/6c/ba/f9/6cbaf9733860bbecbab77bb998dcdd3a.jpg", category:"nonveg", rating:4},
  {id:8,name:"Butter Chicken", price:220,img:"https://th.bing.com/th/id/OIP.rbUq-NRk1nYiZlj-bldbCwHaJQ?w=202&h=253&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3", category:"nonveg", rating:5},
  {id:9,name:"Tandoori Chicken", price:240,img:"https://i.pinimg.com/originals/20/92/48/2092483fde63dc2c9e3f2a0038c8af1f.jpg", category:"nonveg", rating:4},
  {id:10,name:"Chicken Fried Rice", price:160,img:"https://th.bing.com/th/id/OIP.h1Ezno-rrus7ssA2MtG_twHaJ4?w=202&h=269&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3", category:"nonveg", rating:4},
  {id:11,name:"French Fries", price:90,img:"https://th.bing.com/th/id/OIP.UO9etd4dBw_xgQYIn1gqhwHaEK?w=301&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3", category:"snack", rating:4},
  {id:12,name:"Cheese Balls", price:140,img:"https://i.ndtvimg.com/i/2015-07/cheese-balls-625_625x350_81436947081.jpg", category:"snack", rating:4},
  {id:13,name:"Spring Roll", price:130,img:"https://cookifi.com/blog/wp-content/uploads/2018/03/36fd06.jpg", category:"snack", rating:4},
  {id:14,name:"Gobi Manchurian", price:120,img:"https://th.bing.com/th/id/OIP._Yn7Z7doItwJqMbH7Iw8HQHaE8?w=273&h=182&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3", category:"snack", rating:5},
  {id:15,name:"Paneer Pakora", price:150,img:"https://th.bing.com/th/id/OIP.cwXtGtHPWZFmwhDqHEXV7QHaE5?w=202&h=134&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3", category:"snack", rating:5}
];

let cart = [];
let currentCategory = "all";
const menuList = document.getElementById("menuList");

function renderMenu(items = menuItems){
  menuList.innerHTML="";
  items.forEach(i=>{
    const cartItem = cart.find(c=>c.id===i.id);
    let stars="⭐".repeat(i.rating);

    menuList.innerHTML+=`
    <div class="col-md-3 mb-4">
      <div class="menu-card">
        <img src="${i.img}">
        <div class="p-3">
          <h5>${i.name}</h5>
          <p>₹${i.price}</p>
          <p>${stars}</p>
          ${
            cartItem
            ? `<div class="qty-box">
                <button class="btn btn-sm btn-secondary" onclick="changeQty(${i.id},-1)">−</button>
                <span class="mx-2">${cartItem.qty}</span>
                <button class="btn btn-sm btn-secondary" onclick="changeQty(${i.id},1)">+</button>
              </div>`
            : `<button class="btn btn-warning" onclick="addToCart(${i.id})">Add to Cart</button>`
          }
        </div>
      </div>
    </div>`;
  });
}

function filterCategory(cat){
  currentCategory = cat;
  let filtered = cat==="all" ? menuItems : menuItems.filter(i=>i.category===cat);
  renderMenu(filtered);
}

function searchItem(){
  const query = document.getElementById("searchInput").value.toLowerCase();
  let filtered = menuItems.filter(i =>
    i.name.toLowerCase().includes(query) &&
    (currentCategory==="all" || i.category===currentCategory)
  );
  renderMenu(filtered);
}

function addToCart(id){
  const item = menuItems.find(i=>i.id===id);
  cart.push({...item, qty:1});
  updateCart();
}

function changeQty(id,val){
  const item = cart.find(i=>i.id===id);
  item.qty += val;
  if(item.qty<=0) cart = cart.filter(i=>i.id!==id);
  updateCart();
}

function updateCart(){
  document.getElementById("cartCount").innerText =
    cart.reduce((s,i)=>s+i.qty,0);
  renderMenu();
}

function openCart(){
  renderCart();
  new bootstrap.Modal(cartModal).show();
}

function renderCart(){
  const cartItems=document.getElementById("cartItems");
  const totalAmount=document.getElementById("totalAmount");
  cartItems.innerHTML="";
  let total=0;

  cart.forEach(i=>{
    total+=i.price*i.qty;
    cartItems.innerHTML+=`
      <tr>
        <td>${i.name}</td>
        <td>${i.qty}</td>
        <td>₹${i.price*i.qty}</td>
      </tr>`;
  });
  totalAmount.innerText=total;
}

function openCheckout(){
  bootstrap.Modal.getInstance(cartModal).hide();
  new bootstrap.Modal(checkoutModal).show();
}

function confirmOrder(){
  if(!address.value || !phone.value){
    alert("Please fill address & phone");
    return;
  }
  alert("✅ Order placed successfully!");
  cart=[];
  updateCart();
  bootstrap.Modal.getInstance(checkoutModal).hide();
}

renderMenu();
