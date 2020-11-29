import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import OrderTable from './OrderTable';

function Order() {
	let { customerId } = useParams();
	const [order, setOrder] = useState();
	const [orderJSX, setOrderJSX] = useState();

	const completeOrder = () => {
		let params = new URLSearchParams('customerId=' + customerId);
		axios
			.get('http://localhost:3001/order?' + params, { withCredentials: true })
			.then((res) => {
				setOrder(res.data);
			});
	};

	const renderOrder = () => {
		if (order) {
			if (order.err) {
				setOrderJSX(
					<div>
						<br />
						<br />
						{order.err}
					</div>
				);
			} else {
				setOrderJSX(
					<div>
						<h1>Your Order Summary</h1>
						<OrderTable products={order.products}></OrderTable>
						<p>Order completed. Product will be shipped shortly.</p>
						<p>Order reference number: {order.id}</p>
						<p>
							Shipped to {order.customer.firstName} {order.customer.lastName}{' '}
							(id {order.customer.id})
						</p>
					</div>
				);
			}
		} else {
			setOrderJSX(
				<div>
					<br />
					<br />
					Failed to load order!
				</div>
			);
		}
	};

	useEffect(completeOrder, [customerId]);
	useEffect(renderOrder, [order]);

	return <div>{orderJSX}</div>;
}

export default Order;
