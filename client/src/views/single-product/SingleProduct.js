import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './singleProduct.scss';
import { useHistory } from 'react-router-dom';

function SingleProduct() {
	const history = useHistory();
	const [product, setProduct] = useState();

	function addCart(event) {
		let prod = event.target.value;
		console.log('prod is: ' + prod);
		axios
			.post(
				`http://localhost:3001/addcart`,
				{
					id: prod.productId,
					name: prod.productName,
					price: prod.productPrice,
				},
				{ withCredentials: true }
			)
			.then(() => {
				history.push('/showcart');
			});
	}

	const fetchProduct = () => {
		let params = new URLSearchParams(document.location.search.substring(1));
		let productId = params.get('id');

		axios
			.get('http://localhost:3001/product?id=' + productId, {
				withCredentials: true,
			})
			.then((res) => {
				setProduct(res.data);
			});
	};

	function continueShopping() {
		history.push('/listprod');
	}

	useEffect(fetchProduct, [history]);

	return (
		<div>
			{product ? (
				<div>
					<h1>{product.productName}</h1>
					<img
						alt={product.productImageURL}
						src={`./products/${product.productImageURL}`}
					/>
					<table>
						<thead>
							<tr>
								<th>ID </th>

								<td> {product.productId}</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th>Price </th>
								<td>${product.productPrice.toFixed(2)}</td>
							</tr>
						</tbody>
					</table>
					<br />
					<button onClick={continueShopping}>Continue Shopping</button>
					<button value={product} onClick={addCart}>
						Add to Cart 🛒
					</button>
				</div>
			) : (
				' '
			)}
		</div>
	);
}

export default SingleProduct;
