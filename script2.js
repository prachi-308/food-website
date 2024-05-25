
document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.getElementsByClassName("menu_btn");
    let sum = 0;

    // Iterate over each button and attach the event listener
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function(e) {
            // Find the .details-sub element
            let detail = this.closest('.food-items').querySelector('.details-sub');
            
            // Find the title within .details-sub and get its text content
            let title = detail.querySelector('.title').textContent;
            
            // Find the price within .details-sub and exclude the <span>
            let priceElement = detail.querySelector('.price');
            let price = priceElement.childNodes[0].textContent.trim();
            
            // Print the title and price separately
            console.log("Title:", title);
            console.log("Price:", price);
            
            // Check if price is numeric
            if (!isNaN(parseFloat(price))) {
                // Add the price to the sum if it's numeric
                sum += Number(price);
                console.log("Updated sum:", sum);
                
                // Update the shopping cart display
                updateCart(title, price, sum);
                // Update cart icon count
                updateCartCount(1); // Increase count by 1
            } else {
                console.log("Price is not a valid number:", price);
            }
        });
    }

    function updateCart(title, price, total) {
        // Check if the item is already in the cart
        let existingItem = document.querySelector(`#cart-items li[data-title="${title}"]`);
    
        if (existingItem) {
            // If the item already exists, increase its count and update total
            let countSpan = existingItem.querySelector(".item-count");
            let count = parseInt(countSpan.textContent);
            count++;
            countSpan.textContent = count;
    
            // Update the total price of the item
            let itemPriceSpan = existingItem.querySelector(".item-price");
            let itemPrice = parseFloat(itemPriceSpan.textContent.slice(1)); // Remove the ₹ symbol and parse to float
            itemPrice += parseFloat(price); // Increment the item price
            itemPriceSpan.textContent = "₹" + itemPrice.toFixed(2); // Update the displayed item price
    
            // Update total
            updateTotal();
        } else {
            // If the item is not in the cart, create a new list item
            let newItem = document.createElement("li");
            newItem.setAttribute("data-title", title);
            newItem.style.marginBottom = "4px";
    
            // Create a div to hold the item details and buttons
            let itemDetailsDiv = document.createElement("div");
            itemDetailsDiv.classList.add("item-details");
    
            // Create a span for the item name
            let itemNameSpan = document.createElement("span");
            itemNameSpan.textContent = title;
            itemDetailsDiv.appendChild(itemNameSpan);
    
            // Create buttons for adding and removing items
            let addButton = document.createElement("button");
            addButton.textContent = "+";
            addButton.classList.add("add-btn");
            addButton.onclick = function () {
                let countSpan = this.parentElement.querySelector(".item-count");
                let count = parseInt(countSpan.textContent);
                count++;
                countSpan.textContent = count;
                // Update total
                sum += Number(price);
                itemPrice += parseFloat(price); // Increment the item price
                itemPriceSpan.textContent = "₹" + itemPrice.toFixed(2); // Update the displayed item price
                updateTotal();
                // Update cart icon count
                updateCartCount(1); // Increase count by 1
            };
            itemDetailsDiv.appendChild(addButton);
    
            // Create a span for the item count
            let countSpan = document.createElement("span");
            countSpan.classList.add("item-count");
            countSpan.textContent = "1"; // Initialize count to 1
            itemDetailsDiv.appendChild(countSpan);
    
            let removeButton = document.createElement("button");
            removeButton.textContent = "-";
            removeButton.classList.add("remove-btn");
            removeButton.onclick = function () {
                let countSpan = this.parentElement.querySelector(".item-count");
                let count = parseInt(countSpan.textContent);
                if (count > 1) {
                    count--;
                    countSpan.textContent = count;
                    // Update total
                    sum -= Number(price);
                    itemPrice -= parseFloat(price); // Decrement the item price
                    itemPriceSpan.textContent = "₹" + itemPrice.toFixed(2); // Update the displayed item price
                    updateTotal();
                    // Update cart icon count
                    updateCartCount(-1); // Decrease count by 1
                } else {
                    // If count is 1, remove the item from the cart
                    sum -= Number(price);
                    updateTotal();
                    newItem.remove();
                    if (document.getElementById("cart-items").childNodes.length === 0) {
                        // Show empty cart message if cart is empty
                        document.getElementById("empty-cart-msg").style.display = "block";
                    }
                    // Decrease cart icon count
                    updateCartCount(-1); // Decrease count by 1
                }
            };
            itemDetailsDiv.appendChild(removeButton);
    
            // Create a span for the item price
            let itemPriceSpan = document.createElement("span");
            itemPriceSpan.classList.add("item-price");
            itemPriceSpan.textContent = "₹" + price; // Set initial item price
            itemDetailsDiv.appendChild(itemPriceSpan);
    
            // Append the item details div to the new item
            newItem.appendChild(itemDetailsDiv);
    
            // Append the new item to the cart
            document.getElementById("cart-items").appendChild(newItem);
    
            // Update the total amount
            updateTotal();
    
            // Hide empty cart message if it's visible
            document.getElementById("empty-cart-msg").style.display = "none";
        }
    }
    
    function updateTotal() {
        // Format the total amount with the currency symbol
        let formattedTotal = "₹" + sum;
        
        // Update the total amount
        document.getElementById("total-amount").innerHTML = formattedTotal;
    }
    
    let cartCount = 0;

    function updateCartCount(change) {
        cartCount += change;
        document.getElementById('cart-count').textContent = cartCount;
    }

    function toggleCart() {
        let cartBox = document.getElementById('cart-box');
        if (cartBox.style.display === 'none') {
            cartBox.style.display = 'block';
            // Call a function to populate or update the cart content here if needed
        } else {
            cartBox.style.display = 'none';
        }
    }

    // Add this function to update the cart count when adding items to the cart
    function updateCartCount() {
        increaseCartCount();
    }
});
// document.getElementById('icon').addEventListener('click', function() {
//     var navItems = document.querySelectorAll('.nav-items');
//     navItems.forEach(function(nav) {
//         if (nav.style.display === 'block') {
//             nav.style.display = 'none';
//         } else {
//             nav.style.display = 'block';
//         }
//     });
// });

function toggleCart() {
    var cartBox = document.getElementById('cart-box');
    if (cartBox.style.display === 'block') {
        cartBox.style.display = 'none';
    } else {
        cartBox.style.display = 'block';
    }
}
document.querySelector('.navigation-menu').addEventListener('click',()=>{
    console.log("menu clicked")
    var navMenu = document.querySelector('.navigation-menu');
    if (navMenu.style.display === "none") {
        navMenu.style.display = "block";
    } else {
        navMenu.style.display = "none";
    }
})
