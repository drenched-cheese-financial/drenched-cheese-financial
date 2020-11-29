import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './listProduct.scss';
import { useHistory } from 'react-router-dom';

function ListProduct() {
	// Declare a new state variable, which we'll call "count"
	const history = useHistory();
	const [productList, setProductList] = useState();
	const [keyword, setKeyword] = useState('');
	const [productPageProduct, setProductPageProduct] = useState();
	// let productInfoString = '/product?id=';

	useEffect(() => {
		// Fetch the data on load
		axios
			.get('http://localhost:3001/listprod?keyword=', { withCredentials: true })
			.then((response) => {
				setProductList(response.data.recordsets[0]);
			});
	}, []);

	useEffect(() => {
		productPageProduct
			? history.push('/product?id=' + productPageProduct)
			: console.log('nada');
	}, [history, productPageProduct]);

	function search() {
		axios
			.get(`http://localhost:3001/listprod?keyword=${keyword}`, {
				withCredentials: true,
			})
			.then((response) => {
				setProductList(response);
			});
	}

	function addCart(event) {
		let product = productList[event.target.value];

		axios
			.post(
				`http://localhost:3001/addcart`,
				{
					id: product.productID,
					name: product.productName,
					price: product.productPrice,
				},
				{ withCredentials: true }
			)
			.then(() => {
				history.push('/showcart');
			});
	}

	return (
		<div>
			<h1>Search for Products</h1>
			<input
				key='random1'
				value={keyword}
				placeholder={'search products'}
				onChange={(e) => setKeyword(e.target.value)}
			/>

			<button onClick={search}>Search</button>
			{productList ? (
				<div>
					<table>
						<thead>
							<tr>
								<th>Product ID</th>
								<th>Product Name</th>
								<th>Price</th>
								<th className='noBackground'></th>
							</tr>
						</thead>
						<tbody>
							{productList.map((value, index) => {
								return (
									<tr
										key={index}
										className={index % 2 === 0 ? 'rowPrimary' : ''}
									>
										<td>{value.productID}</td>

										<td>
											<span
												className='product'
												value={value.productID}
												onClick={() => {
													setProductPageProduct(value.productID);
												}}
											>
												{value.productName}
											</span>
										</td>

										<td>{'$' + value.productPrice.toFixed(2)}</td>

										<td>
											<button value={index} onClick={addCart}>
												🛒
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			) : (
				''
			)}
		</div>
	);
}

export default ListProduct;
