import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './listProduct.scss';

function ListProduct() {
  const history = useHistory();
  const [productList, setProductList] = useState();
  const [filter, setFilter] = useState('');

  const fetchProductList = () => {
    let params = new URLSearchParams('filter=' + filter);
    axios.get('http://localhost:3001/listprod?' + params, { withCredentials: true }).then((res) => {
      setProductList(res.data);
    });
  };

  function handleAddCart(event) {
    let product = productList[event.target.value];
    axios
      .post(
        `http://localhost:3001/addcart`,
        {
          id: product.id,
          name: product.name,
          price: product.price,
        },
        { withCredentials: true }
      )
      .then(() => {
        history.push('/showcart');
      });
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleProductClick = (id) => {
    history.push('/product/' + id);
  };

  useEffect(fetchProductList, [filter]);

  return (
    <div>
      <h1>Search for Products</h1>
      <input value={filter} onChange={handleFilterChange} />
      <button onClick={fetchProductList}>Search</button>
      {productList ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Price</th>
                <th className='noBackground'></th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product, index) => {
                return (
                  <tr key={index} className={index % 2 === 0 ? 'rowPrimary' : ''}>
                    <td>{product.id}</td>
                    <td>
                      <span className='product' onClick={() => handleProductClick(product.id)}>
                        {product.name}
                      </span>
                    </td>
                    <td>{'$' + product.price.toFixed(2)}</td>
                    <td>
                      <button value={index} onClick={handleAddCart}>
                        🛒
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Failed to fetch product list from server.</p>
      )}
    </div>
  );
}

export default ListProduct;
