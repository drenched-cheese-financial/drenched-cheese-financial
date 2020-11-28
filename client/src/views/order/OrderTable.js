import React, { useState, useEffect } from 'react';

function OrderTable(props) {
  const [tableData, setTableData] = useState([]);

  const generateTableData = () => {
    let generatedData = [];
    for (var product of props.products) {
      generatedData.push(
        <tr key={product.id}>
          <td>{product.id}</td>
          <td>{product.name}</td>
          <td>{product.quantity}</td>
          <td>{product.price}</td>
          <td>{product.subtotal}</td>
        </tr>
      );
    }
    setTableData(generatedData);
  };

  useEffect(generateTableData, [props.products]);

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

export default OrderTable;
