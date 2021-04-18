import React from "react";
import Cart from "../components/Cart";
import CartData from "../components/Test/CartData"
import {Container} from "../components/Test/Grid";
import API from "../utils/API";
import { useTodoContext} from "../utils/store";
import { Link, useLocation } from "react-router-dom";

function Checkout() {
  let shipCompanyName = React.createRef();
  let shipFirstName = React.createRef();
  let shipLastName = React.createRef();
  let shipStreet = React.createRef();
  let shipAddress2 = React.createRef();
  let shipCity = React.createRef();
  let shipState = React.createRef();
  let shipZip = React.createRef();
  let billCompanyName = React.createRef();
  let billFirstName = React.createRef();
  let billLastName = React.createRef();
  let billStreet = React.createRef();
  let billAddress2 = React.createRef();
  let billCity = React.createRef();
  let billState = React.createRef();
  let billZip = React.createRef();
  let ccName = React.createRef();
  let ccNumber = React.createRef();
  let ccType = React.createRef();
  let ccSecurityCode = React.createRef();
  let ccExpDate = React.createRef();
  let email = React.createRef();
  let phone = React.createRef();
  let notes = React.createRef();

  const [state, dispatch] = useTodoContext();
  
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,      
    maximumFractionDigits: 2,
  });

  // useEffect(() => {
  //   console.log("cart Effect");
  //   getCart();
  // }, [])

  function handleSubmitBtnClick(e) {
    e.preventDefault();
    const orderInfo = 
    {
      orderNum: "BL0001",
      shippingAddress: {
        companyName: shipCompanyName.current.value,
        firstName: shipFirstName.current.value,
        lastName: shipLastName.current.value,
        street: shipStreet.current.value,
        address2: shipAddress2.current.value,
        city: shipCity.current.value,
        state: shipState.current.value,
        zip: shipZip.current.value
      },
      email: email.current.value,
      phone: phone.current.value,
      creditCard: {
        billingAddress: {
          companyName: billCompanyName.current.value,
          firstName: billFirstName.current.value,
          lastName: billLastName.current.value,
          street: billStreet.current.value,
          address2: billAddress2.current.value,
          city: billCity.current.value,
          state: billState.current.value,
          zip: billZip.current.value,
        },
        cardInfo: {
          cardNumber: ccNumber.current.value,
          cardType: ccType.current.value,
          securityCode: ccSecurityCode.current.value,
          cardName: ccName.current.value,
          expirationDate: ccExpDate.current.value
        }
      },
      spices: [],
      notes: notes.current.value,
      orderTotal: 0
    }

    for(let i=0; i<state.cartItems.length; i++) {
      const tempspices = 
      {
       name: "garlic",
       size: "4oz bottle",
       price: "4.99",
       quantity: 2
      }
      tempspices.name = state.cartItems[i].name;
      tempspices.size = state.cartItems[i].prodInfo.size;
      tempspices.quantity = state.cartItems[i].prodInfo.quantity;
      tempspices.price = state.cartItems[i].prodInfo.price;

      orderInfo.spices[i] = tempspices;
    }

    API.saveOrders(orderInfo)
      .then(res => {
        console.log("in save orders");
        console.log(res.data);
        console.log(res.data._id);
      }) 
  }

  // function getCart() {
  //   API.getCart()
  //   .then(res=> {
  //       console.log(res.data);
  //       setCart(res.data);
  //   })
  //   .catch(err => console.log(err))
  // }

  return (
    <div>
      <Container fluid>
        <Container >
        <Cart />
              <div className="container-fluid containerColor marginBottomCont">
               <h1 className="text-center">Checkout Page</h1> 
               <h1 className="text-center">Cart Total = ${state.orderTotal}</h1>
               {state.cartItems.length ? (
                  <div>
                    <form id={1} className="searchForm justify-content-center m-2" key={1}>
{/*                       <input
                        value={props.searchString}
                        onChange={props.handleInputChange}
                        name="searchTerm"
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Search Term"
                        // disable the Enter key so a user hitting Enter doesn't accidentally reload the page with new data
                        onKeyPress={e => {
                        if (e.key === 'Enter') e.preventDefault();
                        }}
                      /> */}
                      <label className="label" htmlFor="exampleInputEmail1">Company Name</label>
                      <input name="shipCompanyName" ref={shipCompanyName} id="shipCompanyName" className="form-control form-control-lg" placeholder="Ship Company Name" />
                      <label className="label" htmlFor="exampleInputEmail1">First Name</label>
                      <input name="shipFirstName" ref={shipFirstName} id="shipFirstName" className="form-control form-control-lg" placeholder="Ship First Name" />
                      <label className="label" htmlFor="exampleInputEmail1">Last Name</label>
                      <input name="shipLastName" ref={shipLastName} id="shipLastName" className="form-control form-control-lg" placeholder="Ship Last Name" />
                      <label className="label" htmlFor="exampleInputEmail1">Street</label>
                      <input name="shipStreet" ref={shipStreet} id="shipStreet" className="form-control form-control-lg" placeholder="Shipping Street" />
                      <label className="label" htmlFor="exampleInputEmail1">Street #2</label>
                      <input name="shipAddress2" ref={shipAddress2} id="shipAddress2" className="form-control form-control-lg" placeholder="Shipping Address #2" />
                      <label className="label" htmlFor="exampleInputEmail1">City</label>
                      <input name="shipCity" ref={shipCity} id="shipCity" className="form-control form-control-lg" placeholder="Shipping City" />
                      <label className="label" htmlFor="exampleInputEmail1">State</label>
                      <div className="select"><select ref={shipState} id="shipState" defaultValue="" required="">
                        <option value="" disabled="">Choose...</option>
                        <option value="AK">AK</option>
                        <option value="AL">AL</option>
                        <option value="AR">AR</option>
                        <option value="AZ">AZ</option>
                        <option value="CA">CA</option>
                        <option value="CO">CO</option>
                        <option value="CT">CT</option>
                        <option value="DC">DC</option>
                        <option value="DE">DE</option>
                        <option value="FL">FL</option>
                        <option value="GA">GA</option>
                        <option value="HI">HI</option>
                        <option value="IA">IA</option>
                        <option value="ID">ID</option>
                        <option value="IL">IL</option>
                        <option value="IN">IN</option>
                        <option value="KS">KS</option>
                        <option value="KY">KY</option>
                        <option value="LA">LA</option>
                        <option value="MA">MA</option>
                        <option value="MD">MD</option>
                        <option value="ME">ME</option>
                        <option value="MI">MI</option>
                        <option value="MN">MN</option>
                        <option value="MO">MO</option>
                        <option value="MS">MS</option>
                        <option value="MT">MT</option>
                        <option value="NC">NC</option>
                        <option value="ND">ND</option>
                        <option value="NE">NE</option>
                        <option value="NH">NH</option>
                        <option value="NJ">NJ</option>
                        <option value="NM">NM</option>
                        <option value="NV">NV</option>
                        <option value="NY">NY</option>
                        <option value="OH">OH</option>
                        <option value="OK">OK</option>
                        <option value="OR">OR</option>
                        <option value="PA">PA</option>
                        <option value="RI">RI</option>
                        <option value="SC">SC</option>
                        <option value="SD">SD</option>
                        <option value="TN">TN</option>
                        <option value="TX">TX</option>
                        <option value="UT">UT</option>
                        <option value="VA">VA</option>
                        <option value="VT">VT</option>
                        <option value="WA">WA</option>
                        <option value="WI">WI</option>
                        <option value="WV">WV</option>
                        <option value="WY">WY</option>
                      </select>
                    </div>
                      <label className="label" htmlFor="exampleInputEmail1">Zip</label>
                      <input name="shipZip" ref={shipZip} id="shipZip" className="form-control form-control-lg" placeholder="Shipping Zip Code" maxLength="5"
                            size="5" required/>
                      <label className="label" htmlFor="exampleInputEmail1">Email</label>                      
                      <input type="email" ref={email} id="email" name="email" className="form-control form-control-lg" placeholder="email" />
                      <label className="label" htmlFor="exampleInputEmail1">Phone</label>
                      <input type="tel" ref={phone} id="phone" name="phone" className="form-control form-control-lg" placeholder="555-555-5555"
                          maxLength="12" size="12" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required/>
                      <label className="label" htmlFor="exampleInputEmail1">Notes</label>                      
                      <input name="notes" ref={notes} id="notes" className="form-control form-control-lg" placeholder="notes" />
                    </form>
                    <br />
                    <form>
                    <label className="label" htmlFor="exampleInputEmail1">Company Name</label>
                      <input name="ccBillCompanyName" ref={billCompanyName} id="billCompanyName" className="form-control form-control-lg" placeholder="Billing Company Name" />
                      <label className="label" htmlFor="exampleInputEmail1">First Name</label>
                      <input name="ccBillFirstName" ref={billFirstName} id="billFirstName" className="form-control form-control-lg" placeholder="Billing First Name" />
                      <label className="label" htmlFor="exampleInputEmail1">Last Name</label>
                      <input name="ccBillLastName" ref={billLastName} id="billLastName" className="form-control form-control-lg" placeholder="Billing Last Name" />                      
                      <label className="label" htmlFor="exampleInputEmail1">Street</label>
                      <input name="ccBillStreet" ref={billStreet} id="billStreet" className="form-control form-control-lg" placeholder="Billing Street" />
                      <label className="label" htmlFor="exampleInputEmail1">Address 2</label>
                      <input name="ccBillAddress2" ref={billAddress2} id="billAddress2" className="form-control form-control-lg" placeholder="Billing Address 2" />                      
                      <label className="label" htmlFor="exampleInputEmail1">City</label>
                      <input name="ccBillCity" ref={billCity} id="billCity" className="form-control form-control-lg" placeholder="Billing City" />
                      <label className="label" htmlFor="exampleInputEmail1">State</label>
                      <div className="select"><select ref={billState} id="billState" defaultValue="" required="">
                        <option value=""  disabled="">Choose...</option>
                        <option value="AK">AK</option>
                        <option value="AL">AL</option>
                        <option value="AR">AR</option>
                        <option value="AZ">AZ</option>
                        <option value="CA">CA</option>
                        <option value="CO">CO</option>
                        <option value="CT">CT</option>
                        <option value="DC">DC</option>
                        <option value="DE">DE</option>
                        <option value="FL">FL</option>
                        <option value="GA">GA</option>
                        <option value="HI">HI</option>
                        <option value="IA">IA</option>
                        <option value="ID">ID</option>
                        <option value="IL">IL</option>
                        <option value="IN">IN</option>
                        <option value="KS">KS</option>
                        <option value="KY">KY</option>
                        <option value="LA">LA</option>
                        <option value="MA">MA</option>
                        <option value="MD">MD</option>
                        <option value="ME">ME</option>
                        <option value="MI">MI</option>
                        <option value="MN">MN</option>
                        <option value="MO">MO</option>
                        <option value="MS">MS</option>
                        <option value="MT">MT</option>
                        <option value="NC">NC</option>
                        <option value="ND">ND</option>
                        <option value="NE">NE</option>
                        <option value="NH">NH</option>
                        <option value="NJ">NJ</option>
                        <option value="NM">NM</option>
                        <option value="NV">NV</option>
                        <option value="NY">NY</option>
                        <option value="OH">OH</option>
                        <option value="OK">OK</option>
                        <option value="OR">OR</option>
                        <option value="PA">PA</option>
                        <option value="RI">RI</option>
                        <option value="SC">SC</option>
                        <option value="SD">SD</option>
                        <option value="TN">TN</option>
                        <option value="TX">TX</option>
                        <option value="UT">UT</option>
                        <option value="VA">VA</option>
                        <option value="VT">VT</option>
                        <option value="WA">WA</option>
                        <option value="WI">WI</option>
                        <option value="WV">WV</option>
                        <option value="WY">WY</option>
                      </select>
                    </div>
                      <label className="label" htmlFor="exampleInputEmail1">Zip</label>
                      <input name="ccBillZip" ref={billZip} id="billZip" className="form-control form-control-lg" placeholder="Billing Zip Code" maxLength="5"
                            size="5" required/>
                    </form>
                    <br />
                    <form>
                    <label className="label" htmlFor="exampleInputEmail1">Name</label>
                      <input name="ccName" ref={ccName} id="ccNameclassName=" className="form-control form-control-lg" placeholder="Name on Credit Card" />
                      <label className="label" htmlFor="exampleInputEmail1">Type of Card</label>
                      <input name="ccType" ref={ccType} id="ccType" className="form-control form-control-lg" placeholder="Credit Card Type" />
                      <label className="label" htmlFor="exampleInputEmail1">Card Number</label>
                      <input name="ccNumber" ref={ccNumber} id="ccNumber" className="form-control form-control-lg" placeholder="Credit Card Number" />
                      <label className="label" htmlFor="exampleInputEmail1">Security Code</label>
                      <input name="ccSecurityCode" ref={ccSecurityCode} id="ccSecurityCode" className="form-control form-control-lg" placeholder="CC Security Code" />
                      <label className="label" htmlFor="exampleInputEmail1">Expiration Date</label>
                      <input name="ccExpirationDate" ref={ccExpDate} id="ccExpDate" className="form-control form-control-lg" placeholder="CC Expiration Date" />
                    </form>
                      {state.cartItems.map(result => (
                        <div key={result._id}>
                          <CartData
                            name = {result.name}
                            productID = {result.productID}
                            prodInfo = {result.prodInfo}
                          />
                        </div>
                      ))}
                      <table>
                      <thead>
          <tr>
            <th className="alignCenter">Product</th>
            <th className="alignCenter">Package Size</th>
            <th className="alignCenter">Quantity</th>
            <th className="alignCenter">Price</th>
            <th className="alignCenter">Item Total</th>
          </tr>
        </thead>
                        <tbody>

                        <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>SubTotal:</td>
                        <td>${formatter.format(state.subTotal)}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Discount ({state.discountAmt}%)</td>
                        <td>${state.discountAmt/100 * state.subTotal}</td>
                      </tr>
                     <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Sales Tax ({state.salesTax}%)</td>
                        <td>${state.salesTaxAmt}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Shipping Fee (Flat Rate):</td>
                        <td>${state.shipFee}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Order Total:</td>
                        <td>${state.orderTotal}</td>
                      </tr>
                        </tbody>
                      </table>
                  </div>
                ) : (
                 <div className="row text-center h-100">
                   <div className="col-md-12 text-center my-auto">
                     <h3><strong>No CheckOut Information</strong></h3>
                   </div>
                 </div>
               )}
             </div>

             <Link className="mr-auto brand btn myButton buttonMargin font-weight-bold" to="/checkout" >
             <button className="btn myButton buttonMargin" style={{ fontSize: "20px"}} onClick={handleSubmitBtnClick}><strong>Place Order</strong></button>
         </Link>
        </Container>
      </Container>
    </div>
  );
}

export default Checkout;