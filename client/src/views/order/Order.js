import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import OrderTable from './OrderTable';
import Box from '../../assets/images/box.png';
import './order.scss';

function Order() {
	let { customerId } = useParams();
	const [order, setOrder] = useState();
	const [orderJSX, setOrderJSX] = useState();

	const fetchOrder = () => {
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
				setOrderJSX(<div>{order.err}</div>);
			} else {
				setOrderJSX(
					<div>
						<OrderTable products={order.products}></OrderTable>
						<p>Order completed. Will be shipped soon...</p>
						<img src={Box} />
						<p>
							Order reference number:{' '}
							<span className='enlighten'>{order.id}</span>
						</p>
						<p>
							Customer id: &nbsp;
							<span className='enlighten'>{order.customer.id} </span>
						</p>
						<p>
							Shipped to{' '}
							<span className='enlighten'>
								{order.customer.firstName} {order.customer.lastName}{' '}
							</span>
							<br />{' '}
						</p>
					</div>
				);
			}
		} else {
			setOrderJSX(<div>Failed to load order!</div>);
		}
	};

	useEffect(fetchOrder, [customerId]);
	useEffect(renderOrder, [order]);

	return (
		<div>
			<h1>Your Order Summary</h1>
			{orderJSX}
		</div>
	);
}

export default Order;
