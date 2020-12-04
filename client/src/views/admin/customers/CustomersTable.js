import React, { useState, useEffect } from 'react';

function CustomersTable(props) {
  const [tableData, setTableData] = useState([]);

  const generateTableData = () => {
    let generatedData = [];
    for (var customer of props.customers) {
      generatedData.push(
        <tr key={customer.id}>
          <td>{customer.id}</td>
          <td>{customer.username}</td>
          <td>{customer.firstName} {customer.lastName}</td>
          <td>{customer.email}</td>
          <td>{customer.phone}</td>
        </tr>
      );
    }
    setTableData(generatedData);
  };

  useEffect(generateTableData, [props.customers]);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>{tableData}</tbody>
    </table>
  );
}

export default CustomersTable;
