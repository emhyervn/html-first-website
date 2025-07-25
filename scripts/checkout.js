import { products } from "../data/products.js";
import {
	cart,
	saveCart,
	removeFromCart,
	updateAndSaveCartQuantity,
	emptySummaryCart,
} from "../data/cart.js";

let cartSummeryHTML = "";

cart.forEach((cartItem) => {
	let matchingItem;

	products.forEach((product) => {
		if (product.id === cartItem.productId) {
			matchingItem = product;
		}
	});

	cartSummeryHTML += `
    <div class="product-container js-cart-item-container-${cartItem.productId}">
        <p class="delivery-date">Delivery date: Tuesday,June 21</p>
        <div class="product-container-main">
            <div class="product-detail-container">
                <div class="product-image-container">
                    <img class="product-image" src="../${matchingItem.image}" alt="">
                </div>
                <div class="product-name-container">

                    <p class="product-name">${matchingItem.name}</p>
                    <div class="product-price">$${matchingItem.price}</div>
                    <div class="product-quantity">
                        Quantity: ${cartItem.quantity}
                        <button class="update-product">Update</button>
                        <button class="delete-product js-delete-button" data-product-id="${cartItem.productId}">Delete</button>
                    </div>
                </div>
            </div>
            <div class="product-delivery-container">
                <p>Chose a delivery option:</p>
                <div class="delivery-option-1">
                    <input type="radio" name="radio-button">
                    <div>
                        <p>Tuesday, June 21</p>
                        <p>Free Shipping</p>
                    </div>
                </div>
                <div class="delivery-option-2">
                    <input type="radio" name="radio-button">
                    <div>
                        <p>Tuesday, June 21</p>
                        <p>Free Shipping</p>
                    </div>
                </div>
                <div class="delivery-option-3">
                    <input type="radio" name="radio-button">
                    <div>
                        <p>Tuesday, June 21</p>
                        <p>Free Shipping</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
});

if (!cart.length) {
	cartSummeryHTML = `
        <div class="product-container"  style="display: flex; justify-content: center; align-items: center; font-size: 30px;">
            <p> So Empty ...</p>
        </div>
    `;
}

document.querySelector(".checkout-product-list").innerHTML = cartSummeryHTML;

document.querySelectorAll(`.js-delete-button`).forEach((button) => {
	button.addEventListener("click", () => {
		const productId = button.dataset.productId;

		removeFromCart(productId);
		updateAndSaveCartQuantity();

		const cartContainer = document.querySelector(
			`.js-cart-item-container-${productId}`
		);
		cartContainer.remove();
		emptySummaryCart();
	});
});
