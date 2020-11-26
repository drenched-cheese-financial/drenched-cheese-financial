import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './listOrder.scss';

function ListOrder() {
	// Declare a new state variable, which we'll call "count"
	const [orderList, setOrderList] = useState();

	useEffect(() => {
		// Fetch the data on load
		axios.get('http://localhost:3001/listorder').then((response) => {
			console.log(response.data[0][1][1].price);
			setOrderList(response.data);
		});
	}, []);

	return (
		<div>
			<h1>Orders</h1>

			{typeof orderList !== 'undefined'
				? orderList.map((value, index) => {
						return (
							<div className="tablesDiv">
								<table>
									<tr>
										<th>Order ID</th>
										<th>Order Date</th>
										<th>Customer ID</th>
										<th>Customer Name</th>
										<th>Total Amount</th>
									</tr>
									<tr>
										<td key={index}>{value[0][0].orderId}</td>
										<td key={index}>{value[0][0].orderDate}</td>
										<td key={index}>{value[0][0].customerId}</td>
										<td key={index}>{value[0][0].customerName}</td>
										<td key={index}>{value[0][0].totalAmount}</td>
									</tr>
								</table>
								<table className="productTable">
									<tr>
										<th>Product ID</th>
										<th>Quantity</th>
										<th>Price</th>
									</tr>
									{value[1].map((product, index) => {
										return (
											<tr className={index % 2 !== 0 ? 'rowPrimary' : ''}>
												<td key={index}>{product.productId}</td>
												<td key={index}>{product.quantity}</td>
												<td key={index}>{product.price}</td>
											</tr>
										);
									})}
								</table>
							</div>
						);
				  })
				: ''}

			{/* <div>
				<table>
					{orderList.map((value, index) => {
						return (
							<div>
								<table>
									<tr>
										<th>Order ID</th>
										<th>Order Date</th>
										<th>Customer ID</th>
										<th>Customer Name</th>
										<th>Total Amount</th>
									</tr>
									<tr className={index % 2 === 0 ? 'rowPrimary' : ''}>
										<td key={index}>{value.orderId}</td>
										<td key={index}>{value.orderDate}</td>
										<td key={index}>{value.customerId}</td>
										<td key={index}>
											{value.firstName + ' ' + value.lastName}
										</td>
										<td key={index}>{'$' + value.totalAmount.toFixed(2)}</td>
									</tr>
								</table>
								<table>
									<tr>
										<th>Product ID</th>
										<th>Quantity</th>
										<th>Price</th>
									</tr>
									<tr>
										<td key={index}>{value.productId}</td>
										<td></td>
										<td></td>
									</tr>
								</table>
							</div>
						);
					})}
				</table>
			</div> */}
		</div>
	);
}

export default ListOrder;
