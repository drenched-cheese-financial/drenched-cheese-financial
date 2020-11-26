import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListProduct() {
	// Declare a new state variable, which we'll call "count"
	const [productList, setProductList] = useState();
	const [keyword, setKeyword] = useState('');

	useEffect(() => {
		// Fetch the data on load
		axios.get('http://localhost:3001/listprod?keyword=').then((response) => {
			setProductList(response);
		});
	}, []);

	function search() {
		axios
			.get(`http://localhost:3001/listprod?keyword=${keyword}`)
			.then((response) => {
				setProductList(response);
			});
	}

	return (
		<div>
			<h1>Search for Products</h1>
			<input
				key="random1"
				value={keyword}
				placeholder={'search products'}
				onChange={(e) => setKeyword(e.target.value)}
			/>

			<button onClick={search}>Search</button>
			{typeof productList !== 'undefined' ? (
				<div>
					<table>
						<tr>
							<th>Product ID</th>
							<th>Product Name</th>
							<th>Price</th>
						</tr>
						{productList.data.recordsets[0].map((value, index) => {
							return (
								<tr className={index % 2 === 0 ? 'rowPrimary' : ''}>
									<td key={index}>{value.productID}</td>

									<td key={index}>{value.productName}</td>

									<td key={index}>${value.productPrice.toFixed(2)}</td>
								</tr>
							);
						})}
					</table>
				</div>
			) : (
				''
			)}
		</div>
	);
}

export default ListProduct;
