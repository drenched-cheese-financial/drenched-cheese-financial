import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListProduct() {
	// Declare a new state variable, which we'll call "count"
	const [productList, setProductList] = useState();
	const [keyword, setKeyword] = useState('');
	let str1 = "addcart?id="
	
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
							<th>Add To Cart</th>
						</tr>
						{productList.data.recordsets[0].map((value, index) =>{
							return (
								<tr className={index % 2 === 0 ? 'rowPrimary' : ''}>
									<td key={index}>{value.productID}</td>

									<td key={index}>{value.productName}</td>

									<td key={index}>{"$" + value.productPrice.toFixed(2)}</td>

									<td key={index}><a href={str1.concat(value.productID, "&productName=", value.productName, "&price=", value.productPrice)}>Add To Cart</a>
									</td>
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
