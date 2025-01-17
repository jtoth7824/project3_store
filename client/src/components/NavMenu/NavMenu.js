import React, { useEffect, useState } from "react";
import MobileMenu from "../mobile-menu/MobileMenu";
import MobileBtn from "../mobile-menu/MobileBtn";
import { Link } from 'react-router-dom';
import API from "../../utils/API";
import { useTodoContext } from "../../utils/store";

function NavMenu() {

document.addEventListener("DOMContentLoaded", function(){
  /////// Prevent closing from click inside dropdown
  document.querySelectorAll('.dropdown-menu').forEach(function(element){
    element.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  })
});
  // set up state variables
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [items, setItems] = useState({});
  const [state, dispatch] = useTodoContext();

// When the component mounts, a call will be made to get load products.
useEffect(() => {
  loadProducts();
  getCart();
}, []);

// function to load products to the page
function loadProducts() {
  // api call to get the products
  API.getProducts()
    .then(products => {
      // set product and filtered product state
      setProducts(products);
      setFilteredProducts(products);
      setProduct(products[0]);
    })
    .catch(err => console.log(err));
}

// function to get cart items
function getCart() {
  // api call to retrieve items in shopping cart
  API.getCart()
  .then(res=> {
    // save how many cart items to the store for updating the cart total number in navbar from the store
    dispatch({
      type: "numCartItems",
      numItems: res.data.length
    })
  })
}

// function to handle input changing
function handleInputChange(event)  {
  const search = event.target.value;
  const filteredResults = products.filter(result =>
    result.name.toLowerCase().includes(search.toLowerCase())
  );
  setFilteredProducts(filteredResults);
}

// function to filter the results 
function filterResults(event) {
  const filter = event.target.value;
  if (filter === "baking"){
    const baking = products.filter(result => (result.family.baking === true));
    setFilteredProducts(baking);
  } else if (filter === "grilling"){
    const grilling = products.filter(result => (result.family.grilling === true));
    setFilteredProducts(grilling);
  } else if (filter === "seasoning"){
    const seasoning = products.filter(result => (result.family.seasoning === true));
    setFilteredProducts(seasoning);
  } else if (filter === "extract"){
    const extract = products.filter(result => (result.family.extract === true));
    setFilteredProducts(extract);
  } else if (filter === "teas"){
    const teas = products.filter(result => (result.family.teas === true));
    setFilteredProducts(teas);
  } else {
    setFilteredProducts(products);
  }
};
  
  const triggerSearch = () => {
    const offcanvasMobileMenu = document.querySelector(".search_icon_inr");
    offcanvasMobileMenu.classList.toggle("active");
  };

  return (
 
<div className="menu_area">	
    {/* Start: header navigation */}
    <div className="navigation">
        <div className="container"> 
                <div className="logo">
                    <Link to="/" >
                    	<img src="/assets/logo/spice-a-holic_logo-horizontal.png" alt="spiceaholic" width="225"/>
                    </Link>
                </div>

                <div className="meun_wrp">
                    <nav expand="lg" sticky="top" id="navigation">  
                        <nav className="mr-auto">
                            <ul>
                                <li className="active">
                                {/* <Link to="/">Home </Link> */}
                                </li>
                                <li className="has-sub"><Link to="/products">Products</Link>
                                    <ul className="subMenu">
                                        <li><Link to="/baking">Baking</Link>
                                        </li>
                                        <li><Link to="/grilling">Grilling</Link>
                                        </li>
                                        <li><Link to="/seasoning">Seasoning</Link>
                                        </li>
                                        <li><Link to="/extract">Extract</Link>
                                        </li>
                                        <li><Link to="/teas">Teas</Link>
                                        </li>

                                    </ul>
                                </li>
                                <li className="has-sub"><a href="blog">Blog</a>
                                    <ul>
                                        <li><a href="https://www.marksdailyapple.com/health-benefits-turmeric/">Turmeric</a>
                                        </li>
                                        <li><a href="https://www.marksdailyapple.com/cumin/">Cumin</a>
                                        </li> 
                                        <li><a href="https://www.marksdailyapple.com/salt-what-is-it-good-for/">Salt</a>
                                        </li>
                                    </ul>
                                </li>
                                
                                <li><Link to="/regions">Regions</Link>
                                <ul>
                                        <li><a href="india">India</a>
                                        </li>
                                        <li><a href="asia">Asia</a>
                                        </li>
                                        <li><a href="caribbean">Caribbean</a>
                                        </li>
                                        <li><a href="middleast">Middle East</a>
                                        </li>
                                        <li><a href="african">African</a>
                                        </li>
                                        <li><a href="europe">Europe</a>
                                        </li>
                                    </ul>                                
                                </li>
                            </ul>
                        </nav> 
                    </nav>
                </div>
                

                {/* Mobile Menu */}

                <MobileBtn /> 

                <MobileMenu />

                {/* End:  Mobile Menu */}


                {/* Start: Cart  */}
                <div className="header_cart">
                    <ul>
                        <li className="header_search">
                        <Link to="/products" 
                        className="cart-toggler search_icon" 
                                 type="button" id="searchInput" onKeyUp={handleInputChange}
                                 onClick={() => triggerSearch()}
                                 ><i className="fa fa-search"></i></Link>
                            
          
                            <div className="search_icon_inr">
                                <form action="#" method="POST">
                                    <div className="form-group">
                                        <input placeholder="Search" type="text" /> 
                                        <button className="btn-search" type="submit">
                                        <img src="assets/icons/search.png" className="bi bi-search" />
                                        </button>
                                    </div>
                                </form>
                            </div> 
                          </li>
                        <li className="header_cart_icon">
                            <Link to="/cart"><i className="fa fa-shopping-cart"></i><span className="number_cart">{state.numItems}</span></Link>
                        </li>
                    </ul>
                </div>
                 {/* End: Cart  */}
 
        </div>
        {/* container */} 
    </div>
    {/* End: header navigation */}
</div>
 
  );
}

export default NavMenu;
