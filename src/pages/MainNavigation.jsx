import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageNotFound from './PageNotFound';
// import Profile from '../components/Profile';
import Registration from './Registration/Registration';
import Login from './Login/Login';
// import User from '../components/User'
import { useAuthContext } from '../Context/authContext';
import BookListing  from './book-listing/index.jsx';
import Book from './book/index.jsx';
import EditBook from './book/editBook/index.jsx';
import  User from './user/index'
import EditUser from './user/edituser/index'
import Category from './category/index';
import EditCategory from './category/editCategory/index'
import UpdateProfile from './update-profile/index';
import { RoutePaths } from '../enum';
import Cart from './cart/index';

const MainNavigation = () => {

    const name="Jyoti";

    const clickme = ()=> alert("alert");

    const authContext=useAuthContext();

    const Redirect=<Navigate to='/Login'/>

  return (
 
    <Routes>
        {/* <Route path='/User' element={<User name={name} fun={clickme} />}></Route> */}
          {/* <Route exact path='/UpdateProfile' element={<Profile/>} /> */}
          <Route exact path={RoutePaths.Register} element={<Registration/>} />
          <Route exact path='/Login' element={<Login/>} />
          <Route exact path='/BookListing' element={authContext.user.id ? <BookListing/> : Redirect} />   
          <Route exact path='/Book' element={authContext.user.id ? < Book/>: Redirect }/>
          <Route exact path='/EditBook' element={ authContext.user.id ?<EditBook/> : Redirect}/> 
          <Route exact path='/User' element={ authContext.user.id ?<User/> : Redirect}/> 
          <Route exact path='/EditUser' element={ authContext.user.id ?<EditUser/> : Redirect}/> 
          <Route exact path={RoutePaths.UpdateProfile} element={authContext.user.id ? <UpdateProfile/> : Redirect }/>
          <Route exact path='/Category' element={ authContext.user.id ?<Category/> : Redirect}/> 
          <Route exact path='/Editcategory' element={ authContext.user.id ?<EditCategory/> : Redirect}/>  
          <Route exact path='/cart' element={<Cart/>}/>
          <Route exact path='*' element={<PageNotFound/>} />
    </Routes>
  )
}

export default MainNavigation
