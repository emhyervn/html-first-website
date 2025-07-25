import { products } from "../data/products.js";
import { cart, addToCart, updateAndSaveCartQuantity } from "../data/cart.js";

let productsHTML = "";

products.forEach((product) => {
	productsHTML += `
    <div class="product-container">
        <img class="product-image" src="${product.image}" alt="">
        <p class="product-name">${product.name}</p>
        <div class="product-rating-items">
            <img class="product-rating-image" src="images/ratings/rating-${
				product.rating.star * 10
			}.png" alt="">
            <div class="product-rating-count">${product.rating.count}</div>
        </div>
        <div class="product-price">$${product.price}</div>
        <div class="add-product-container">
            <button class="add-product js-add-product-button" data-product-id="${
				product.id
			}">Buy the Course</button>
        </div>
    </div>
`;
});

document.querySelector(".js-product-grid").innerHTML = productsHTML;

document.querySelectorAll(".js-add-product-button").forEach((button) => {
	button.addEventListener("click", () => {
		const productId = button.dataset.productId;

		addToCart(productId);

		updateAndSaveCartQuantity();
	});
});
