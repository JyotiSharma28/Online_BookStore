import React, { useMemo, useState } from "react"
import  { headerStyle } from '../Header/headerstyle';
import {AppBar,Button,IconButton, List, ListItem, TextField} from '@material-ui/core'
import {Link, NavLink, useNavigate} from 'react-router-dom';
//import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import bookService from '../service/book.service';
import Logo from '../../images/logo.jpg'
import SearchIcon from '@mui/icons-material/Search';
import { useAuthContext } from "../../Context/authContext";
import shared from '../../shared'
import { RoutePaths } from "../../enum";
import { toast } from "react-toastify";
import { useCartContext } from "../../Context/cart";

const Header = () => {

  const classes = headerStyle();
  const authContext = useAuthContext();
  const cartContext = useCartContext();
  const [open, setOpen] = useState(false);
  
  const [query, setquery] = useState("");
  const [bookList, setbookList] = useState([]);
  const [openSearchResult, setOpenSearchResult] = useState(false);

  const items = useMemo(() => {
  
    return shared.NavigationItems.filter(
      (item) =>
        !item.access.length || item.access.includes(authContext.user.roleId)
    );
  }, []);

  const openMenu = () => {
    document.body.classList.toggle("open-menu");
  };

  const searchBook = async () => {
    const res = await bookService.searchBook(query);
    setbookList(res);
  };

  const search = () => {
    document.body.classList.add("search-results-open");
    searchBook();
    setOpenSearchResult(true);
  };

  const logOut=()=>{
     authContext.signOut();
     cartContext.emptyCart(); 
  }
  const navigate= useNavigate();

    const addToCart = (book) => {
      if (!authContext.user.id) {
        navigate(RoutePaths.Login);
        toast.error("Please login before adding books to cart");
      } else {
        shared.addToCart(book, authContext.user.id).then((res) => {
          if (res.error) {
            toast.error(res.error);
          } else {
            toast.success("Item added in cart");
            cartContext.updateCart();
          }
        });
      }
    };

  return (
    <div className={classes.headerWrapper}>
      <AppBar className="site-header" id="header" position="static">
        <div
          className="top-header"
          style={{ display: open ? "none" : "block" }}
        ></div>
        <div className="bottom-header">
          <div style={{margin:'0px'}}>
            <div className="header-wrapper">
              <div className="logo-wrapper" style={{height:'150px',marginLeft:"10px"}}>
                <Link to="/" className="site-logo" title="logo">
                  <img src={Logo} alt="logo" />
                </Link>
              </div>
              
              <div className="nav-wrapper" >
                <div className="top-right-bar" >
                  <List className="top-nav-bar"  >
                     {!authContext.user.id && ( 
                    <>
                      <ListItem >
                        <NavLink to={RoutePaths.Login} title="Login">
                          Login
                        </NavLink>
                      </ListItem>
                      <ListItem>
                        <Link to={RoutePaths.Register} title="Register">
                          Register
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to={RoutePaths.User} title="User">
                          Users
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to={RoutePaths.Category} title="Category">
                        Category
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to={RoutePaths.Book} title="Book">
                          Book
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to={RoutePaths.BookListing} title="BookListing">
                          Book
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to={RoutePaths.UpdateProfile} title="updateProfile">
                          Update Profile
                        </Link>
                      </ListItem>
                      
                    </>
                     )} 
                     {authContext.user.id && ( 
                    <>
                    <ListItem>
                        <Link to={RoutePaths.User} title="User">
                          Users
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to={RoutePaths.Category} title="Category">
                        Category
                        </Link>
                      </ListItem>
                      
                      <ListItem>
                        <Link to={RoutePaths.Book} title="Book">
                          Book
                        </Link>
                      </ListItem>

                      <ListItem>
                        <Link to='/BookListing' title="BookListing">
                          BookListing
                        </Link>
                      </ListItem>

                      <ListItem>
                        <Link to={RoutePaths.UpdateProfile} title="UpdateProfile">
                          Update Profile
                        </Link>
                      </ListItem>
                    </>
                     )} 
{/*                      
                    {items.map((item, index) => (
                      <ListItem key={index}>
                        <Link to={item.route} title={item.name}>
                          {item.name}
                        </Link>
                      </ListItem>
                    ))} */}
                  </List>
                  
                  <List className="cart-country-wrap">
                    <ListItem className="cart-link" >
                      <Link to="/cart" title="Cart">
                        {/* <img src={cartIcon} alt="cart.png" /> */}
                        <IconButton  style={{padding:'0px'}}>
                         <ShoppingCartIcon />
                        </IconButton>
                       <span>{cartContext.cartData.length}</span> 
                        Cart
                      </Link>
                    </ListItem>
                    <ListItem className="hamburger" onClick={openMenu}>
                      <span></span>
                    </ListItem>
                  </List>
                   
                   {authContext.user.id && (
                    <List className="right">
                      <Button onClick={() => logOut()} variant="outlined" style={{marginLeft:"13px"}}>
                        Log out
                      </Button>
                    </List>
                  )}  
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="search-overlay"
          onClick={() => {
            setOpenSearchResult(false);
            document.body.classList.remove("search-results-open");
          }}
        ></div>
        <div className="header-search-wrapper">
          <div className="container" >
            <div className="header-search-outer" >
              <div className="header-search-inner" >
                <div className="text-wrapper" >
                  <TextField
                    id="text"
                    name="text"
                    placeholder="What are you looking for..."
                    variant="outlined"
                    value={query}
                    onChange={(e) => setquery(e.target.value)}
                  />

                  {openSearchResult && (
                    <>
                      <div className="product-listing" >
                        {bookList?.length === 0 && (
                          <p className="no-product" >No product found</p>
                        )}

                        {/* <p className="loading">Loading....</p>  */}
                        <List className="related-product-list" >
                          {bookList?.length > 0 &&
                            bookList.map((item, i) => {
                              return (
                                <ListItem key={i}>
                                  <div className="inner-block">
                                    <div className="left-col">
                                      <span className="title">{item.name}</span>
                                      <p>{item.description}</p>
                                    </div>
                                    <div className="right-col">
                                      <span className="price">
                                        {item.price}
                                      </span>
                                      <Link onClick={() => addToCart(item)}>
                                        Add to cart
                                      </Link>
                                    </div>
                                  </div>
                                </ListItem>
                              );
                            })}
                        </List>
                      </div>
                    </>
                  )}
                </div>
                <Button
                  type="submit"
                  className="green-btn btn"
                  variant="contained"
                  color="primary"
                  disableElevation
                  onClick={search}
                >
                  <SearchIcon/>
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AppBar>
    </div>
  );
}

export default Header
