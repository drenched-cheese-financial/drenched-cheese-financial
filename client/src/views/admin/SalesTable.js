import React, { useState, useEffect } from 'react';

function SalesTable(props) {
  const [tableData, setTableData] = useState([]);

  const generateTableData = () => {
    let generatedData = [];
    for (var sale of props.sales) {
      generatedData.push(
        <tr key={sale.orderDate}>
          <td>{sale.orderDate}</td>
          <td>{sale.amount}</td>
        </tr>
      );
    }
    setTableData(generatedData);
  };

  useEffect(generateTableData, [props.sales]);

  return (
    <table>
      <thead>
        <tr>
          <th>Order Date</th>
          <th>Total Amount</th>
        </tr>
      </thead>
      <tbody>{tableData}</tbody>
    </table>
  );
}

export default SalesTable;
