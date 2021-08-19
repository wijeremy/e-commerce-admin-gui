const createItemFormHandler = async (event) => {
	event.preventDefault();

	// Collect values from the create item form
	const name = document.querySelector('#itemName').value.trim();
	const desc = document.querySelector('#itemDescription').value.trim();
	const SKU = document.querySelector('#itemSKU').value.trim();
	const getCategoryId = document
		.querySelector('#itemCategory')
		.value.slice(0, 1);
	let price = document.querySelector('#itemPrice').value.trim();
	const img = document.querySelector('#itemImage').value.trim();

	const category_id = parseInt(getCategoryId);
	price = parseFloat(price);

	console.log(name);
	console.log(desc);
	console.log(SKU);
	console.log(category_id);
	console.log(price);
	console.log(img);

	if (name && desc && SKU && category_id && price && img) {
		// Send a POST request to the API endpoint
		const response = await fetch('/api/product', {
			method: 'POST',
			body: JSON.stringify({ name, desc, SKU, category_id, price, img }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			// If successful, redirect the browser to the profile page
			document.location.replace('/admin');
		} else {
			alert(response.statusText);
		}
	}
};

document
	.querySelector('#create-item-form')
	.addEventListener('submit', createItemFormHandler);
