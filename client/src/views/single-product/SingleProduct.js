import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import './singleProduct.scss';

function SingleProduct() {
  const { productId } = useParams();
  const history = useHistory();
  const [product, setProduct] = useState();

  const fetchProduct = () => {
    let params = new URLSearchParams('id=' + productId);
    axios
      .get('https://the-drenched-cheese-financial.herokuapp.com/product?' + params, {
        withCredentials: true,
      })
      .then((res) => {
        setProduct(res.data);
      });
  };

  const handleContinue = () => {
    history.push('/listprod');
  };

  const handleAddCart = () => {
    axios
      .post(
        'https://the-drenched-cheese-financial.herokuapp.com/addcart',
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
  };

  useEffect(fetchProduct, [productId]);

  return (
    <div>
      {product ? (
        <div>
          <h1>{product.name}</h1>
          {product.imageURL && (
            <img alt="product example" src={`/products/${product.imageURL}`} />
          )}
          {product.image && (
            <img
              alt="product example"
              src={`https://the-drenched-cheese-financial.herokuapp.com/displayimage?id=${product.id}`}
            />
          )}
          <table>
            <thead>
              <tr>
                <th>ID </th>
                <td>{product.id}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Price </th>
                <td>${product.price.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <br />
          <button onClick={handleContinue}>Continue Shopping</button>
          <button onClick={handleAddCart}>Add to Cart 🛒</button>
        </div>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
}

export default SingleProduct;
