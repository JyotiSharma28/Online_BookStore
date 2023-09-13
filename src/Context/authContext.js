import React, { createContext, useEffect, useState } from 'react'
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import shared from '../shared'

const initialUserValue={
    id:0,
    email:'',
    firstName:'',
    lastName:'',
    roleId:0,
    role:" ",
    password:''

}

const initialState={
   setUser:()=>{},
   user:initialUserValue,
   signOut:()=>{},
   appInitialize:false,
}

export  const AuthContext = createContext(initialState) ;

export const AuthWrapper=({children})=>{
    const [appInitialize,setAppInitialize]=useState(false)
    const [user,_setuser]=useState(initialUserValue)

    const navigate=useNavigate();
    const {pathname}=useLocation()


    const LocalStorageKeys={
        USER:'user',
    }

    const setUser=(user)=>{
       // console.log("brsd@hjsf2.com",user);
        localStorage.setItem(LocalStorageKeys.USER,JSON.stringify(user))
        _setuser(user)
    }
    const signOut=()=>{
        localStorage.removeItem(LocalStorageKeys.USER);
        _setuser(initialUserValue);
         navigate('/Login')
    }
   
      useEffect(()=>{
        const itemStr =
       JSON.parse(localStorage.getItem(shared.LocalStorageKeys.USER)) ||
       initialUserValue;
        // if the item doesn't exist, return null
        if (!itemStr.id) {
          navigate('./Login');
        }
        _setuser(itemStr);
        // eslint-disable-next-line react-hooks/exhaustive-deps

      },[])

       useEffect(()=>{
        if(pathname === '/Login' && user.id){
           navigate('/BookListing');
        }
        if(!user.id){
          return ;
        }
        const access=shared.hasAccess(pathname,user);
        // if(!access){
        //   toast.warning("Sorry you are not authorized to access this page");
        //   navigate('/BookListing')
        //   return;
        // }
        setAppInitialize(true)

       },[pathname,user])

        const value={
          user,
          setUser,
          signOut,
          appInitialize
        }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext=()=>{
  return useContext(AuthContext);
}