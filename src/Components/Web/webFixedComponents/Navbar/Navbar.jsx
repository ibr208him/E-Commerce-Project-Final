import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext.jsx";
import { UserContext } from "../../Context/UserContext.jsx";
import './Navbar.css';

export default function Navbar() {
  let {userDetails,setUserDetails}=useContext(UserContext);
  const { userTokenContext, setUserTokenContext } = useContext(UserContext);
console.log(userDetails,'useeeeeeeeeeeeee');

// let {getCartContext}=useContext(CartContext);
// let [cartCount,setCartCount]=useState();
// let getCartContent=async()=>{
//   if(userTokenContext){
//     let res=await getCartContext();
//     setCartCount(res.count);
//   }

// }
// useEffect(()=>{
//   getCartContent();
// },[getCartContext()])
  
let {count,setCount}=useContext(CartContext);


  const logout = () => {
    localStorage.removeItem("userToken");
    setUserTokenContext(null); // otherwise the user value will not be null when logging out
    setUserDetails(null);
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand fs-3" to="/">
          T-shop
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse w-25" id="navbarNavDropdown">
          <ul className="navbar-nav m-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link fs-5">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/categories" className="nav-link fs-5">
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/products?page=1`} className="nav-link fs-5">
                Products
              </Link>
            </li>
            {userTokenContext ? (
              <li className="nav-item">
                <Link to="/cart" className="nav-link cart fs-5">
                  Cart <span className="badge bg-info">{count} </span>
                
                </Link>
              </li>
            ) : null}
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <div
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >

{
  userDetails?.userName?
  <Link className="d-flex user-profile-info" to='/profile' >
 
 <div className="profile-img me-2 d-flex align-items-center">
  <img src={userDetails.image.secure_url} className='img-fluid rounded-circle'/>
  </div>
  <p className="fs-5">{userDetails.userName}</p>
  </Link>
:
'Account'
}

              </div>
              <ul className="dropdown-menu">
                {!userTokenContext ? (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/register">
                        Register
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/login">
                        Login
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/login"
                        onClick={logout}
                      >
                        Logout
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
