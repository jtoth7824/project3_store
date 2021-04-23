import React, { createContext, useReducer, useContext } from "react";

const TodoContext = createContext();
  const { Provider } = TodoContext;
  
  function reducer(state, action) {
    switch (action.type) {
    case "cartTotal":
      return (
        {
          orderTotal: state.orderTotal,
          salesTax: state.salesTax,
          salesTaxAmt: state.salesTaxAmt,
          shipFee: state.shipFee,
          subTotal: action.subTotal,
          cartItems: state.cartItems = action.cartItems, 
          discount: action.discount,
          discountAmt: state.discountAmt,
          discountTotal: action.discountTotal,
          loggedIn: state.loggedIn,
          email: state.email
        }
      )
      case "salesTaxAmt":
        return (
          {
            orderTotal: state.orderTotal,
            salesTax: state.salesTax,
            salesTaxAmt: action.salesTaxAmt,
            shipFee: state.shipFee,
            subTotal: state.subTotal,
            cartItems: state.cartItems, 
            discount: state.discount,
            discountAmt: state.discountAmt,
            discountTotal: action.discountTotal,
            loggedIn: state.loggedIn,
            email: state.email
          }
        )      
      case "orderTotal":
        return (
          {
            orderTotal: action.orderTotal,
            salesTax: state.salesTax,
            salesTaxAmt: state.salesTaxAmt,
            shipFee: state.shipFee,
            subTotal: state.subTotal,
            cartItems: state.cartItems, 
            discount: state.discount,
            discountAmt: state.discountAmt,
            discountTotal: state.discountTotal,
            loggedIn: state.loggedIn,
            email: state.email
          }
        )      
    case "loggedIn":
      return (
        {
          orderTotal: state.orderTotal,
          salesTax: state.salesTax,
          salesTaxAmt: state.salesTaxAmt,
          shipFee: state.shipFee,
          subTotal: state.subTotal,
          cartItems: state.cartItems,
          discount: state.discount,
          discountAmt: state.discountAmt,
          discountTotal: state.discountTotal,
          loggedIn: action.loggedIn,
          email: action.email
        }
      )
    default:
      return state;
    }
  }
  
  function TodoProvider({...props }) {
    const [state, dispatch] = useReducer(reducer, {
        cartItems: [],
        orderTotal: 0,
        shipFee: 8,
        salesTax: 6,
        salesTaxAmt: 0,
        subTotal: 0,
        discount: false,
        discountTotal: 0,
        discountAmt: 10,
        loggedIn: false,
        email: ""
      });
  
    return <Provider value={[state, dispatch]} {...props} />;
  }
  
  function useTodoContext() {
    return useContext(TodoContext);
  }
  
  export { TodoProvider, useTodoContext };