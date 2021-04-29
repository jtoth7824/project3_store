import React, { useEffect, useState } from "react";
import Ratings from "../Ratings";
import { Link } from "react-router-dom";
import "./style.css";
import API from "../../utils/API";
import { useTodoContext } from "../../utils/store";

function Product(props) {
  const [item, setItem] = useState({});
  const [state, dispatch] = useTodoContext();

  useEffect(() => {
    setState()
  }, []);

  const handleIncrement= (e) => {
    const id = e.target.id.split('-')[1];
    const quantity = document.getElementById(id);
    const value = parseInt(quantity.value);
    quantity.value = value + 1;
    quantityChange();
  }

  const handleDecrement= (e) => {
    const id = e.target.id.split('-')[1];
    const quantity = document.getElementById(id);
    const value = parseInt(quantity.value);
    if(value > 0) {
      quantity.value = value - 1;
    } else {
      quantity.value = 0;
    }
    quantityChange();
  }

  const addToCart = () => {

      API.getCart()
      .then( res => {
        setItem({
          name: props.product.name,
          productID: props.product.productID,
          prodInfo: {
            size: props.product.packaging[0].size,
            price: props.product.packaging[0].price,
            quantity: 1
          }
        });
        dispatch({
          type: "numCartItems",
          numItems: res.data.length
        })
      })
      .then(
        API.saveCart(item)
        .then(res=> {
        })
        )
      .catch(err => console.log(err));

      alert("Your item has been added to the shopping cart!")

  }

  const setState = () => {
    setItem({
      name: props.product.name,
      productID: props.product.productID,
      prodInfo: {
        size: props.product.packaging[0].size,
        price: props.product.packaging[0].price,
        quantity: 1
      }
    })
  }

  const addToCartProducts = () => {

    const sel = document.getElementById("packaging-" + props.product._id);
    if(sel.value === "Null"){
      alert("Please select a packaging size.")
    } else {

    const pkgs = document.getElementById("packaging-" + props.product._id).value;

    const quantity = document.getElementById(props.product._id);

    const val = parseInt(quantity.value);

      API.getCart()
      .then( res => {
        setItem({
          name: props.product.name,
          productID: props.product.productID,
          prodInfo: {
            size: props.product.packaging[0].size,
            price: props.product.packaging[0].price,
            quantity: 1
          }
        });
        dispatch({
          type: "numCartItems",
          numItems: res.data.length
        })
      })
      .then(
        API.saveCart(item)
        .then(res=> {

        })
        )
      .catch(err => console.log(err));

      alert("Your item has been added to the shopping cart!");
    }
  }

  const selectSize = () => {
    const pkgs = document.getElementById("packaging-" + props.product._id).value;
    const quantity = document.getElementById(props.product._id);
    const val = parseInt(quantity.value);

    setItem({
      name: props.product.name,
      productID: props.product.productID,
      prodInfo: {
        size: pkgs.split("-")[0],
        price: pkgs.split("-")[1],
        quantity: val
      }
    })
  }

  const quantityChange = () => {
    const pkgs = document.getElementById("packaging-" + props.product._id).value;
    const quantity = document.getElementById(props.product._id);
    const val = parseInt(quantity.value);

    setItem({
      name: props.product.name,
      productID: props.product.productID,
      prodInfo: {
        size: pkgs.split("-")[0],
        price: pkgs.split("-")[1],
        quantity: val
      }
    })
  }

  if (props.page === "home"){
    return (

     <div className="row">
          <div className="col-4">
            <div className="card" id="ls">
              <div className="img-container"id="cont" >
                <Link className="nav-link" to={{pathname: `/products/${props.product._id}`, props: {props}}} >
                  <img className="product-image "  alt={props.product.name} src={props.product.picLink} />
                  </Link>
              </div>
              <div className="product_info">
                  <h4 id="h4"className="product-name">
                   {props.product.name}

                  </h4>
                  <div id="stars">
                  <Ratings ratings= {props.product.ratings}/>
                  </div>
                  <div className="row">
                    <div className="col-6">

                      <p className="product_price">${props.product.packaging[0].price}</p>
                      <p id="prod"className="product_info">{props.product.packaging[0].size}</p>
                    </div>

                    <div className="project_view">
                      <button id="addCart" data-value = {props.product._id} onClick = {addToCart}><i className="fa fa-shopping-cart" ></i></button>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          </div>
    )
  } else {
    return (
      <div className="row">
          <div className="col-4">
            <div className="product-card" id="ls">
              <div className="img-container" id="image">
              <Link className="nav-link" to={{pathname: `/products/${props.product._id}`, props: {props}}} >
              <img className="product-image cardImage"  alt={props.product.name} src={props.product.picLink} />
                </Link>
              </div>
              <div className="content">
                  <h3 className="product-name" id="h5">
                   {props.product.name}
                  </h3>
                  <Ratings ratings= {props.product.ratings}/>
                  <p id="description">{props.product.description}</p>

                    <div className="row">
                      <div className ="col-7">
                      <select onChange={selectSize} className="packaging-choices" id={`packaging-${props.product._id}`} >
                          <option  value = "Null">---Select Size---</option>
                          <option value = {`${props.product.packaging[0].size}-${props.product.packaging[0].price}`}>${props.product.packaging[0].price}  {props.product.packaging[0].size}</option>
                          <option value = {`${props.product.packaging[1].size}-${props.product.packaging[1].price}`}>${props.product.packaging[1].price}  {props.product.packaging[1].size}</option>
                        </select>
                        <div id = "quantityDiv">
                          <button className="fa fa-minus inline btn" id={"decrementBtn-" + props.product._id} onClick={handleDecrement} ></button>
                          <input type="text" className="inline quantity productQuantity" id={props.product._id} defaultValue = "1"></input>
                          <button className="fa fa-plus buttons inline btn" id={"incrementBtn-" + props.product._id} onClick={handleIncrement}></button>

                        </div>
                      </div>
                      <div className="col-5">
                        <button id="addCart" onClick = {addToCartProducts}><i className="fa fa-shopping-cart" ></i></button>
                      </div>
                    </div>



              </div>
            </div>
          </div>
      </div>

    );}
}
export default Product;