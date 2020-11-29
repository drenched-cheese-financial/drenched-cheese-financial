import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './listOrder.scss';

function ListOrder() {
	// Declare a new state variable, which we'll call "count"
	const [orderList, setOrderList] = useState();

	useEffect(() => {
		// Fetch the data on load
		axios
			.get('http://localhost:3001/listorder', { withCredentials: true })
			.then((response) => {
				setOrderList(response.data);
			});
	}, []);

	return (
		<div>
			<h1>Orders</h1>

			{orderList
				? orderList.map((value, index) => {
						return (
							<div key={index} className='tablesDiv'>
								<table>
									<thead>
										<tr>
											<th>Order ID</th>
											<th>Order Date</th>
											<th>Customer ID</th>
											<th>Customer Name</th>
											<th>Total Amount</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>{value[0][0].orderId}</td>
											<td>{value[0][0].orderDate}</td>
											<td>{value[0][0].customerId}</td>
											<td>{value[0][0].customerName}</td>
											<td>{value[0][0].totalAmount}</td>
										</tr>
									</tbody>
								</table>
								<table className='productTable'>
									<thead>
										<tr>
											<th>Product ID</th>
											<th>Quantity</th>
											<th>Price</th>
										</tr>
									</thead>
									<tbody>
										{value[1].map((product, productIndex) => {
											return (
												<tr
													key={productIndex}
													className={index % 2 !== 0 ? 'rowPrimary' : ''}
												>
													<td>{product.productId}</td>
													<td>{product.quantity}</td>
													<td>{product.price}</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						);
				  })
				: ''}
		</div>
	);
}

export default ListOrder;
