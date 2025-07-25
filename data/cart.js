export let cart = JSON.parse(localStorage.getItem("saveCart")) || [];

export const cartQuantity = (document.querySelector(
	".cart-quantity"
).innerHTML = JSON.parse(localStorage.getItem("saveCartQuantity")) || 0);

export function saveCart() {
	localStorage.setItem("saveCart", JSON.stringify(cart));
}

export function addToCart(productId) {
	let matchingItem;

	cart.forEach((cartItem) => {
		if (productId === cartItem.productId) {
			matchingItem = cartItem;
		}
	});
	if (matchingItem) {
		matchingItem.quantity += 1;
	} else {
		cart.push({
			productId,
			quantity: 1,
		});
	}
	saveCart();
}

export function removeFromCart(productId) {
	const newCart = [];

	cart.forEach((cartItem) => {
		if (cartItem.productId !== productId) {
			newCart.push(cartItem);
		}
	});
	cart = newCart;
	saveCart();
	updateAndSaveCartQuantity();
}

export function updateAndSaveCartQuantity() {
	let cartQuantity = 0;
	cart.forEach((cartItem) => {
		cartQuantity += Number(cartItem.quantity);
	});
	document.querySelector(".cart-quantity").innerHTML = cartQuantity;

	localStorage.setItem("saveCartQuantity", JSON.stringify(cartQuantity));
}

export function emptySummaryCart() {
	if (!cart.length) {
		let cartSummeryHTML = "";
		cartSummeryHTML += `
          <div class="product-container"  style="display: flex; justify-content: center; align-items: center; font-size: 30px;">
              <p> So Empty ...</p>
          </div>
      `;
		document.querySelector(".checkout-product-list").innerHTML =
			cartSummeryHTML;
	}
}
