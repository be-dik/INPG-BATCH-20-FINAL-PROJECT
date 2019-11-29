// POPUP PAGE
document.getElementById("button").addEventListener("click",function(){

    document.querySelector(".popup").style.display = "flex";

});

document.getElementById("keluar").addEventListener("click",function(){

    document.querySelector(".popup").style.display = "none";
    document.querySelector(".button").style.display= "none";
    document.querySelector(".allintro").style.display= "flex";
});

// List menu click able 
document.getElementById("g1").addEventListener("click", function(){
   
    document.querySelector(".isiBelanja").style.display ="flex";
    
    document.querySelector(".allintro").style.display ="none";
});
document.getElementById("g2").addEventListener("click", function(){

    document.querySelector(".gambarDompet").add = 
    alert("Fitur Segera Release dude !")
});
document.getElementById("g3").addEventListener("click", function(){
    document.querySelector(".allintro").style.display = "flex";
    document.querySelector(".isiBelanja").style.display ="none"
    document.querySelector(".button").style.display ="none"
 
});




// LOGIN PAGE
var akunOrang = [
    {
     username: "Dika",
     password: "12",
    },
    {
     username: "jono",
     password: "wa",
    }
]
function getValue(){
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
   

    for(i=0; i<akunOrang.length; i++){
        if(username == akunOrang[i].username && password == akunOrang[i].password){
            alert('Selamat Datang ' + username)
            var akunPro = document.getElementById("userDompet");
            akunPro.innerHTML = ("Hai " + username + ( ' !'))
        }
        return;
    }
    alert('Username atau Password Salah');
}

// #####################################
var products = {
    1 : {
      name : "Minyak Makan",
      desc : "Minyak Bimoli merupakan minyak makan berkualitas yang dapat menggoreng makanan",
      img : "minyakmakan.png",
      price : 8000
    },
    2 : {
      name : "Beras",
      desc : "Bersikap lah seperti beras yang semakin berisi semakin merunduk",
      img : "beras.png",
      price : 12000
    },
    3 : {
      name : "Sendal",
      desc : "Sendal adalah kirim ke semua (SEND ALL)",
      img : "sendal.png",
      price : 7000
    },
    4 : {
      name : "Kaos Kaki",
      desc : "Lindungi Kaki Indah mu",
      img : "kaoskaki.png",
      price : 25000
    }
  };
  
  window.addEventListener("load", function(){
    var container = document.getElementById("cart-products"),
        item = [], part = [];
    for ( i in products) {
      item = document.createElement("div");
      item.classList.add("p-item");
  
      // Product Image
      part = document.createElement("img");
      part.src = products[i]['img'];
      part.classList.add("p-img");
      item.appendChild(part);
  
      // Product Name
      part = document.createElement("div");
      part.innerHTML = products[i]['name'];
      part.classList.add("p-name");
      item.appendChild(part);
  
      // Product Price
      part = document.createElement("div");
      part.innerHTML = "Rp." + products[i]['price'];
      part.classList.add("p-price");
      item.appendChild(part);
  
      // Product Description
      part = document.createElement("div");
      part.innerHTML = products[i]['desc'];
      part.classList.add("p-desc");
      item.appendChild(part);
  
      // Add to cart
      part = document.createElement("input");
      part.type = "button";
      part.value = "Masukin Keranjang";
      part.classList.add("p-add");
      part.onclick = cart.add;
      part.dataset.id = i;
      item.appendChild(part);
  
      container.appendChild(item);
    }
  });
  
  var cart = {
    data : [],  
  
    load : function(){
    // load() : load previous shopping cart
  
      cart.data = localStorage.getItem("cart");
      if (cart.data == null) { cart.data = {}; }
      else { cart.data = JSON.parse(cart.data); }
    },
  
    save : function(){
  
      localStorage.setItem("cart", JSON.stringify(cart.data));
    },
  
    /* [C2] CART ACTIONS */
    add : function(){
    // add() : add selected item to cart
  
      // Update current cart
      if (cart.data[this.dataset.id] == undefined) {
        var product = products[this.dataset.id];
        cart.data[this.dataset.id] = {
          name : product['name'],
          desc : product['desc'],
          img : product['img'],
          price : product['price'],
          qty : 1
        };
      } else {
        cart.data[this.dataset.id]['qty']++;
      }
  
      // Save local storage + HTML update
      cart.save();
      cart.list();
    },
  
    list : function(){
    // list() : update HTML
  
      var container = document.getElementById("cart-list"),
          item = [], part = [], product = [];
      container.innerHTML = "";
  
      var isempty = function(obj){
        for (var key in obj) {
          if(obj.hasOwnProperty(key)) { return false; }
        }
        return true;
      };
      if (isempty(cart.data)) {
        item = document.createElement("div");
        item.innerHTML = " Keranjang Kosong dude !";
        container.appendChild(item);
      }
  
      // Not empty
      else {
        // List items
        var total = 0, subtotal = 0;
        for (var i in cart.data) {
          item = document.createElement("div");
          item.classList.add("c-item");
          product = cart.data[i];
  
          // Quantity
          part = document.createElement("input");
          part.type = "number";
          part.value = product['qty'];
          part.dataset.id = i;
          part.classList.add("c-qty");
          part.addEventListener("change", cart.change);
          item.appendChild(part);
  
          // Name
          part = document.createElement("span");
          part.innerHTML = product['name'];
          part.classList.add("c-name");
          item.appendChild(part);
  
          // Subtotal
          subtotal = product['qty'] * product['price'];
          total += subtotal;
  
          container.appendChild(item);
        }
  
        // EMPTY BUTTONS
        item = document.createElement("input");
        item.type = "button";
        item.value = "Kosongin !";
        item.addEventListener("click", cart.reset);
        item.classList.add("c-empty");
        container.appendChild(item);
  
        // CHECKOUT BUTTONS
        item = document.createElement("input");
        item.type = "button";
        item.value = "Checkout - " + "Rp." + total;
        item.addEventListener("click", cart.checkout);
        item.classList.add("c-checkout");
        container.appendChild(item);
      }
    },
  
    change : function(){
    // change() : change quantity
  
      if (this.value == 0) {
        delete cart.data[this.dataset.id];
      } else {
        cart.data[this.dataset.id]['qty'] = this.value;
      }
      cart.save();
      cart.list();
    },
  
    reset : function(){
    // reset() : empty cart
  
      if (confirm("serius NGOSONGIN keranjang?")) {
        cart.data = {};
        cart.save();
        cart.list();
      }
    },
  
    checkout : function(){
    // checkout() : checkout the cart
  
      alert("TERIMA KASIH SUDAH BERBELANJA ");
    }
  };
  
  // Load previous cart and update HTML on load
  window.addEventListener("load", function(){
    cart.load();
    cart.list();
  });