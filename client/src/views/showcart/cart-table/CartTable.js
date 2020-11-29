import React, { useState, useEffect } from 'react';

function CartTable(props) {
	const [tableData, setTableData] = useState([]);

	const generateTableData = () => {
		let generatedData = [];

		for (var i = 0; i < props.products.length; i++) {
			let product = props.products[i];
			generatedData.push(
				<tr key={product.id}>
					<td>{product.id}</td>
					<td>{product.name}</td>
					<td>
						<button value={i} onClick={props.onDecrement}>
							-
						</button>
						{product.quantity}
						<button value={i} onClick={props.onIncrement}>
							+
						</button>
					</td>
					<td>${product.price.toFixed(2)}</td>
					<td>${(product.price * product.quantity).toFixed(2)}</td>
					<td>
						<button value={i} onClick={props.onDelete}>
							x
						</button>
					</td>
				</tr>
			);
		}
		setTableData(generatedData);
	};

	useEffect(generateTableData, [
		props.products,
		props.onDecrement,
		props.onIncrement,
		props.onDelete,
	]);

	return (
		<table>
			<thead>
				<tr>
					<th>Product Id</th>
					<th>Product Name</th>
					<th>Quantity</th>
					<th>Price</th>
					<th>Subtotal</th>
				</tr>
			</thead>
			<tbody>{tableData}</tbody>
		</table>
	);
}

export default CartTable;
