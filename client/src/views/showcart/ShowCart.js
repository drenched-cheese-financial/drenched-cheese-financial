import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './showCart.scss';
import { useHistory } from 'react-router-dom';
import CartTable from './cart-table/CartTable';

function ShowCart() {
	const history = useHistory();
	// Declare a new state variable, which we'll call "count"
	const [productList, setProductList] = useState([]);

	//will have error message or table component
	const [tableJSX, setTableJSX] = useState();

	const fetchProductList = () => {
		axios
			.get('http://localhost:3001/showcart', { withCredentials: true })
			.then((response) => {
				setProductList(response.data);
			});
	};

	const updateCart = () => {
		axios.post(
			'http://localhost:3001/updatecart',
			{ productList: productList },
			{
				withCredentials: true,
			}
		);
	};

	const handleIncrement = (event) => {
		let rowIndex = Number(event.target.value);
		setProductList((productList) =>
			productList.map((p, index) => {
				if (index === rowIndex) {
					return { ...p, quantity: p.quantity + 1 };
				} else {
					return p;
				}
			})
		);
	};
	const handleDecrement = (event) => {
		let rowIndex = Number(event.target.value);
		setProductList((productList) =>
			productList.map((p, index) => {
				if (index === rowIndex && p.quantity > 1) {
					return { ...p, quantity: p.quantity - 1 };
				} else {
					return p;
				}
			})
		);
	};

	const handleDelete = (event) => {
		let rowIndex = Number(event.target.value);

		setProductList((productList) => {
			return productList.filter((p, index) => {
				return index !== rowIndex;
			});
		});
	};

	const renderTableJSX = () => {
		if (productList) {
			setTableJSX(
				<CartTable
					products={productList}
					onIncrement={handleIncrement}
					onDecrement={handleDecrement}
					onDelete={handleDelete}
				/>
			);
		} else {
			setTableJSX(<h1>Cart Empty</h1>);
		}
	};

	const handleBack = () => {
		history.push('/listprod');
	};

	const handleCheckout = () => {
		history.push('/checkout');
	};

	useEffect(fetchProductList, []);
	useEffect(updateCart, [productList]);
	useEffect(renderTableJSX, [productList]);

	return (
		<div>
			<h1>Your Shopping Cart</h1>
			{tableJSX}
			<button onClick={handleBack}>Back to Shop</button>
			<button onClick={handleCheckout}>Checkout</button>
		</div>
	);
}

export default ShowCart;
