import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './showCart.scss';
import { useHistory } from 'react-router-dom';
import CartTable from './cart-table/CartTable';

function ShowCart() {
  const history = useHistory();
  // Declare a new state variable, which we'll call "count"
  const [productList, setProductList] = useState([]);
  const isFirstRender = useRef(true);
  //will have error message or table component
  const [tableJSX, setTableJSX] = useState();


  const fetchProductList = () => {
    axios
      .get('https://the-drenched-cheese-financial.herokuapp.com/showcart', { withCredentials: true })
      .then((response) => {
        setProductList(response.data);
      });
  };

  const updateCart = () => {
    if (!isFirstRender.current) {
      axios.post(
        'https://the-drenched-cheese-financial.herokuapp.com/updatecart',
        { productList: productList },
        {
          withCredentials: true,
        }
      );
    }
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
    if (!productList || productList.length === 0) {
      setTableJSX(<p>Your shopping cart is empty.</p>);
    } else {
      setTableJSX(
        <CartTable
          products={productList}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onDelete={handleDelete}
        />
      );
    }
  };

  const handleBack = () => {
    history.push('/listprod');
  };

  const handleCheckout = () => {
    history.push('/checkout');
  };

  useEffect(fetchProductList, []);

  useEffect(renderTableJSX, [productList]);
  useEffect(updateCart, [productList]);
  useEffect(() => { isFirstRender.current = false }, []);
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
